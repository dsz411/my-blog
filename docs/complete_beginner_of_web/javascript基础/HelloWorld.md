---
sidebar_position: 3
---

# "Hello World!" 示例

读到这里你一定很激动，诚然 —— JavaScript 是最振奋人心的 Web 技术之一，而且在娴熟驾驭之后，你的网站在功能和创新力上将达到一个新的维度

然而，JavaScript 比 HTML 和 CSS 学习起来更加复杂一点，所以必须一步一个脚印地学习

首先，来看看如何在页面中添加一些基本的 JavaScript 脚本来建造一个 “Hello world!” 示例

1. 首先，打开你的测试站点，创建一个名为 `scripts` 的文件夹

   然后在其中创建一个名为 main.js 的文件。

2. 下一步，在 `index.html` 文件`</body>` 标签前的新行添加以下代码

   ```html
   <script src="scripts/main.js" defer></script>
   ```

   与 CSS 的 `<link>` 元素类似，它将 JavaScript 引入页面以作用于 HTML（以及 CSS 等页面上所有内容）

3. 现在将以下代码添加到 `main.js` 文件中：

   ```javascript
   let myHeading = document.querySelector('h1');
   myHeading.textContent = 'Hello world!';
   ```

4. 最后，保存 HTML 和 JavaScript 文件，用浏览器打开 `index.html`

   可以看到如下内容：

   ![51](	https://development-guides-1258936571.cos.ap-chengdu.myqcloud.com/web/guides/completebeginners/51.png)

> 我们将 `<script>` 放在HTML文件的底部附近的原因是浏览器会按照代码在文件中的顺序加载 HTML
>
> 如果先加载的 JavaScript 期望修改其下方的 HTML，那么它可能由于 HTML 尚未被加载而失效
>
> 因此，将 JavaScript 代码放在 HTML页面的底部附近通常是最好的策略

## 发生了什么?

JavaScript 把页面的标题改成了 “Hello world!” 

首先用 `querySelector()` 函数获取标题的引用，并把它储存在 `myHeading` 变量中

这与 CSS 选择器的用法非常相像：若要对某个元素进行操作，首先得选择它

之后，把 `myHeading` 变量的属性 `textContent` 修改为 “Hello world!” 。

> 上面用到的两个函数都来自 文档对象模型 (DOM) API， 均用于控制文档

