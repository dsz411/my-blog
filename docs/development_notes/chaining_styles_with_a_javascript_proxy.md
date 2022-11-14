---
sidebar_position: 6
---

# 使用 JavaScript 代理链接样式

使用 Ruby 和 jQuery 的乐趣之一是能够链接方法，使您能够方便地在同一个目标上调用多个方法。例如，在 jQuery 中，大多数方法都返回一个 jQuery 对象，因此您可以构建一个方法链，其中每个新方法都对前一个目标进行操作。这使您能够更新某些样式、运行动画和更新属性，而无需一遍又一遍地查询该元素：

```javascript
$(".menu")
  .css("color", "#fff")
  .data("mode", "light")
  .fadeIn();
```

短而甜。如果你已经用原生 JavaScript 更新了对象的样式，你可能会因为不能链接样式更改而感到恼火，所以你必须这样做：

```javascript
let menu = document.querySelector(".menu");
menu.style.color = "#fff";
menu.style.backgroundColor = "#000";
menu.style.opacity = "1";
```

有几种不同的方法可以让这更方便，但前几天我开始考虑是否可以使用一个[`Proxy`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)对象（在撰写本文时，[全球支持率为 92.76%](https://caniuse.com/#search=proxy)）来启用样式更改的链接。事实证明，这相对容易。我们将介绍如何创建一个轻量级代理处理程序，这将使我们能够将上面的代码缩短为：

```javascript
style(".menu")
  .color("#fff")
  .backgroundColor("#000")
  .opacity("1");
```

我们将使用与 jQuery 大致相同的策略：我们将获取元素的样式对象并用代理包装它，以便拦截（捕获）所有`get`对该`style`对象的所有调用，获取访问的属性并更新其值，如果传递一个值，然后再次返回`Proxy`包装`style`对象的处理程序，使我们能够构建无限的命令链。

由于我们将重新利用 get 方法作为 setter，如果您不向函数传递任何参数，我们将通过返回属性的值来保留 get 功能（即，您将通过`style(".menu").color()`而不是比`style(".menu").color` 获得一个值）。以下是该技术的要点：

```javascript
let styleProxy = {
  get: (object, property) => {
    return (value) => {
      if (value) {
        object[property] = value;
        return new Proxy(object, styleProxy);
      }
      return object[property];
    }
  }
}

let style = (selector) => {
  let element = document.querySelector(selector);

  return new Proxy(element.style, styleProxy);
}
```

让我们分解它，并快速了解一个`Proxy`工作原理。

## 这是一个陷阱

要了解使用代理的第一个方面是`handlers`和`traps`。我们可以创建 `handlers` 来 `trap`一系列操作，例如`get()`、`set()`和`apply()`。从本质上讲，我们将有机会截获我们正在包装的对象上的这些操作，并对它们进行任何我们想要的操作——我们可以根据某些逻辑返回不同的值，或者简单地将操作转发到原始目标

举个简单的例子，无论您尝试访问什么属性，我们总是可以返回相同的值，即使原始对象上没有设置任何属性：

```javascript
let handler = {
  get: () => {
    return "hodor";
  }
}

let person = { name: "Wylis" } 
let proxied = new Proxy(person, handler);

console.log(person.name);  // "Wylis"
console.log(proxied.name); // "hodor"
console.log(proxied.age); //  "hodor"
console.log(proxied.favoriteFood); // "hodor"
```

## 总是返回一个函数

这使我们能够完全改变对象的工作方式。为了启用样式对象的链接，我们将扩展get，使其也作为set工作。我们仍然只捕获get，但不是在访问属性时返回属性的值，而是返回一个函数，该函数只在调用时不带任何参数时返回属性的值。如果传递了一个参数，我们将使用它来更新该属性的值。

让我们先把基本的东西准备好, 让我们创建一个名为getProxy的新 handler，并创建一个get陷阱，在这里我们总是返回一个函数。因此，如果我们只是记录一个属性，我们会得到一个函数。但如果我们调用该函数，我们将看到它的返回值（在本例中为 "test"）

```javascript
let getProxy = {
  get: () => {
    return () => {
      return "test";
    }
  }
}

let proxied = new Proxy({}, getProxy);

console.log( proxied.name );   // Our function: (argument) => { return "test"; }
console.log( proxied.name() ); // The value: "test"
```

## 使用函数来获取和设置值

在我们的新函数中，我们可以检查当它被调用时是否有一个参数被传递给它。如果有东西被传递，我们可以使用该参数来更新属性。如果没有传递参数，我们可以简单地返回该属性的值，基本上保持了原来的 get 功能，同时用一个 set 选项来扩展它

让我们创建一个新的Proxy，这次叫styleProxy。我们将检查是否有东西被传递给它，并进行相应的 get 和 set。我们的代理处理程序也被传递给一个object（我们要包装和拦截的对象）和一个 property 参数（我们要操作的属性），我们可以用这两个来对原始目标进行操作

```javascript
let styleProxy = {
  get: (object, property) => {
    return (value) => {
      if (value) {
        // "object" is the object that we're wrapping
        // "property" is the property of the object that we're accessing
        // "value" is what we passed to the function
        // Let's use these three to update the style object:
        object[property] = value;
      } else {
        // If no arguments were passed, simply return the
        // value of that property:
        return object[property];
      }
    }
  }
}
```

这使得我们的处理程序的get方法既可以作为setter又可以作为getter

```javascript
style(".menu").color("#fff"); // Gets a function which updates color to "#fff"
style(".menu").color();       // No arguments passed, just returns "#fff"
```

请注意，由于我们没有为 set 操作创建一个陷阱，我们仍然可以通过直接给一个属性赋值来设置它的值

```javascript
// Works like expected
style(".menu").color = "#fff";
```

## 返回被包裹在一个代理中的样式对象

现在我们可以控制更新一个属性后返回的内容了,如果有一个参数被传递的话, 我们可以简单地返回包裹在我们的代理处理程序中的原始 style 对象，这样就完成了我们的链接方法

```javascript
let styleProxy = {
  get: (object, property) => {
    return (value) => {
      if (value) {
        object[property] = value;
        // Return the original target, wrapped in the same Proxy handler
        return new Proxy(object, styleProxy);
      }
      return object[property];
    }
  }
}
```

那么，当我们使用方法链时，这就是幕后发生的事情。

```javascript
style(".menu")              // Returns the style object in a Proxy
  .color("#fff")            // Updates color and returns a Proxy
  .backgroundColor("#000")  // Updates bgColor and returns a Proxy
  .opacity("1");            // ... and so on so forth
```

以下是解决方案的完整代码

```javascript
let styleProxy = {
  get: (object, property) => {
    return (value) => {
      if (value) {
        object[property] = value;
        return new Proxy(object, styleProxy);
      }
      return object[property];
    }
  }
}

let style = (selector) => {
  let element = document.querySelector(selector);

  return new Proxy(element.style, styleProxy);
}
```

我不能自信地说，我推荐这种方法 - 由于浏览器的支持率太低，我很快就不会在这个网站上使用它了，但我发现JavaScript的可塑性很强，而且有了Proxy API，我们可以走得更远