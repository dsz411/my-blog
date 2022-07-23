---
sidebar_position: 7
---

# CSS Modules 结合历史遗留项目实践

好的技术方案除了功能强大炫酷，还要能做到现有项目能平滑迁移

CSS Modules 在这一点上表现的非常灵活

## 外部如何覆盖局部样式

当生成混淆的 class 名后，可以解决命名冲突，但因为无法预知最终 class 名，不能通过一般选择器覆盖

我们现在项目中的实践是可以给组件关键节点加上 `data-role` 属性，然后通过属性选择器来覆盖样式

例如

```jsx
// dialog.js
  return <div className={styles.root} data-role='dialog-root'>
      <a className={styles.disabledConfirm} data-role='dialog-confirm-btn'>Confirm</a>
      ...
  </div>
```

```css
// dialog.css
[data-role="dialog-root"] {
  // override style
}
```

因为 CSS Modules 只会转变类选择器，所以这里的属性选择器不需要添加 `:global`

## 如何与全局样式共存

前端项目不可避免会引入 normalize.css 或其它一类全局 css 文件

使用 Webpack 可以让全局样式和 CSS Modules 的局部样式和谐共存

下面是我们项目中使用的 webpack 部分配置代码：

```javascript
module: {
  loaders: [{
    test: /\.jsx?$/,
    loader: 'babel'
  }, {
    test: /\.scss$/,
    exclude: path.resolve(__dirname, 'src/styles'),
    loader: 'style!css?modules&localIdentName=[name]__[local]!sass?sourceMap=true'
  }, {
    test: /\.scss$/,
    include: path.resolve(__dirname, 'src/styles'),
    loader: 'style!css!sass?sourceMap=true'
  }]
}
```

```javascript
/* src/app.js */
import './styles/app.scss';
import Component from './view/Component'
 
/* src/views/Component.js */
// 以下为组件相关样式
import './Component.scss';
```

目录结构如下：

```
src
├── app.js
├── styles
│   ├── app.scss
│   └── normalize.scss
└── views
    ├── Component.js
    └── Component.scss
```

这样所有全局的样式都放到 `src/styles/app.scss` 中引入就可以了

其它所有目录包括 `src/views` 中的样式都是局部的