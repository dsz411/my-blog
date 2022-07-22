---
sidebar_position: 3
---

# 特性

仅 petite-vue 的 API：

- v-scope
- v-effect
- @mounted 和 @unmounted 事件

与 Vue 相比, 具有的不同行为:

- 在表达式中, $el 指向指令绑定到的当前元素(而不是根元素)
- createApp() 接受一个全局数据对象而不是一个组件
- 组件被简化为了一个返回对象的函数
- 自定义指令有不同的接口

兼容 Vue 的:

- `{{}}` 文本绑定(可使用自定义分隔符配置)
- v-bind(包括 `:` 速记和类/样式的特殊处理)
- v-on(包括 `@` 速记和所有修饰符)
- v-model(所有 input 类型和非字符串的 `:value` 绑定)
- v-if / v-else / v-else-if
- v-for
- v-show
- v-html
- v-text
- v-pre
- v-once
- v-cloak
- reactive()
- nextTick()
- 模板引用(refs)

一些特性在 pettie-vue 中被删除了, 是因为它们在渐进增强的环境中具有相对较低的实用/大小比率, 如果你实在需要这些特性, 可能就必须使用标准的 Vue 了:

- ref(), computed() 等
- render 函数(petite-vue 没有虚拟 DOM )
- 集合类型的响应性(Map, Set 等, 因使用不多, 所以被删除)
- Transition, KeepAlive, Teleport, Suspense
- 深层次结构的 v-for
- v-on="object"
- v-is 和 `<component :is="xxx">`
- v-bind:style 的自动前缀补充