---
sidebar_position: 2
---

# 用法

你可以从 CDN 简单地加载 pettie-vue

```html
<script src="https://unpkg.com/petite-vue" defer init></script>

<!-- anywhere on the page -->
<div v-scope="{ count: 0 }">
  {{ count }}
  <button @click="count++">inc</button>
</div>
```

下面的示例传达了几个重要的讯息:

- 使用了 `v-scope` 来标记页面上可由 petite-vue 控制的区域
- `defer` 属性使脚本在解析完 HTML 内容之后才执行
- `init` 属性告诉 petite-vue, 你可以在页面上自动查询和初始化所有具有 v-scope 属性的元素

如果不想使用自动初始化, 那么烦请你删除 `init` 属性并将脚本移动到 `<body>` 的末尾

```html
<script src="https://unpkg.com/petite-vue"></script>
<script>
  PetiteVue.createApp().mount();
</script>
```

或者, 你可以使用 ES 模块，这个是推荐的方式

```html
<script type="module">
  import { createApp } from "https://unpkg.com/petite-vue?module";
  createApp().mount();
</script>
```

带有 `iife` 后缀的 CDN 它暴露了全局对象, 带有 `es` 后缀的 CDN 适用于 ES 模块系统

createApp 函数接受一个对象, 这可以用来制作简单的一次性应用程序

```html
<script type="module">
  import { createApp } from "https://unpkg.com/petite-vue?module";

  createApp({
    // exposed to all expressions
    count: 0,
    // getters
    get plusOne() {
      return this.count + 1;
    },
    // methods
    increment() {
      this.count++;
    },
  }).mount();
</script>

<!-- v-scope value can be omitted -->
<div v-scope>
  <p>{{ count }}</p>
  <p>{{ plusOne }}</p>
  <button @click="increment">increment</button>
</div>
```

> v-scope 在这里不需要有值, 它在这里只是作为 petite-vue 处理元素的提示

你可以指定一个挂载目标(可以是一个选择器或元素)来将 petite-vue 限制在页面的某个区域

```javascript
createApp().mount("#only-this-div");
```

这也意味着你可以在同一个页面上拥有多个 petite-vue 应用程序来控制不同的页面区域

```javascript
createApp({
  // root scope for app one
}).mount("#app1");

createApp({
  // root scope for app two
}).mount("#app2");
```

你还可以监听每个元素的 `mounted` 和 `unmounted` 生命周期

```html
<div
  v-if="show"
  @mounted="console.log('mounted on: ', $el)"
  @unmounted="console.log('unmounted: ', $el)"
></div>
```

可以使用 `v-effect` 来执行响应式内联语句

```html
<div v-scope="{ count: 0 }">
  <div v-effect="$el.textContent = count"></div>
  <button @click="count++">++</button>
</div>
```

该效果使用了一个响应式数据源 count, 因此当 count 发生变化时, 它将重新运行

> 注意: `$el` 指向的是指令绑定到的当前元素(而不是根元素)

"组件"的概念在 petite-vue 有点不同, 它非常简洁

 首先, 用函数创建可重用的逻辑

```html
<script type="module">
  import { createApp } from "https://unpkg.com/petite-vue?module";

  function Counter(props) {
    return {
      count: props.initialCount,
      inc() {
        this.count++;
      },
      mounted() {
        console.log(`I'm mounted!`);
      },
    };
  }

  createApp({
    Counter,
  }).mount();
</script>

<div v-scope="Counter({ initialCount: 1 })" @mounted="mounted">
  <p>{{ count }}</p>
  <button @click="inc">increment</button>
</div>

<div v-scope="Counter({ initialCount: 2 })">
  <p>{{ count }}</p>
  <button @click="inc">increment</button>
</div>
```

如果你还想重用模板, 你可以在返回的对象上提供一个特殊的 `$template` 键, 值可以是模板字符串, 也可以是 `<template>` 元素的 ID 选择器

```html
<script type="module">
  import { createApp } from 'https://unpkg.com/petite-vue?module'

  function Counter(props) {
    return {
      $template: '#counter-template',
      count: props.initialCount,
      inc() {
        this.count++
      }
    }
  }

  createApp({
    Counter
  }).mount()
</script>

<template id="counter-template">
  My count is {{ count }}
  <button @click="inc">++</button>
</template>

<!-- reuse it -->
<div v-scope="Counter({ initialCount: 1 })"></div>
<div v-scope="Counter({ initialCount: 2 })"></div>
```

建议使用 `<template>` 而不是内联字符串

可以使用 reactive 方法(从 @vue/reactivity 导出)来创建全局状态的一个实例

```html
<script type="module">
  import { createApp, reactive } from 'https://unpkg.com/petite-vue?module'

  const store = reactive({
    count: 0,
    inc() {
      this.count++
    }
  })

  // manipulate it here
  store.inc()

  createApp({
    // share it with app scopes
    store
  }).mount()
</script>

<div v-scope="{ localCount: 0 }">
  <p>Global {{ store.count }}</p>
  <button @click="store.inc">increment</button>

  <p>Local {{ localCount }}</p>
  <button @click="localCount++">increment</button>
</div>
```

pettie-vue 也支持自定义指令, 但它的接口与 Vue 有点不同

```javascript
const myDirective = (ctx) => {
  // the element the directive is on
  ctx.el
  // the raw value expression
  // e.g. v-my-dir="x" then this would be "x"
  ctx.exp
  // v-my-dir:foo -> "foo"
  ctx.arg
  // v-my-dir.mod -> { mod: true }
  ctx.modifiers
  // evaluate the expression and get its value
  ctx.get()
  // evaluate arbitrary expression in current scope
  ctx.get(`${ctx.exp} + 10`)

  // run reactive effect
  ctx.effect(() => {
    // this will re-run every time the get() value changes
    console.log(ctx.get())
  })

  return () => {
    // cleanup if the element is unmounted
  }
}

// register the directive
createApp().directive('my-dir', myDirective).mount()
```

下面就是 `v-html` 的实现方式

```javascript
const html = ({ el, get, effect }) => {
  effect(() => {
    el.innerHTML = get()
  })
}
```

你可以通过将 `$delimiters` 传递到根作用域来使用你自己的自定义分隔符

```javascript
createApp({
  $delimiters: ['${', '}']
}).mount()
```

