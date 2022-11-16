---
sidebar_position: 7
---

# 实现可观察对象

异步迭代器可以耐心等待下一次迭代而不会导致计算成本，那么这也为实现可观察对象接口提供了可能

总体上看，这涉及捕获事件，将它们封装在期约中，然后把这些事件提供给迭代器，而处理程序可以利用这些异步迭代器

在某个事件触发时，异步迭代器的下一个期约会解决为该事件

下面这个简单的例子会捕获浏览器事件的可观察流

这需要一个期约的队列，每个期约对应一个事件

该队列也会保持事件生成的顺序，对这种问题来说保持顺序也是合理的

```javascript
class Observable {
  constructor() {
    this.promiseQueue = [];

    // 保存用于解决队列中下一个期约的程序
    this.resolve = null;

    // 把最初的期约推到队列
    // 该期约会解决为第一个观察到的事件
    this.enqueue();
  }

  // 创建新期约，保存其解决方法
  // 再把它保存到队列中
  enqueue() {
    this.promiseQueue.push(
      new Promise((resolve) => this.resolve = resolve));
  }

  // 从队列前端移除期约
  // 并返回它
  dequeue() {
    return this.promiseQueue.shift();
  }
}
```

要利用这个期约队列，可以在这个类上定义一个异步生成器方法

该生成器可用于任何类型的事件：

```javascript
class Observable {
  constructor() {
    this.promiseQueue = [];

    // 保存用于解决队列中下一个期约的程序
    this.resolve = null;

    // 把最初的期约推到队列
    // 该期约会解决为第一个观察到的事件
    this.enqueue();
  }

  // 创建新期约，保存其解决方法
  // 再把它保存到队列中
  enqueue() {
    this.promiseQueue.push(
      new Promise((resolve) => this.resolve = resolve));
  }

  // 从队列前端移除期约
  // 并返回它
  dequeue() {
    return this.promiseQueue.shift();
  }

  async *fromEvent (element, eventType) {
    // 在有事件生成时，用事件对象来解决队列头部的期约
    // 同时把另一个期约加入队列
    element.addEventListener(eventType, (event) => {
      this.resolve(event);
      this.enqueue();
    });

    // 每次解决队列前面的期约
    // 都会向异步迭代器返回相应的事件对象
    while (1) {
      yield await this.dequeue();
    }
  }
}
```

这样，这个类就定义完了

接下来在DOM元素上定义可观察对象就很简单了

假设页面上有一个`<button>`元素，可以像下面这样捕获该按钮上的一系列`click`事件，然后在控制台把它们打印出来：

```javascript
class Observable {
  constructor() {
    this.promiseQueue = [];

    // 保存用于解决队列中下一个期约的程序
    this.resolve = null;

    // 把最初的期约推到队列
    // 该期约会解决为第一个观察到的事件
    this.enqueue();
  }

  // 创建新期约，保存其解决方法
  // 再把它保存到队列中
  enqueue() {
    this.promiseQueue.push(
      new Promise((resolve) => this.resolve = resolve));
  }

  // 从队列前端移除期约
  // 并返回它
  dequeue() {
    return this.promiseQueue.shift();
  }

  async *fromEvent (element, eventType) {
    // 在有事件生成时，用事件对象来解决 队列头部的期约
    // 同时把另一个期约加入队列
    element.addEventListener(eventType, (event) => {
      this.resolve(event);
      this.enqueue();
    });

    // 每次解决队列前面的期约
    // 都会向异步迭代器返回相应的事件对象
    while (1) {
      yield await this.dequeue();
    }
  }
}

(async function() {
  const observable = new Observable();

  const button = document.querySelector('button');
  const mouseClickIterator = observable.fromEvent(button, 'click');

  for await (const clickEvent of mouseClickIterator) {
    console.log(clickEvent);
  }
})();
```

