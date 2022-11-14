---
sidebar_position: 5
---

# 实现一个基于 Promise 的 API

在上一篇文章中，我们讨论了如何使用返回 Promise 的API。在这篇文章中，我们将看一下另一面--如何实现返回 Promise 的API。这比使用基于 Promise 的API要少得多，但它仍然值得了解

一般来说，当你实现一个基于 Promise 的API时，你将包装一个异步操作，它可能使用事件，或普通的回调，或消息传递模型。你将安排一个Promise对象来正确处理该操作的成功或失败

## 实现一个alarm() API

在这个例子中，我们将实现一个基于 Promise 的 alarm API，称为 `alarm()`。它的参数是要叫醒的人的名字和在叫醒人之前要等待的延迟时间（毫秒）。在延迟之后，该函数将发送一个 "Wake up!"的消息，包括我们需要唤醒的人的名字

### 包装 setTimeout()

我们将使用 setTimeout() API 来实现我们的 alarm() 函数。setTimeout() API将一个回调函数和一个延迟作为参数，以毫秒为单位。当setTimeout()被调用时，它启动一个设置为给定延迟的计时器，当时间过后，它就会调用给定的函数

在下面的例子中，我们用一个回调函数和一个1000毫秒的延迟调用setTimeout()

```javascript
<button id="set-alarm">Set alarm</button>
<div id="output"></div>
```

```javascript
const output = document.querySelector('#output');
const button = document.querySelector('#set-alarm');

function setAlarm() {
  window.setTimeout(() => {
    output.textContent = 'Wake up!';
  }, 1000);
}

button.addEventListener('click', setAlarm);
```

### Promise() 构造函数

我们的alarm()函数将返回一个Promise，这个Promise在定时器过期时被履行。它将向then()处理程序传递一个 "Wake up!"的消息，如果调用者提供一个负的延迟值，它将拒绝这个 Promise

这里的关键组件是Promise()构造函数。Promise()构造函数需要一个单一的函数作为参数。我们将这个函数称为 executor。当你创建一个新的 Promise 时，你要提供executor的实现

这个 executor 函数本身需要两个参数，这两个参数也都是函数，习惯上被称为 resolve 和 reject。在你的执行器实现中，你调用底层的异步函数。如果异步函数成功，你就调用 resolve，如果失败，你就调用 reject。如果执行器函数抛出一个错误，就会自动调用 reject。你可以向 resolve 和 reject 传递任何类型的单个参数

所以我们可以这样实现alarm()

```javascript
function alarm(person, delay) {
  return new Promise((resolve, reject) => {
    if (delay < 0) {
      throw new Error('Alarm delay must not be negative');
    }
    window.setTimeout(() => {
      resolve(`Wake up, ${person}!`);
    }, delay);
  });
}
```

这个函数创建并返回一个新的Promise。在该 Promise 的执行器中，我们:

- 检查delay是否为负值，如果是，则抛出一个错
- 调用`window.setTimeout()`，传递一个回调和delay。当定时器过期时，回调将被调用，在回调中我们调用resolve，传入我们的 "Wake up!"信息

## 使用 alarm() API

这一部分在上一篇文章中应该是很熟悉的。我们可以调用alarm()，并在返回的Promise上调用then()和catch()来设置promise实现和拒绝的处理程序

```javascript
const name = document.querySelector('#name');
const delay = document.querySelector('#delay');
const button = document.querySelector('#set-alarm');
const output = document.querySelector('#output');

function alarm(person, delay) {
  return new Promise((resolve, reject) => {
    if (delay < 0) {
      throw new Error('Alarm delay must not be negative');
    }
    window.setTimeout(() => {
      resolve(`Wake up, ${person}!`);
    }, delay);
  });
}

button.addEventListener('click', () => {
  alarm(name.value, delay.value)
    .then(message => output.textContent = message)
    .catch(error => output.textContent = `Couldn't set alarm: ${error}`);
});
```

尝试为 "Name "和 "Delay"设置不同的值。尝试为 "Delay"设置一个负值

## 在alarm()API中使用async和await

由于alarm()返回一个Promise，我们可以用它做任何其他 Promise 的事情：Promise链，Promise.all()，和async / await

```javascript
const name = document.querySelector('#name');
const delay = document.querySelector('#delay');
const button = document.querySelector('#set-alarm');
const output = document.querySelector('#output');

function alarm(person, delay) {
  return new Promise((resolve, reject) => {
    if (delay < 0) {
      throw new Error('Alarm delay must not be negative');
    }
    window.setTimeout(() => {
      resolve(`Wake up, ${person}!`);
    }, delay);
  });
}

button.addEventListener('click', async () => {
  try {
    const message = await alarm(name.value, delay.value);
    output.textContent = message;
  }
  catch (error) {
    output.textContent = `Couldn't set alarm: ${error}`;
  }
});
```

