---
sidebar_position: 3
---

# CSS 模块化遇到了哪些问题？

CSS 模块化重要的是要解决好两个问题：CSS 样式的导入和导出

灵活按需导入以便复用代码；导出时要能够隐藏内部作用域，以免造成全局污染

Sass/Less/PostCSS 等前仆后继试图解决 CSS 编程能力弱的问题，结果它们做的也确实优秀，但这并没有解决模块化最重要的问题

Facebook 工程师 [Vjeux](https://github.com/vjeux) 首先抛出了 React 开发中遇到的一系列 CSS 相关问题

加上我个人的看法，总结如下：

1. 全局污染

   CSS 使用全局选择器机制来设置样式，优点是方便重写样式

   缺点是所有的样式都是全局生效，样式可能被错误覆盖，因此产生了非常丑陋的 `!important`，甚至 inline `!important` 和复杂的[选择器权重计数表](https://www.w3.org/TR/selectors/#specificity)，提高犯错概率和使用成本

   Web Components 标准中的 Shadow DOM 能彻底解决这个问题，但它的做法有点极端，样式彻底局部化，造成外部无法重写样式，损失了灵活性

2. 命名混乱

   由于全局污染的问题，多人协同开发时为了避免样式冲突，选择器越来越复杂，容易形成不同的命名风格，很难统一

   样式变多后，命名将更加混乱

3. 依赖管理不彻底

   组件应该相互独立，引入一个组件时，应该只引入它所需要的 CSS 样式

   但现在的做法是除了要引入 JS，还要再引入它的 CSS，而且 Saas/Less 很难实现对每个组件都编译出单独的 CSS，引入所有模块的 CSS 又造成浪费

   JS 的模块化已经非常成熟，如果能让 JS 来管理 CSS 依赖是很好的解决办法

   Webpack 的 `css-loader` 提供了这种能力

4. 无法共享变量

   复杂组件要使用 JS 和 CSS 来共同处理样式，就会造成有些变量在 JS 和 CSS 中冗余，Sass/PostCSS/CSS 等都不提供跨 JS 和 CSS 共享变量这种能力

5. 代码压缩不彻底

   由于移动端网络的不确定性，现在对 CSS 压缩已经到了变态的程度
   
   很多压缩工具为了节省一个字节会把 '16px' 转成 '1pc'
   
   但对非常长的 class 名却无能为力，力没有用到刀刃上

上面的问题如果只凭 CSS 自身是无法解决的，如果是通过 JS 来管理 CSS 就很好解决，因此 Vjuex 给出的解决方案是完全的 [CSS in JS](http://blog.vjeux.com/2014/javascript/react-css-in-js-nationjs.html)，但这相当于完全抛弃 CSS，在 JS 中以 Object 语法来写 CSS，估计刚看到的小伙伴都受惊了

直到出现了 CSS Modules