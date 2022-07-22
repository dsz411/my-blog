---
sidebar_position: 4
---

# CSS Modules 模块化方案

CSS Modules 内部通过 [ICSS](https://github.com/css-modules/icss) 来解决样式导入和导出这两个问题。分别对应 `:import` 和 `:export` 两个新增的伪类

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

## 启用 CSS Modules

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

注意到 `button--normal-abc5436` 是 CSS Modules 按照 `localIdentName` 自动生成的 class 名。其中的 `abc5436` 是按照给定算法生成的序列码

经过这样混淆处理后，class 名基本就是唯一的，大大降低了项目中样式覆盖的几率。同时在生产环境下修改规则，生成更短的 class 名，可以提高 CSS 的压缩率。

上例中 console 打印的结果是：

```css
Object {
  normal: 'button--normal-abc546',
  disabled: 'button--disabled-def884',
}
```

CSS Modules 对 CSS 中的 class 名都做了处理，使用对象来保存原 class 和混淆后 class 的对应关系。

通过这些简单的处理，CSS Modules 实现了以下几点：

- 所有样式都是 local 的，解决了命名冲突和全局污染问题
- class 名生成规则配置灵活，可以此来压缩 class 名
- 只需引用组件的 JS 就能搞定组件所有的 JS 和 CSS
- 依然是 CSS，几乎 0 学习成本

## 样式默认局部

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

## Compose 来组合样式

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

对于大多数项目，有了 `composes` 后已经不再需要 Sass/Less/PostCSS。但如果你想用的话，由于 `composes` 不是标准的 CSS 语法，编译时会报错。就只能使用预处理器自己的语法来做样式复用了

## class 命名技巧

CSS Modules 的命名规范是从 BEM 扩展而来。BEM 把样式名分为 3 个级别，分别是：

- Block：对应模块名，如 Dialog
- Element：对应模块中的节点名 Confirm Button
- Modifier：对应节点相关的状态，如 disabled、highlight

综上，BEM 最终得到的 class 名为 `dialog__confirm-button--highlight`。使用双符号 `__` 和 `--` 是为了和区块内单词间的分隔符区分开来

虽然看起来有点奇怪，但 BEM 被非常多的大型项目和团队采用。我们实践下来也很认可这种命名方法

CSS Modules 中 CSS 文件名恰好对应 Block 名，只需要再考虑 Element 和 Modifier。BEM 对应到 CSS Modules 的做法是：

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

## 如何实现CSS，JS变量共享

上面提到的 `:export` 关键字可以把 CSS 中的 变量输出到 JS 中。下面演示如何在 JS 中读取 Sass 变量：

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

