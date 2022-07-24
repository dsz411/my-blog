---
slug: "css-module"
title: "CSS 模块"
tags: [css]
authors:
  - name: Shouzhou Du
    title: Author of this website
    url: https://github.com/dsz411
    image_url: https://avatars.githubusercontent.com/u/49437416?v=4
---

# CSS 模块

为了理解css模块化思想，我们首先了解下，什么是模块化，在百度百科上的解释是，在系统的结构中，模块是可组合、分解和更换的单元

模块化是一种处理复杂系统分解成为更好的可管理模块的方式

它可以通过在不同组件设定不同的功能，把一个问题分解成多个小的独立、互相作用的组件，来处理复杂、大型的软件

看完模块化，是不是有种拼图的即视感，可以把大图分成各个小图，然后把小图拼成大图，分与合的艺术感

那么css模块化思想，也就是在css编写环境中，用上模块化的思想，把一个大的项目，分解成独立的组件，不同的组件负责不同的功能，最后把模块组装，就成了我们要完成的项目了

## CSS 模块化有什么好处？

当做一个大项目，几个人团队合作开发，结果看不懂彼此的代码，怎么办，当面对前人已经写好代码，需要修改，可是无处下手，怎么办

当代码耦合，修改费时费力，怎么办，当需要迭代，面对庞大的代码，牵一发动全身的悲催时刻，怎么办，这个时候，模块化思想就是救星了

css写法特别的灵活，也因为灵活，所以容易耦合在一起，这时候就需要进行模块化的分离

那么css模块化的好处多多，列举了一些如下：

- 提高代码重用率

- 提高开发效率、减少沟通成本
- 提高页面容错
- 降低耦合
- 降低发布风险
- 减少Bug定位时间和Fix成本
- 更好的实现快速迭代
- 便于代码维护

CSS 模块化的解决方案有很多，但主要有两类

一类是彻底抛弃 CSS，使用 JS 或 JSON 来写样式

[Radium](https://github.com/FormidableLabs/radium)，[jsxstyle](https://github.com/petehunt/jsxstyle)，[react-style](https://github.com/js-next/react-style) 属于这一类

优点是能给 CSS 提供 JS 同样强大的模块化能力；缺点是不能利用成熟的 CSS 预处理器（或后处理器） Sass/Less/PostCSS，`:hover` 和 `:active` 伪类处理起来复杂

另一类是依旧使用 CSS，但使用 JS 来管理样式依赖，代表是 [CSS Modules](https://github.com/css-modules/css-modules)

CSS Modules 能最大化地结合现有 CSS 生态和 JS 模块化能力，API 简洁到几乎零学习成本

发布时依旧编译出单独的 JS 和 CSS

它并不依赖于 React，只要你使用 Webpack，可以在 Vue/Angular/jQuery 中使用

是我认为目前最好的 CSS 模块化解决方案

近期在项目中大量使用，下面具体分享下实践中的细节和想法

## CSS 模块化解决了哪些问题？

CSS 模块化重要的是要解决好两个问题：CSS 样式的导入和导出

灵活按需导入以便复用代码；导出时要能够隐藏内部作用域，以免造成全局污染

Sass/Less/PostCSS 等前仆后继试图解决 CSS 编程能力弱的问题，结果它们做的也确实优秀，但这并没有解决模块化最重要的问题

Facebook 工程师 [Vjeux](https://github.com/vjeux) 首先抛出了 React 开发中遇到的一系列 CSS 相关问题

加上我个人的看法，总结如下：

1. 全局污染

   CSS 使用全局选择器机制来设置样式，优点是方便重写样式

   缺点是所有的样式都是全局生效，样式可能被错误覆盖，因此产生了非常丑陋的 `!important`，甚至 inline `!important` 和复杂的[选择器权重计数表](https://www.w3.org/TR/selectors/#specificity)，提高犯错概率和使用成本

   Web Components 标准中的 Shadow DOM 能彻底解决这个问题，但它的做法有点极端，样式彻底局部化，造成外部无法重写样式，损失了灵活性

2. 命名混乱

   由于全局污染的问题，多人协同开发时为了避免样式冲突，选择器越来越复杂，容易形成不同的命名风格，很难统一

   样式变多后，命名将更加混乱

3. 依赖管理不彻底

   组件应该相互独立，引入一个组件时，应该只引入它所需要的 CSS 样式

   但现在的做法是除了要引入 JS，还要再引入它的 CSS，而且 Saas/Less 很难实现对每个组件都编译出单独的 CSS，引入所有模块的 CSS 又造成浪费

   JS 的模块化已经非常成熟，如果能让 JS 来管理 CSS 依赖是很好的解决办法

   Webpack 的 `css-loader` 提供了这种能力

4. 无法共享变量

   复杂组件要使用 JS 和 CSS 来共同处理样式，就会造成有些变量在 JS 和 CSS 中冗余，Sass/PostCSS/CSS 等都不提供跨 JS 和 CSS 共享变量这种能力

5. 代码压缩不彻底

   由于移动端网络的不确定性，现在对 CSS 压缩已经到了变态的程度

   很多压缩工具为了节省一个字节会把 '16px' 转成 '1pc'

   但对非常长的 class 名却无能为力，力没有用到刀刃上

上面的问题如果只凭 CSS 自身是无法解决的，如果是通过 JS 来管理 CSS 就很好解决，因此 Vjuex 给出的解决方案是完全的 [CSS in JS](http://blog.vjeux.com/2014/javascript/react-css-in-js-nationjs.html)，但这相当于完全抛弃 CSS，在 JS 中以 Object 语法来写 CSS，估计刚看到的小伙伴都受惊了

直到出现了 CSS Modules

## CSS Modules 模块化方案

CSS Modules 内部通过 [ICSS](https://github.com/css-modules/icss) 来解决样式导入和导出这两个问题

分别对应 `:import` 和 `:export` 两个新增的伪类

```css
:import("path/to/dep.css") {
  localAlias: keyFromDep;
  /* ... */
}
:export {
  exportedKey: exportedValue;
  /* ... */
}
```

但直接使用这两个关键字编程太麻烦，实际项目中很少会直接使用它们，我们需要的是用 JS 来管理 CSS 的能力

结合 Webpack 的 `css-loader` 后，就可以在 CSS 中定义样式，在 JS 中导入

### 启用 CSS Modules

```javascript
// webpack.config.js
css?modules&localIdentName=[name]__[local]-[hash:base64:5]
```

加上 `modules` 即为启用，`localIdentName` 是设置生成样式的命名规则

```css
/* components/Button.css */
.normal { /* normal 相关的所有样式 */ }
.disabled { /* disabled 相关的所有样式 */ }
```

```javascript
/* components/Button.js */
import styles from './Button.css';
 
console.log(styles);
 
buttonElem.outerHTML = `<button class=${styles.normal}>Submit</button>`
```

生成的 HTML 是

```html
<button class="button--normal-abc53"> Processing... </button>
```

注意到 `button--normal-abc5436` 是 CSS Modules 按照 `localIdentName` 自动生成的 class 名

其中的 `abc5436` 是按照给定算法生成的序列码

经过这样混淆处理后，class 名基本就是唯一的，大大降低了项目中样式覆盖的几率

同时在生产环境下修改规则，生成更短的 class 名，可以提高 CSS 的压缩率

上例中 console 打印的结果是：

```css
Object {
  normal: 'button--normal-abc546',
  disabled: 'button--disabled-def884',
}
```

CSS Modules 对 CSS 中的 class 名都做了处理，使用对象来保存原 class 和混淆后 class 的对应关系

通过这些简单的处理，CSS Modules 实现了以下几点：

- 所有样式都是 local 的，解决了命名冲突和全局污染问题
- class 名生成规则配置灵活，可以此来压缩 class 名
- 只需引用组件的 JS 就能搞定组件所有的 JS 和 CSS
- 依然是 CSS，几乎 0 学习成本

### 样式默认局部

使用了 CSS Modules 后，就相当于给每个 class 名外加加了一个 `:local`，以此来实现样式的局部化，如果你想切换到全局模式，使用对应的 `:global`

```css
.normal {
  color: green;
}
 
/* 以上与下面等价 */
:local(.normal) {
  color: green; 
}
 
/* 定义全局样式 */
:global(.btn) {
  color: red;
}
 
/* 定义多个全局样式 */
:global {
  .link {
    color: green;
  }
  .box {
    color: yellow;
  }
}
```

### Compose 来组合样式

对于样式复用，CSS Modules 只提供了唯一的方式来处理：`composes` 组合

```css
/* components/Button.css */
.base { /* 所有通用的样式 */ }
 
.normal {
  composes: base;
  /* normal 其它样式 */
}
 
.disabled {
  composes: base;
  /* disabled 其它样式 */
}
```

```javascript
import styles from './Button.css';
 
buttonElem.outerHTML = `<button class=${styles.normal}>Submit</button>`
```

生成的 HTML 变为

```html
<button class="button--base-abc53 button--normal-abc53"> Processing... </button>
```

由于在 `.normal` 中 composes 了 `.base`，编译后会 normal 会变成两个 class

composes 还可以组合外部文件中的样式

```css
/* settings.css */
.primary-color {
  color: #f40;
}
 
/* components/Button.css */
.base { /* 所有通用的样式 */ }
 
.primary {
  composes: base;
  composes: $primary-color from './settings.css';
  /* primary 其它样式 */
}
```

对于大多数项目，有了 `composes` 后已经不再需要 Sass/Less/PostCSS

但如果你想用的话，由于 `composes` 不是标准的 CSS 语法，编译时会报错

就只能使用预处理器自己的语法来做样式复用了

### class 命名技巧

CSS Modules 的命名规范是从 BEM 扩展而来

BEM 把样式名分为 3 个级别，分别是：

- Block：对应模块名，如 Dialog
- Element：对应模块中的节点名 Confirm Button
- Modifier：对应节点相关的状态，如 disabled、highlight

综上，BEM 最终得到的 class 名为 `dialog__confirm-button--highlight`

使用双符号 `__` 和 `--` 是为了和区块内单词间的分隔符区分开来

虽然看起来有点奇怪，但 BEM 被非常多的大型项目和团队采用

我们实践下来也很认可这种命名方法

CSS Modules 中 CSS 文件名恰好对应 Block 名，只需要再考虑 Element 和 Modifier

BEM 对应到 CSS Modules 的做法是：

```css
/* .dialog.css */
.ConfirmButton--disabled {
}
```

你也可以不遵循完整的命名规范，使用 camelCase 的写法把 Block 和 Modifier 放到一起：

```css
/* .dialog.css */
.disabledConfirmButton {
}
```

### 如何实现CSS，JS变量共享

上面提到的 `:export` 关键字可以把 CSS 中的 变量输出到 JS 中

下面演示如何在 JS 中读取 Sass 变量：

```scss
/* config.scss */
$primary-color: #f40;
 
:export {
  primaryColor: $primary-color;
}
```

```javascript
/* app.js */
import style from 'config.scss';
 
// 会输出 #F40
console.log(style.primaryColor);
```

## CSS Modules 使用技巧

CSS Modules 是对现有的 CSS 做减法

为了追求**简单可控**，作者建议遵循如下原则：

- 不使用选择器，只使用 class 名来定义样式
- 不层叠多个 class，只使用一个 class 把所有样式定义好
- 所有样式通过 `composes` 组合来实现复用
- 不嵌套

上面两条原则相当于削弱了样式中最灵活的部分，初使用者很难接受

第一条实践起来难度不大，但第二条如果模块状态过多时，class 数量将成倍上升

一定要知道，上面之所以称为建议，是因为 CSS Modules 并不强制你一定要这么做

听起来有些矛盾，由于多数 CSS 项目存在深厚的历史遗留问题，过多的限制就意味着增加迁移成本和与外部合作的成本

初期使用中肯定需要一些折衷

幸运的是，CSS Modules 这点做的很好：

- **如果我对一个元素使用多个 class 呢？**

  没问题，样式照样生效

- **如何我在一个 style 文件中使用同名 class 呢？**

  没问题，这些同名 class 编译后虽然可能是随机码，但仍是同名的

- **如果我在 style 文件中使用了 id 选择器，伪类，标签选择器等呢？**

  没问题，所有这些选择器将不被转换，原封不动的出现在编译后的 css 中

  也就是说 CSS Modules 只会转换 class 名相关样式

但注意，上面 3 个“如果”尽量不要发生

## CSS Modules 结合 React 实践

在 `className` 处直接使用 css 中 `class` 名即可

```css
/* dialog.css */
.root {}
.confirm {}
.disabledConfirm {}
```

```jsx
import classNames from 'classnames';
import styles from './dialog.css';
 
export default class Dialog extends React.Component {
  render() {
    const cx = classNames({
      [styles.confirm]: !this.state.disabled,
      [styles.disabledConfirm]: this.state.disabled
    });
 
    return <div className={styles.root}>
      <a className={cx}>Confirm</a>
      ...
    </div>
  }
}
```

注意，一般把组件最外层节点对应的 class 名称为 `root`

这里使用了 [classnames](https://www.npmjs.com/package/classnames) 库来操作 class 名

如果你不想频繁的输入 `styles.**`，可以试一下 [react-css-modules](https://github.com/gajus/react-css-modules)，它通过高阶函数的形式来避免重复输入 `styles.**`

## CSS Modules 结合历史遗留项目实践

好的技术方案除了功能强大炫酷，还要能做到现有项目能平滑迁移

CSS Modules 在这一点上表现的非常灵活

### 外部如何覆盖局部样式

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

### 如何与全局样式共存

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

## 总结

CSS Modules 很好的解决了 CSS 目前面临的模块化难题

支持与 Sass/Less/PostCSS 等搭配使用，能充分利用现有技术积累

同时也能和全局样式灵活搭配，便于项目中逐步迁移至 CSS Modules

CSS Modules 的实现也属轻量级，未来有标准解决方案后可以低成本迁移

如果你的产品中正好遇到类似问题，非常值得一试

更多资源:

- [css-modules/css-modules: Documentation about css-modules (github.com)](https://github.com/css-modules/css-modules)