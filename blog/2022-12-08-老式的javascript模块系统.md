---
slug: "old-module-system-of-js"
title: "老式的 JS 模块系统"
authors:
  - name: Shouzhou Du
    title: Author of this website
    url: https://github.com/dsz411
    image_url: https://avatars.githubusercontent.com/u/49437416?v=4
---

## CommonJS

这个规范主要用于在服务器端实现模块化代码的组织, CommonJS模块语法不能在浏览器中直接运行, CommonJS模块定义需要使用`require()`指定依赖, 使用`exports`对象定义自己的公共API

> Node.js 实现了 CommonJS 模块规范

下面的代码展示了一个简单的模块定义:

<!--truncate-->

```javascript
// moduleA.js

var moduleB = require('./moduleB');

console.log('moduleA');

module.exports = {
  stuff: moduleB.doStuff();
};
```

`moduleA`通过使用一个相对路径来指定自己对`moduleB`的依赖; 模块标识符可能指向文件, 也可能指向包含index.js文件的目录, 也就是说, `require(./moduleB)` 可以加载的是 `./moduleB.js`, 也可以加载的是 `./moduleB/index.js`

> 把模块赋值给变量也非常常见, 但赋值给变量不是必需的

调用`require()`意味着会把模块原封不动地加载进来:

```javascript
require('./moduleA'); // "moduleA"
```

无论一个模块在`require()`中被引用多少次, 模块永远是单例的, 在下面的例子中, `moduleA`只会被打印一次, 这是因为无论请求多少次, `moduleA`只会被加载一次

```javascript
var a1 = require('./moduleA');
var a2 = require('./moduleA');

console.log(a1 === a2); // true
```

模块在第一次加载后会被缓存, 后续加载会取缓存的模块, 模块加载顺序由依赖图决定

```javascript
require('./moduleA');
require('./moduleB'); // 会取缓存的 moduleB, 因为在加载第一个 moduleA 时, 就已经加载了 moduleB
require('./moduleA');
```

在CommonJS中, 模块加载是模块系统执行的同步操作, 因此`require()`可以像下面这样以编程方式嵌入在模块中:

```javascript
if (loadCondition) {
  require('./moduleA');
}
```

这里, `moduleA`只会在`loadCondition`求值为`true`时才会加载; 这个加载是同步的, 因此`if()`块之前的任何代码都会在加载`moduleA`之前执行, 而`if()`块之后的任何代码都会在加载`moduleA`之后执行

`moduleA`在`module.exports`对象上定义自己的公共接口, 即`stuff`属性, 如果有模块想使用这个接口, 可以像下面这样导入它:

```javascript
var moduleA = require('./moduleA');

console.log(moduleA.stuff);
```

注意, 上面模块不导出任何内容; 但即使它没有公共接口, 然而如果某个应用程序请求了这个模块, 那也会在加载时执行这个模块

`module.exports`对象非常灵活, 有多种使用方式, 如果你只想导出一个实体, 你可以直接给`module.exports`赋值:

```javascript
// foo.js

module.exports = 'foo';
```

这样, 整个模块就导出一个字符串, 可以像下面这样使用:

```javascript
var Foo = require('./foo');

console.log(Foo); // 'foo'
```

导出多个值也很常见, 你可以选择为 module.exports 赋予一个对象字面量或将每个导出属性一一挂载到 moudle.exports 上来实现:

```javascript
// 等价操作：

module.exports = {
  a: 'A',
  b: 'B'
};

module.exports.a = 'A';
module.exports.b = 'B';
```

模块的一个主要用途是托管类的定义:

```javascript
// A.js

class A {}

module.exports = A;
```

```javascript
var A = require('./A');

var a = new A();
```

你也可以直接将类实例作为导出值:

```javascript
class A {}

module.exports = new A();
```

## AMD

CommonJS以服务器端为目标环境, 能够一次性把所有模块都加载到内存, 而异步模块定义的模块系统则以浏览器为目标执行环境, 所以这需要考虑网络延迟的问题

AMD的一般策略是让模块声明自己的依赖, 而运行在浏览器中的模块系统会按需获取依赖, 并在依赖加载完成后立即执行依赖它们的模块; AMD模块实现的核心是用函数包装模块定义, 这样可以防止声明全局变量, 并允许加载器库控制何时加载模块

包装函数也便于模块代码的移植, 因为包装函数内部的所有模块代码使用的都是原生JavaScript结构, 包装模块的函数是全局`define`的参数, 它是由AMD加载器库的实现定义的; AMD模块可以使用字符串标识符指定自己的依赖, 而AMD加载器会在所有依赖模块加载完毕后立即调用模块工厂函数; 与CommonJS不同, AMD支持可选地为模块指定字符串标识符:

```javascript
// ID为'moduleA'的模块定义, moduleA依赖moduleB
// moduleB会异步加载
define('moduleA', ['moduleB'], function(moduleB) {
  return {
    stuff: moduleB.doStuff();
  };
});
```

AMD也支持`require`和`exports`对象, 通过它们可以在AMD模块工厂函数内部定义CommonJS风格的模块, 这样可以像请求模块一样请求它们, 但AMD加载器会将它们识别为原生AMD结构, 而不是模块定义:

```javascript
define('moduleA', ['require', 'exports'], function(require, exports) {
  var moduleB = require('moduleB');

  exports.stuff = moduleB.doStuff();
});
```

动态依赖也是通过这种方式支持的:

```javascript
define('moduleA', ['require'], function(require) {
  if (condition) {
    var moduleB = require('moduleB');
  }
});
```

## UMD

为了统一CommonJS和AMD两种模块生态系统, 通用模块定义规范应运而生, UMD可用于创建这两个系统都可以使用的模块代码

本质上, UMD定义的模块会在启动时检测要使用哪个模块系统, 然后进行适当配置, 并把所有逻辑包装在一个立即调用的函数表达式中, 虽然这种组合并不完美, 但在很多场景下足以实现两个生态的共存

下面是一个只包含一个依赖的UMD模块定义的示例:

```javascript
  (function (root, factory) {
    if (typeof define === 'function' && define.amd) {
      // AMD。注册为匿名模块
      define(['moduleB'], factory);
    } else if (typeof module === 'object' && module.exports) {
    // Node。不支持严格CommonJS
    // 但可以在Node这样支持module.exports的
    // 类CommonJS环境下使用
    module.exports = factory(require(' moduleB '));
  } else {
    // 浏览器全局上下文（root是window）
    root.returnExports = factory(root. moduleB);
  }
}(this, function (moduleB) {
  // 以某种方式使用moduleB

  // 将返回值作为模块的导出
  // 这个例子返回了一个对象
  // 但是模块也可以返回函数作为导出值
  return {};
}));
```

此模式有支持 CommonJS 和浏览器全局上下文的变体, 不应该期望手写这个包装函数, 它应该由构建工具自动生成, 开发者只需专注于模块的内部内容, 而不必关心这些样板代码
