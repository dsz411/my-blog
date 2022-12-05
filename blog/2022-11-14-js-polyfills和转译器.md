---
slug: "polyfills-and-transpilers"
title: "JS 的 polyfills 和转译器"
authors:
  - name: Shouzhou Du
    title: Author of this website
    url: https://github.com/dsz411
    image_url: https://avatars.githubusercontent.com/u/49437416?v=4
---

## 转译器

[转译器](https://en.wikipedia.org/wiki/Source-to-source_compiler)是一段可以转译源码的特殊代码; 它可以解析比较超前的代码, 并使用旧的语法结构对其进行重写, 进而使其也可以在旧的引擎中工作

例如, 在 ES2020 之前没有"空值合并运算符" `??`, 所以, 如果访问者使用过时了的浏览器访问使用了 `??` 的网页, 那么该浏览器可能就不能明白 `height = height ?? 100` 这段代码的含义了

这时我们就需要转译器, 转译器会分析我们的代码, 并将 `height ?? 100` 重写为 `(height !== undefined && height !== null) ? height : 100`

```javascript
// 在运行转译器之前
height = height ?? 100;

// 在运行转译器之后
height = (height !== undefined && height !== null) ? height : 100;
```

现在, 重写了的代码适用于更旧版本的 JavaScript 引擎了, 通常, 开发者会在开发时先运行转译器, 然后再将转译后的代码部署到服务器; 说到名字, Babel 是最著名的转译器之一

现代项目构建系统, 例如 webpack, 为开发者提供了在每次代码更改并保存时自动运行转译器的方法, 因此很容易将代码转译集成到开发过程中

## Polyfills

新的语言特性可能不仅包括语法结构和运算符, 还可能包括内建函数; 例如 `Math.trunc(n)` 是一个用于"截断"数字小数部分的函数, 例如 `Math.trunc(1.23)` 会返回 `1`

因为在一些非常过时的 JavaScript 引擎中没有 `Math.trunc` 函数, 所以这样的代码会执行失败; 由于这是个新函数, 而不是语法的更改, 因此你不能对其进行转译, 因为没有任何现有的语法可以填充空白, 我们需要声明缺失的函数

更新或添加新函数的脚本被称为"polyfill", 它为我们目前的引擎"填补"了空白并添加了缺失的实现, 下面是一个 `Math.trunc` 的 polyfill, 如下所示：

```javascript
if (!Math.trunc) { // 如果没有这个函数
  // 实现它
  Math.trunc = function(number) {
    // Math.ceil 和 Math.floor 甚至存在于上古年代的 JavaScript 引擎中
    // 在本教程的后续章节中会讲到它们
    return number < 0 ? Math.ceil(number) : Math.floor(number);
  };
}
```

JavaScript 是一种高度动态的语言, 脚本可以添加或修改任何函数, 甚至包括内建的函数; 比较流行地 polyfill 库有：

- [core js](https://github.com/zloirock/core-js)
- [polyfill.io](https://polyfill.io/v3/)
