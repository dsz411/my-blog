# CLI 开发的简单介绍

本文以一个在终端为 Vue CLI 项目添加路由的程序为例

新建项目

```shell
$ mkdir vue-auto-route
$ cd vue-auto-route
```

安装依赖

```shell
$ yarn add commander download-git-repo ora handlebars figlet clear chalk open watch
```

新建 bin/kfc.js 文件, 写入以下代码

```javascript
#!/usr/bin/env node
console.log("cli....");
```

第一行指定了使用 node 解析器, 在 package.json 文件里添加 bin 字段

```javascript
{
	// ...
  "bin": {
    "kfc": "./bin/kfc.js"
  },
  //...
}
```

然后运行 npm link 命令, npm link 命令可以把 kfc 设置为全局(也就是在其它文件夹也可以使用 kfc 命令)

```shell
$ npm link
```

现在就可以使用 kfc 命令来打印 'cli....' 了

```shell
$ kfc
cli....
```

## 创建命令行界面

使用 commander 库定制命令, 在 bin/kfc.js 文件里输入

```javascript
#!/usr/bin/env node
const program = require("commander");

program.version(require("../package.json").version);

program
  .command("init <name>") // name 为参数
  .description("init project")
  .action((name) => {
    console.log("init", name);
  });

program.parse(process.argv);
```

现在在输入 kfc, 就不一样了

```shell
$ kfc
Usage: kfc [options] [command]

Options:
  -V, --version   output the version number
  -h, --help      display help for command

Commands:
  init <name>     init project
  help [command]  display help for command
```

现在将 action 里的逻辑分割到一个新的文件夹中, 新建 lib/init.js 文件, 输入以下内容

```javascript
const { promisify } = require("util");
const figlet = promisify(require("figlet"));
const clear = require("clear");
const chalk = require("chalk");

const log = (content) => console.log(chalk.green(content));

module.exports = async (name) => {
  // 打印欢迎界面
  clear();
  const data = await figlet("KKB Welcome");
  log(data);
};
```

然后回到 bin/kfc.js 文件导入它

```javascript
#!/usr/bin/env node
const program = require("commander");

program.version(require("../package.json").version);

program
  .command("init <name>")
  .description("init project")
  .action(require("../lib/init")); // *

program.parse(process.argv);
```

此时运行 `kfc init ...` 就会不一样了

```shell
$ kfc init ...
Usage: kfc [options] [command]

Options:
  -V, --version   output the version number
  -h, --help      display help for command

Commands:
  init <name>     init project
  help [command]  display help for command

  # note that this is green
  _  ___  ______   __        __   _
 | |/ / |/ / __ )  \ \      / /__| | ___ ___  _ __ ___   ___
 | ' /| ' /|  _ \   \ \ /\ / / _ \ |/ __/ _ \| '_ ` _ \ / _ \
 | . \| . \| |_) |   \ V  V /  __/ | (_| (_) | | | | | |  __/
 |_|\_\_|\_\____/     \_/\_/ \___|_|\___\___/|_| |_| |_|\___|
```

## 从 Github 上下载模板

现在从 Github 上下载模板, 为此新建 lib/download.js 文件, 输入以下内容

```javascript
const { promisify } = require("util");

module.exports.clone = async function (repo, desc) {
  const download = promisify(require("download-git-repo"));
  const ora = require("ora");
  const process = ora(`Downloading...${repo}`);
  process.start();
  await download(repo, desc);
  process.succeed();
};
```

然后在 lib/init.js 文件中导入它

```javascript
const { promisify } = require("util");
const figlet = promisify(require("figlet"));
const clear = require("clear");
const chalk = require("chalk");

const log = (content) => console.log(chalk.green(content));
const { clone } = require("./download");

module.exports = async (name) => {
  // 打印欢迎界面
  clear();
  const data = await figlet("KKB Welcome");
  log(data);

  // clone
  log(`🚀创建项目 ${name}`);
  await clone("github:su37josephxia/vue-sample", name);
};
```

现在运行 `kfc init myvue`

```shell
$ kfc init myvue
Usage: kfc [options] [command]

Options:
  -V, --version   output the version number
  -h, --help      display help for command

Commands:
  init <name>     init project
  help [command]  display help for command

  _  ___  ______   __        __   _
 | |/ / |/ / __ )  \ \      / /__| | ___ ___  _ __ ___   ___
 | ' /| ' /|  _ \   \ \ /\ / / _ \ |/ __/ _ \| '_ ` _ \ / _ \
 | . \| . \| |_) |   \ V  V /  __/ | (_| (_) | | | | | |  __/
 |_|\_\_|\_\____/     \_/\_/ \___|_|\___\___/|_| |_| |_|\___|

🚀创建项目 myvue
✔ Downloading...github:su37josephxia/vue-sample
```

现在可以看到在 vue-auto-route/ 文件夹下有了一个 myvue/ 文件夹, 但现在项目中没有任何依赖, 显然真实项目不是这样的, 下面就来写一些代码来使命令行自动安装依赖, 在 lib/init.js 中添加如下代码

```javascript
const { promisify } = require("util");
const figlet = promisify(require("figlet"));
const clear = require("clear");
const chalk = require("chalk");

const log = (content) => console.log(chalk.green(content));
const { clone } = require("./download");

const spawn = async (...args) => {
  const { spawn } = require("child_process");
  return new Promise((resolve) => {
    const proc = spawn(...args);
    proc.stdout.pipe(process.stdout);
    proc.stderr.pipe(process.stderr);
    proc.on("close", () => {
      resolve();
    });
  });
};

module.exports = async (name) => {
  // 打印欢迎界面
  clear();
  const data = await figlet("KKB Welcome");
  log(data);

  log(`🚀创建项目 ${name}`);
  await clone('github:su37josephxia/vue-template', name);

  // 自动安装依赖
  log("安装依赖");
  await spawn("yarn.cmd", ["install"], { cwd: `./${name}` });
  log(`
👌 安装完成
To get Start:
=============================
  cd ${name}
  npm run serve
=============================
  `);
};
```

> 注意在 windows 上, yarn 要用 yarn.cmd, 而不是 yarn, 可以使用以下语句进行判断

```javascript
process.platform === "win32" ? "yarn.cmd" : "yarn";
```

现在程序可以正常运行了, 现在来配置程序自动启动并且打开浏览器, 在 lib/init.js 文件中添加如下代码

```javascript
const { promisify } = require("util");
const figlet = promisify(require("figlet"));
const clear = require("clear");
const chalk = require("chalk");
const open = require("open");

const log = (content) => console.log(chalk.green(content));
const { clone } = require("./download");

const spawn = async (...args) => {
  const { spawn } = require("child_process");
  return new Promise((resolve) => {
    const proc = spawn(...args);
    proc.stdout.pipe(process.stdout);
    proc.stderr.pipe(process.stderr);
    proc.on("close", () => {
      resolve();
    });
  });
};

module.exports = async (name) => {
  // 打印欢迎界面
  clear();
  const data = await figlet("KKB Welcome");
  log(data);

  log(`🚀创建项目 ${name}`);
  await clone('github:su37josephxia/vue-template', name);

  // 自动安装依赖
  log("安装依赖");
  await spawn("yarn.cmd", ["install"], { cwd: `./${name}` });
  log(`
👌 安装完成
To get Start:
=============================
  cd ${name}
  npm run serve
=============================
  `);

  open(`http://localhost:8080`);
  // 启动
  await spawn("yarn.cmd", ["serve"], { cwd: `./${name}` });
};
```

现在程序是可以正常运行的

## 约定路由功能

原理:

- 用一个 loader 加载 views/ 文件夹里的组件
- 渲染 template

新建 lib/refresh.js 文件, 添加下面的代码

```javascript
const fs = require("fs");
const handlebars = require("handlebars");
const chalk = require("chalk");

module.exports = async () => {
  // 获取列表
  const list = fs
    .readdirSync("./src/views")
    .filter((v) => v !== "Home.vue")
    .map((v) => ({
      name: v.replace(".vue", "").toLowerCase(),
      file: v,
    }));

  // 生成路由定义
  compile({ list }, "./src/router.js", "./template/router.js.hbs");

  // 生成菜单
  compile({ list }, "./src/App.vue", "./template/App.vue.hbs");

  /**
   * 模板编译
   * @param {*} meta 数据定义
   * @param {*} filePath 目标文件
   * @param {*} templatePath 模板文件
   */
  function compile(meta, filePath, templatePath) {
    if (fs.existsSync(templatePath)) {
      const content = fs.readFileSync(templatePath).toString();
      const result = handlebars.compile(content)(meta);
      fs.writeFileSync(filePath, result);
      console.log(`🚀${filePath} 创建成功`);
    }
  }
};
```

然后现在在 bin/kfc.js 中新建一个 refresh 命令

```javascript
#!/usr/bin/env node
const program = require("commander");

program.version(require("../package.json").version);

program
  .command("init <name>")
  .description("init project")
  .action(require("../lib/init"));

program
  .command("refresh")
  .description("refresh routers and menu")
  .action(require("../lib/refresh"));

program.parse(process.argv);
```

现在来测试一下, 进入 myvue 文件夹

```shell
myvue:> $ npm run serve
```

重开一个终端, 再次进入 myvue 文件夹

```shell
myvue:> $ kfc refresh

🚀./src/router.js 创建成功
🚀./src/App.vue 创建成功
```

现在应用已经出现了 contact 链接了, 并且可以正常连接到 contact 页面 🌹