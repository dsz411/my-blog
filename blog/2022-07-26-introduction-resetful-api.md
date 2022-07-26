# 搭建一个简易的 RESTful API

设计 RESTful 服务时, 要想好需要哪些操作, 并将它们映射到 Express 里的路由上

就此例而言, 需要实现保存文章, 获取文章, 获取包含所有文章的列表和删除不再需要的文章这几个功能

分别对应下面这些路由

- POST /articles ==> 创建新文章
- GET /articles/:id  ==> 获取指定文章
- GET /articles ==> 获取所有文章
- DELETE /articles/:id ==> 删除指定文章

下面这个简单的 Express 程序实现了这些路由, 不过现在是用 JavaScript 数组来存储文章的

```shell
$ yarn add express
```

```javascript
const express = require('express');
const app = express();

const articles = [{title: 'Example'}];

app.set('port', process.env.PORT || 3000);

app.get('/articles', (req, res, next) => {
  // 获取所有文章
  res.send(articles);
});

app.post('/articles', (req, res, next) => {
  // 创建一篇文章
  res.send('ok');
});

app.get('/articles/:id', (req, res, next) => {
  // 获取指定文章
  const id = req.params.id;
  console.log('Fetching:', id);
  res.send(articles[id]);
});

app.delete('/articles/:id', (req, res, next) => {
  // 删除指定文章
  const id = req.params.id;
  console.log('Deleting:', id);
  delete articles[id];
  res.send({message: 'Deleted'});
});

app.listen(app.get('port'), () => {
  console.log('App started on port', app.get('port'));
});

module.exports = app;
```

然后就可以运行 node app, 就可以在 `http://localhost:3000/articles` 链接下看到模拟的数组了, 也可以使用 window cmd 的 curl 命令测试一下这些 API

```shell
C:\>curl http://localhost:3000/articles
[{"title":"Example"}]
C:\>curl http://localhost:3000/articles/0
{"title":"Example"}
C:\>curl -X DELETE http://localhost:3000/articles/0
{"message":"Deleted"}
C:\>curl http://localhost:3000/articles/0

```

现在不能创建文章, 因为处理 POST 请求需要消息体解析, 消息体解析器知道如何接收 MIME-encoded (多用途互联网邮件扩展) POST 请求消息的主体部分, 并将其转换成代码可用的数据, 一般来说, 它给出的是易于处理的 JSON 数据, 只要网站上有涉及提交表单的请求, 服务器端就肯定会有一个消息体解析器来参与这个请求的处理

```shell
$ yarn add body-parser
```

```javascript
// ...
// 支持编码为 JSON 的请求消息体
app.use(bodyParser.json());
// 支持编码为表单的请求消息体
app.use(bodyParser.urlencoded({extended: true}));
// ...
app.post('/articles', (req, res, next) => {
  const article = {title: req.body.title};
  article.push(article);
  res.send(article);
});
...
```

如果发送一个带有 title key 的 POST 请求, 文章数组中会增加一篇新文章, 下面是发出这样请求的 curl 命令

```shell
C:\>curl --data "title=Example 2" http://localhost:3000/articles
ok
```

## 添加数据库

文章应该能被创建, 被获取, 被删除, 所以模型类 Article 应该提供下面这些方法

- Article.all(cb) ==> 返回所有文章
- Article.find(id, cb) ==> 给定 ID, 找到对应文章
- Article.create({title, content}, cb) ==> 创建一篇带有标题和内容的文章
- Article.delete(id, cb) ==> 根据 ID 删除文章

下面的代码演示如何在 Node 中使用 SQLite 实现上述功能, 新建 db.js

```javascript
const sqlite3 = require("sqlite3").verbose();
const dbName = "later.sqlite";
const db = new sqlite3.Database(dbName);

db.serialize(() => {
  const sql = `
    CREATE TABLE IF NOT EXISTS articles (
      id integer primary key,
      title,
      content TEXT
    )
  `;
  db.run(sql);
});

class Article {
  static all(cb) {
    db.all("SELECT * FROM articles", cb);
  }

  // 问号表示参数
  static find(id, cb) {
    db.get("SELECT * FROM articles WHERE id = ?", id, cb);
  }

  static create(data, cb) {
    const sql = "INSERT INTO articles(title, content) VALUES (?, ?)";
    db.run(sql, data.title, data.content, cb);
  }

  static delete(id, cb) {
    if (!id) return cb(new Error('Please provide an id'));
    db.run('DELETE FROM articles WHERE id = ?', id, cb);
  }
}

module.exports = db;
module.exports.Article = Article;
```

基本的数据库功能已经实现了, 接下来就将它添加到 HTTP 路由中

```javascript
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// 加载数据库模块
const Article = require('./db').Article;

app.set('port', process.env.PORT || 3000);

// 支持编码为 JSON 的请求消息体
app.use(bodyParser.json());
// 支持编码为表单的请求消息体
app.use(bodyParser.urlencoded({extended: true}));

app.get('/articles', (req, res, next) => {
  // 获取所有文章
  Article.all((err, articles) => {
    if (err)
      return next(err);
    res.send(articles);
  });
});

app.get('/articles/:id', (req, res, next) => {
  // 获取指定文章
  const id = req.params.id;
  Article.find(id, (err, article) => {
    if (err)
      return next(err);
    res.send(article);
  });
});

app.delete('/articles/:id', (req, res, next) => {
  // 删除指定文章
  const id = req.params.id;
  Article.delete(id, (err) => {
    if (err)
      return next(err);
    res.send({message: 'Deleted'});
  });
});

app.listen(app.get('port'), () => {
  console.log('App started on port', app.get('port'));
});

module.exports = app;
```

RESTful API 已经搭建完毕, 数据也可以持久化到数据库中了, 接下来该写代码把网页转换成简化版的"阅读视图"了, 这里暂时不用自己实现, node-readability 这个模块提供了一个异步函数, 可以下载指定 URL 的页面并将 HTML 转换成简化版, 下面这段代码演示了 node-readability 的用法

```shell
$ yarn add node-readability
```

```javascript
const read = require('node-readability');

const url = 'http://www.manning.com/cantelon2/';

read(url, (err, result) => {
  // result ...
})
```

将它和数据库类结合起来, 用 Article.create 方法保存文章, 更新 app.post 方法

```javascript
app.post('/articles', (req, res, next) => {
  const url = req.body.url;

  read(url, (err, result) => {
    if (err || !result)
      res.status(500).send('Error downloading article');
    Article.create({ title: result.title, content: result.content }, (err, article) => {
      if (err)
        return next(err);
      res.send('OK');
    })
  })
})
```

现在用 curl 测试一下这个 API

```shell
C:\>curl --data "url=http://manning.com/cantelon2/" http://localhost:3000/articles
ok
```

已经添加了一个数据库模块, 创建了一个封装了数据库模块的 JavaScript API, 并将它绑到了 RESTful API 上, 作为服务器端开发人员, 将来会做很多这样的工作

## 添加用户界面

之前用 res.send() 往客户端发送 JavaScript 对象, 用 curl 发送请求时, JSON 很方便, 因为在控制台里看起来很清晰, 但在现实应用中, 这个程序还需要支持 HTML

基本做法是用 Express 的 res.format 方法, 它可以根据请求发送相应格式的响应, 它的用法如下所示, 提供一个包含格式及对应的响应函数的对象

```javascript
// ...
app.get('/articles', (req, res, next) => {
  // 获取所有文章
  Article.all((err, articles) => {
    if (err) {
      return next(err);
    }
    res.format({
      html: () => {
        res.render('articles.ejs', { articles: articles });
      },
      json: () => {
        res.send(articles);
      }
    })
  });
});
// ...
```

在这段代码中, res.render 会渲染 view 文件夹下的模板 articles.ejs, 现在来安装 ejs

```shell
$ yarn add ejs
```

接下来在 view 文件夹中创建模板 articles.ejs, head.ejs, foot.ejs

```html
<% include head %>  <!-- 包含另一个模板 -->
<ul>
  <% articles.forEach((article) => { %>   <!-- 循环遍历每篇文章并渲染它 -->
    <li>
      <a href="/articles/<%= article.id %>">
        <%= article.title %>   <!-- 将文章的标题作为链接文本 -->
      </a>
    </li>
  <% }) %>
</ul>
<% include foot %>
```

```html
<html>
  <head>
    <title>Later</title>
  </head>
  <body>
    <div class="container">
```

```html
    </div>
  </body>
</html>
```

## 添加 Bootstrap.css

模板搞定了, 接下来就该添加样式了, 不用自己创建样式, 重用已有的样式会更简单, 甚至这也能用 npm 来做, 热门的 Bootstrap 客户端框架也在 npm 上, 把它加到项目中

```shell
npm install bootstrap --save
```

如果看一下 node_modules/bootstrap/, 应该会看到 Bootstrap 项目的源码, 然后, 在 dist/css 文件夹中有来自 Bootstrap 的 CSS 文件, 要使用这些文件, 需要让服务器响应静态文件请求

### 响应静态文件请求

Express 自带了一个名为 express.static 的中间件, 可以给浏览器发送客户端 JavaScript, 图片和 CSS 文件, 只要将它指向包含这些文件的目录, 浏览器就能访问到这些文件了, 在靠近 Express 主文件( index.js )的顶部, 有加载项目所需的中间件的代码

```javascript
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
```

要加载 Bootstrap 的 CSS, 用 express.static 将文件注册到恰当的 URL 上

```javascript
app.use(
  '/css/bootstrap.css',
  express.static('node_modules/bootstrap/dist/css/bootstrap.css')
);
```

接下来把 /css/bootstrap.css 添加到模板中, 来获得一些酷炫的 Bootstrap 样式, views/head.ejs 看起来应该是这样的

```html
<html>
  <head>
    <title>later;</title>
    <link rel="stylesheet" href="/css/bootstrap.css">
  </head>
  <body>
    <div class="container">
```

这只是 Bootstrap 的 CSS, 它还有很多文件, 包括图标, 字体以及 jQuery 插件, 可以往项目里添加更多文件, 或者用工具把它们打包成一个文件, 让浏览器更容易加载
