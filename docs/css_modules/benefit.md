---
sidebar_position: 2
---

# css模块化有什么好处？

当做一个大项目，几个人团队合作开发，结果看不懂彼此的代码，怎么办，当面对前人已经写好代码，需要修改，可是无处下手，怎么办.当代码耦合，修改费时费力，怎么办，当需要迭代，面对庞大的代码，牵一发动全身的悲催时刻，怎么办，这个时候，模块化思想就是救星了。

css写法特别的灵活，也因为灵活，所以容易耦合在一起，这时候就需要进行模块化的分离。那么css模块化的好处多多，列举了一些如下：

- 提高代码重用率

- 提高开发效率、减少沟通成本
- 提高页面容错
- 降低耦合
- 降低发布风险
- 减少Bug定位时间和Fix成本
- 更好的实现快速迭代
- 便于代码维护

CSS 模块化的解决方案有很多，但主要有两类。一类是彻底抛弃 CSS，使用 JS 或 JSON 来写样式。[Radium](https://github.com/FormidableLabs/radium)，[jsxstyle](https://github.com/petehunt/jsxstyle)，[react-style](https://github.com/js-next/react-style) 属于这一类。优点是能给 CSS 提供 JS 同样强大的模块化能力；缺点是不能利用成熟的 CSS 预处理器（或后处理器） Sass/Less/PostCSS，`:hover` 和 `:active` 伪类处理起来复杂

另一类是依旧使用 CSS，但使用 JS 来管理样式依赖，代表是 [CSS Modules](https://github.com/css-modules/css-modules)。CSS Modules 能最大化地结合现有 CSS 生态和 JS 模块化能力，API 简洁到几乎零学习成本。发布时依旧编译出单独的 JS 和 CSS。它并不依赖于 React，只要你使用 Webpack，可以在 Vue/Angular/jQuery 中使用。是我认为目前最好的 CSS 模块化解决方案

近期在项目中大量使用，下面具体分享下实践中的细节和想法

