---
slug: "js-prototype-chain"
title: "JS 的原型链"
authors:
  - name: Shouzhou Du
    title: Author of this website
    url: https://github.com/dsz411
    image_url: https://avatars.githubusercontent.com/u/49437416?v=4
---

# JS 原型链

在面向对象编程中, 继承是非常实用也非常核心的功能, 这一切都基于面向类语言中的类, 然而, javascript 和面向类的语言不同, 它没有类作为蓝图, javascript中只有对象, 但抽象继承思想又是如此重要, 于是聪明绝顶的javascript开发者们就利用javascript原型链的特性实现了和类继承功能一样的继承方式

## 何为原型

要想弄清楚原型链, 我们得先把原型搞清楚, 原型可以理解为是一种设计模式

`javascript`中的对象有一个特殊的 `[[Prototype]]` 内置属性, 其实就是对其他对象的引用, 几乎所有的对象在创建时 `[[Prototype]]` 都会被赋予一个非空的值

*javascript高级程序设计*是这样描述原型的

> 每个函数都会创建一个 `prototype` 属性, 这个属性是一个对象, 包含应该由特定引用类型的实例共享的属性和方法, 实际上, 这个对象就是通过调用构造函数创建的对象的原型, 使用原型对象的好处是, 在它上面定义的属性和方法都可以被对象实例共享, 原来在构造函数中直接赋给对象实例的值, 可以直接赋值给它们的原型

我们通过一段代码来理解这两段话

```javascript
function Person() { }

// 在Person的原型对象上挂载属性和方法
Person.prototype.name = '滑稽鸭'
Person.prototype.age = 22
Person.prototype.getName = function () {
  return this.name
}

const hjy = new Person()

console.log('hjy: ',hjy)
console.log('getName: ',hjy.getName())
```

这是上面这段代码在 `chrome` 控制台中显示的结果

![01](./01.png)

可以看到, 我们先是创建了一个空的构造函数 `Person`, 然后创建了一个 `Person` 的实例 `hjy`, `hjy` 本身是没有挂载任何属性和方法的, 但是它有一个`[[Prototype]]`内置属性, 这个属性是个对象, 里面有`name, age`属性和`getName`函数, 定睛一看, 这玩意儿可不就是上面写的`Person.prototype`对象嘛, 事实上, `Person.prototype`和`hjy`的`[[Prototype]]`都指向同一个对象, 这个对象对于`Person`构造函数而言叫做原型对象, 对于`hjy`实例而言叫做原型, 下面一张图直观地展示上述代码中构造函数, 实例, 原型之间的关系:

![02](./02.png)

因此, 构造函数, 原型和实例的关系是这样的: 每个构造函数都有一个原型对象(实例的原型), 原型有一个 `constructor` 属性指回构造函数, 而实例有一个内部指针指向原型, 在 `chrome, firefox, safari` 浏览器环境中这个指针就是 `__proto__`, 其他环境下没有访问 `[[Prototype]]` 的标准方式

## 原型链

在上述原型的基础上, 如果 `hjy` 的原型是另一个类型的实例呢? 于是 `hjy` 的原型本身又有一个内部指针指向另一个原型, 相应的另一个原型也有一个指针指向另一个构造函数, 这样, 实例和原型之间形成了一条长长的链条, 这就是原型链

> 所有普通的 `[[Prototype]]` 都会指向内置的 `Object.prototype`, 而`Object` 的 `[[Prototype]]` 指向 `null`, 也就是说所有的普通对象都源于 `Object.prototype`, 它包含 `javascript` 中许多通用的功能

在原型链中, 如果在对象上找不到需要的属性或者方法, 引擎就会继续在 `[[Prototype]]` 指向的原型上查找, 同理, 如果在后者也没有找到需要的东西, 引擎就会继续查找它的 `[[Prototype]]` 指向的原型, 上图理解一下

![03](./03.png)

## 理解继承

> 继承是面向对象编程的三大特征之一(封装, 继承, 多态), 多个类中存在相同的属性和行为时, 将这些内容抽取到单独一个类中, 那么多个类无需再定义这些属性和行为, 只需要继承那个类即可, 多个类可以称为子类, 单独这个类称为父类或者超类, 基类等, 子类可以直接访问父类中的非私有的属性和行为

以咱们人类为例, 咱全地球人都是一个脑袋, 双手双脚, 很多基本特征都是一样的, 但人类也可以细分种类, 有黄种人, 白种人, 黑种人, 咱们如果要定义这三种人, 无需再说一个脑袋, 双手双脚之类的共同特征, 黄种人就是在人类的基础上将皮肤变为黄色, 白种人皮肤为白色, 黑种人为黑色, 如果有其他特征就再新增即可, 例如蓝眼睛, 黄头发等等

![04](./04.png)

如果用代码封装, 咱们就可以将人类定义为基类或者超类, 拥有脑袋, 手, 足等属性, 说话, 走路等行为, 黄种人, 白种人, 黑种人为子类, 自动复制父类的属性和行为到自身, 然后在此基础上新增或者重写某些属性和行为, 例如黄种人拥有黄皮肤, 黑头发, 这就是继承的思想

## JS 中的继承(原型继承)

在其他面向类语言中, 继承意味着复制操作, 子类是实实在在地将父类的属性和方法复制了过来, 但`javascript`中的继承不是这样的, 根据原型的特性, `js`中继承的本质是一种委托机制, 对象可以将需要的属性和方法委托给原型, 需要用的时候就去原型上拿, 这样多个对象就可以共享一个原型上的属性和方法, 这个过程中是没有复制操作的

`javascript`中的继承主要还是依靠于原型链, 原型处于原型链中时即可以是某个对象的原型也可以是另一个原型的实例, 这样就能形成原型之间的继承关系

然而, 依托原型链的继承方式是有很多弊病的, 我们需要辅以各种操作来消除这些缺点, 在这个探索的过程中, 出现了很多通过改造原型链继承而实现的继承方式

## 判断构造函数与实例关系

原型与实例的关系可以用两种方式来确定: `instanceof` 操作符和 `isPrototypeOf()` 方法

### instanceof

`instanceof` 操作符左侧是一个普通对象, 右侧是一个函数

以 `o instanceof Foo` 为例, `instanceof` 关键字做的事情是: 判断 `o` 的原型链上是否有 `Foo.prototype` 指向的对象

```javascript
function Perosn(name) {
  this.name = name
}

const hjy = new Perosn('滑稽鸭')

const laowang = {
  name: '老王'
}

console.log(hjy instanceof Perosn) // true
console.log(laowang instanceof Perosn) // false
```

根据 `instanceof` 的特性, 我们可以实现一个自己 `instanceof`, 思路就是递归获取左侧对象的原型, 判断其是否和右侧的原型对象相等, 这里使用 `Object.getPrototypeOf()` 获取原型

```javascript
const myInstanceof = (left, right) => {
  // 边界判断
  if (typeof left !== 'object' && typeof left !== 'function' || left === null) return false
  let proto = Object.getPrototypeOf(left)   // 获取左侧对象的原型
  while (proto !== right.prototype) {  // 找到了就终止循环
    if (proto === null) return false     // 找不到返回 false
    proto = Object.getPrototypeOf(proto)   // 沿着原型链继续获取原型
  }
  return true
}
```

### isPrototypeOf()

`isPrototypeOf() `不关心构造函数, 它只需要一个可以用来判断的对象就行, 以 `Foo.prototype.isPrototypeOf(o)` 为例, `isPrototypeOf()` 做的事情是: 判断在 `o` 的原型链中是否出现过 `Foo.prototype`

```javascript
function Perosn(name) {
  this.name = name
}

const hjy = new Perosn('滑稽鸭')

const laowang = {
  name: '老王'
}

console.log(Perosn.prototype.isPrototypeOf(hjy))
console.log(Perosn.prototype.isPrototypeOf(laowang))
```

## new 关键字

在实现各种继承方式的过程中, 经常会用到 `new` 关键字, 那么 `new` 关键字起到的作用是什么呢?

简单来说, `new` 关键字就是绑定了实例与原型的关系, 并且在实例的的上下文中调用构造函数, 下面就是一个最简版的 `new` 的实现

```javascript
const myNew = function (Fn, ...args) {
  const o = {}
  o.__proto__ = Fn.prototype
  Fn.apply(o, args)
  return o
}

function Person(name, age) {
  this.name = name
  this.age = age
  this.getName = function () {
    return this.name
  }
}

const hjy = myNew(Person, '滑稽鸭', 22)
console.log(hjy.name)
console.log(hjy.age)
console.log(hjy.getName())
```

实际上, 真正的 `new` 关键字会做如下几件事情:

1. 创建一个新的 `javaScript` 对象(即 {} )
2. 为步骤 1 新创建的对象添加属性 `__proto__` , 将该属性链接至构造函数的原型对象
3. 将 `this` 指向这个新对象
4. 执行构造函数内部的代码(例如给新对象添加属性)
5. 如果构造函数返回非空对象, 则返回该对象, 否则返回刚创建的新对象

代码如下:

```javascript
const myNew = function (Fn, ...args) {
  const o = {}
  o.__proto__ = Fn.prototype
  const res = Fn.apply(o, args)
  if (res && typeof res === 'object' || typeof res === 'function') {
    return res
  }
  return o
}
```

有些小伙伴可能会疑惑最后这个判断是为了什么? 因为语言的标准肯定是严格的, 需要考虑各种情况下的处理, 比如 `const res = Fn.apply(o, args)` 这一步, 如果构造函数有返回值, 并且这个返回值是对象或者函数, 那么 `new` 的结果就应该取这个返回值, 所以才有了这一层判断