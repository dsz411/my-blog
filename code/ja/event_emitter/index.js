function isValidListener(listener) {
  if (typeof listener === "function") {
    return true;
  } else if (listener && typeof listener === "object") {
    return isValidListener(listener.listener);
  } else {
    return false;
  }
}
function indexOf(listeners, listener) {
  var result = -1;
  for (var i = 0, len = listeners.length; i < len; i++) {
    if (typeof listener === "object") {
      if (listeners[i] === listener) {
        result = 1;
        break;
      }
    } else if (typeof listener === "function") {
      if (listeners[i].listener === listener) {
        result = 1;
        break;
      }
    }
  }
  return result;
}
class EventEmitter {
  constructor() {
    this.__events = {};
  }
  on(eventName, listener) {
    if (!eventName || !listener) {
      return;
    }
    if (!isValidListener(listener)) {
      throw new Error("listener must be a function");
    }
    var listeners = (this.__events[eventName] = this.__events[eventName] || []);
    if (indexOf(listeners, listener) === -1) {
      // 不重复添加事件, 判断是否有一样的
      if (typeof listener === "function") {
        this.__events[eventName].push({
          listener,
          once: false,
        });
      } else {
        this.__events[eventName].push(listener);
      }
    }
    return this;
  }
  emit(eventName, args) {
    var listeners = this.__events[eventName];
    if (!listeners || listeners === []) {
      return;
    }
    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      if (listener) {
        listener.listener.apply(this, args || []);
        // 给 listener 中 once 为 true 的进行特殊处理
        if (listener.once) {
          this.off(eventName, listener.listener);
        }
      }
    }
  }
  off(eventName, listener) {
    var listeners = this.__events[eventName];
    if (!listeners) {
      return;
    }
    var index;
    for (var i = 0, len = listeners.length; i < len; i++) {
      if (listeners[i] && listeners[i].listener === listener) {
        index = i;
        break;
      }
    }
    // off 的关键
    if (typeof index !== "undefined") {
      const res = this.__events[eventName].splice(index, 1);
    }
    return this;
  }
  once(eventName, listener) {
    return this.on(eventName, {
      listener,
      once: true,
    });
  }
  allOff(eventName) {
    // 如果该 eventName 存在, 则将其对应的 listeners 的数组直接清空
    if (eventName && this.__events[eventName]) {
      this.__events[eventName] = [];
    } else {
      this.__events = {};
    }
  }
}
EventEmitter.VERSION = "1.0.0";

module.exports = EventEmitter;

/****************************************
 * TEST                                 *
 * **************************************/

var EventEmitter = require("../EventEmitter");

const myEventEmitter = new EventEmitter();

myEventEmitter.on("say", function (name) {
  console.log("Hello", name);
});
myEventEmitter.on("say", function (name) {
  console.log(name, "is 23 year old");
});
myEventEmitter.on("play", function (sport) {
  console.log("play", sport);
});
myEventEmitter.once("eat", function (food) {
  console.log("eat", food);
});

myEventEmitter.emit("say", ["Liming"]);
myEventEmitter.emit("play", ["football"]);
myEventEmitter.emit("eat", ["beef"]);

console.log("---------------");

myEventEmitter.emit("say", ["Liming"]);
myEventEmitter.emit("play", ["football"]);
myEventEmitter.emit("eat", ["beef"]);

console.log("---------------");

myEventEmitter.emit("eat", ["beef"]);

console.log("---------------");

myEventEmitter.allOff("say");

myEventEmitter.emit("say", ["Liming"]);
myEventEmitter.emit("play", ["football"]);
myEventEmitter.emit("eat", ["beef"]);
