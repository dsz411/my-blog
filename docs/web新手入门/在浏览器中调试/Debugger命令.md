---
sidebar_position: 4
---

# Debugger 命令

我们也可以使用 `debugger` 命令来暂停代码，像这样：

```javascript
function hello(name) {
  let phrase = `Hello, ${name}!`;

  debugger;  // <-- 调试器会在这停止

  say(phrase);
}
```

当我们在一个代码编辑器中并且不想切换到浏览器在开发者工具中查找脚本来设置断点时，这真的是非常方便