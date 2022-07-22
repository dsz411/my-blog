---
sidebar_position: 4
---

# JavaScript 快速入门

我们来学习一些 JavaScript 的核心特性，从而更好地理解它的运行机制

学习这些知识很有意义，因为这些原理普遍适用于所有编程语言，掌握好它们，可以做到融会贯通

> 学习本节时，请尝试将示例代码输入到 JavaScript 控制台里看看会发生什么
>
>  JavaScript 控制台的更多信息请查看 [浏览器开发者工具](https://developer.mozilla.org/zh-CN/docs/Learn/Common_questions/What_are_browser_developer_tools)

## 变量

变量是存储值的容器

要声明一个变量，先输入关键字 `let` 或 `var`，然后输入合适的名称：

```javascript
let myVariable;
```

> 行末的分号表示当前语句结束，不过只有在单行内需要分割多条语句时，这个分号才是必须的
>
> 然而，一些人认为每条语句末尾加分号是一种好的风格
>
> 分号使用规则的更多细节请参阅 [JavaScript 分号使用指南](http://news.codecademy.com/your-guide-to-semicolons-in-javascript/)

> 几乎任何内容都可以作为变量名，但还是有一些限制
>
> 如果你不确定，还可以 [验证变量名](https://mothereff.in/js-variables) 是否有效

> JavaScript 对大小写敏感，`myVariable` 和 `myvariable` 是不同的
>
> 如果代码出现问题了，先检查一下大小写

变量定义后可以进行赋值：

```javascript
myVariable = '李雷';
```

也可以将定义、赋值操作写在同一行：

```javascript
let myVariable = '李雷';
```

可以直接通过变量名取得变量的值：

```javascript
myVariable;
```

变量在赋值后是可以更改的：

```javascript
let myVariable = '李雷';
myVariable = '韩梅梅';
```

注意变量可以有不同的数据类型 ：

| 变量    | 解释                                                         | 示例                                                         |
| :------ | :----------------------------------------------------------- | :----------------------------------------------------------- |
| String  | 字符串（一串文本）：字符串的值必须用引号（单双均可，必须成对）扩起来 | `let myVariable = '李雷';`                                   |
| Number  | 数字：无需引号                                               | `let myVariable = 10;`                                       |
| Boolean | 布尔值（真 / 假）： `true`/`false` 是 JS 里的特殊关键字，无需引号 | `let myVariable = true;`                                     |
| Array   | 数组：用于在单一引用中存储多个值的结构                       | `let myVariable = [1, '李雷', '韩梅梅', 10];` 元素引用方法：`myVariable[0]`, `myVariable[1]` …… |
| Object  | 对象：JavaScript 里一切皆对象，一切皆可储存在变量里。这一点要牢记于心 | `let myVariable = document.querySelector('h1');` 以及上面所有示例都是对象 |

那么变量有什么用呢？

我们说，编程时它们无所不在

如果值无法改变，那么就无法做任何动态的工作，比如发送个性化的问候，或是改变在图片库当前展示的图片

## 注释

类似于 CSS，JavaScript 中可以添加注释

```
/*
这里的所有内容
都是注释。
*/
```

如果注释只有一行，可以更简单地将注释放在两个斜杠之后，就像这样：

```
// 这是一条注释。
```

## 运算符

运算符 是一类数学符号，可以根据两个值（或变量）产生结果

以下表格中介绍了一些最简单的运算符，可以在浏览器控制台里尝试一下后面的示例

> 这里说“根据两个值（或变量）产生结果”是不严谨的，计算两个变量的运算符称为“二元运算符”，还有一元运算符和三元运算符，下表中的“取非”就是一元运算符

| 运算符     | 解释                                                         | 符号          | 示例                                                         |
| :--------- | :----------------------------------------------------------- | :------------ | :----------------------------------------------------------- |
| 加         | 将两个数字相加，或拼接两个字符串                             | `+`           | `6 + 9;"Hello " + "world!";`                                 |
| 减、乘、除 | 这些运算符操作与基础算术一致。只是乘法写作星号，除法写作斜杠 | `-`, `*`, `/` | `9 - 3;8 * 2; //乘法在JS中是一个星号9 / 3;`                  |
| 赋值运算符 | 为变量赋值（你之前已经见过这个符号了）                       | `=`           | `let myVariable = '李雷';`                                   |
| 等于       | 测试两个值是否相等，并返回一个 `true`/`false` （布尔）值     | `===`         | `let myVariable = 3;myVariable === 4; // false`              |
| 不等于     | 和等于运算符相反，测试两个值是否不相等，并返回一个 `true`/`false` （布尔）值 | `!==`         | `let myVariable = 3;myVariable !== 3; // false`              |
| 取非       | 返回逻辑相反的值，比如当前值为真，则返回 `false`             | `!`           | 原式为真，但经取非后值为 `false`： `let myVariable = 3;!(myVariable === 3); // false` |

运算符种类远不止这些，不过目前上表已经够用了

完整列表请参阅表达式和运算符

> 不同类型数据之间的计算可能出现奇怪的结果，因此必须正确引用变量，才能得出预期结果
>
> 比如在控制台输入 `"35" + "25"`，为什么不能得到 `60`？
>
> 因为引号将数字转换成了字符串，所以结果是连接两个字符串而不是把两个数字相加
>
> 输入 `35 + 25` 才能得到正确结果

## 条件语句

条件语句是一种代码结构，用来测试表达式的真假，并根据测试结果运行不同的代码

一个常用的条件语句是 `if ... else`

下面是一个示例：

```javascript
let iceCream = 'chocolate';
if (iceCream === 'chocolate') {
  alert('我最喜欢巧克力冰激淋了。');
} else {
  alert('但是巧克力才是我的最爱呀……');
}
```

`if ( ... )` 中的表达式进行测试，用（上文所提到的）等于运算符来比较变量 `iceCream` 与字符串 `'chocolate'` 是否相等

如果返回 `true`，则运行第一个代码块；如果返回 `false`，则跳过第一块直接运行 `else` 之后的第二个代码块

## 函数

函数用来封装可复用的功能

如果没有函数，一段特定的操作过程用几次就要重复写几次，而使用函数则只需写下函数名和一些简短的信息

之前已经涉及过一些函数，比如：

```javascript
let myVariable = document.querySelector('h1');
```

```javascript
alert('hello!');
```

`document.querySelector` 和 `alert` 是浏览器内置的函数，随时可用

如果代码中有一个类似变量名后加小括号 `()` 的东西，很可能就是一个函数

函数通常包括参数，参数中保存着一些必要的数据

它们位于括号内部，多个参数之间用逗号分开

比如， `alert()` 函数在浏览器窗口内弹出一个警告框，还应为其提供一个字符串参数，以告诉它警告框里要显示的内容

好消息是：人人都能定义自己的函数

下面的示例是为两个参数进行乘法运算的函数：

```javascript
function multiply(num1, num2) {
  let result = num1 * num2;
  return result;
}
```

尝试在控制台运行这个函数，不妨多试几组参数，比如：

```javascript
multiply(4, 7);
multiply(20, 20);
multiply(0.5, 3);
```

> `return` 语句告诉浏览器当前函数返回 `result` 变量
>
> 这是一点很有必要，因为函数内定义的变量只能在函数内使用
>
> 这叫做变量的作用域

## 事件

事件能为网页添加真实的交互能力

它可以捕捉浏览器操作并运行一些代码做为响应

最简单的事件是 点击事件，鼠标的点击操作会触发该事件

可尝试将下面的代码输入到控制台，然后点击页面的任意位置：

```javascript
document.querySelector('html').onclick = function() {
    alert('别戳我，我怕疼。');
}
```

将事件与元素绑定有许多方法

在这里选用了 `<html>` 元素，把一个匿名函数（就是没有命名的函数，这里的匿名函数包含单击鼠标时要运行的代码）赋值给了 `html` 的 `onclick` 属性

请注意：

```javascript
document.querySelector('html').onclick = function() {};
```

等价于

```javascript
let myHTML = document.querySelector('html');
myHTML.onclick = function() {};
```

只是前者更简洁