---
sidebar_position: 1
---

# 如何学习 Web 渗透技术

我们先来看下 Web 所涉及的内容

一般来说，我们常说的 Web 是指网站，其本义是万维网

这个实际涵盖的内容就很多了，涉及浏览器、服务器运行环境等常出现内存破坏漏洞的应用和系统

但是在安全行业内，我们通常所说的 Web 安全，是指 Web 应用安全，即网站安全，也包含仅提供后端 CGI 服务的应用（供移动 App 调用的，无直接的前端网页），可以简单地分为前端和后端，如下图所示：

![01](./img/04.png)

平常行业内所说的二进制安全，通常是指内存破坏漏洞、逆向工程、病毒对抗等涉及二进制数据分析的技术领域

虽然浏览器、Linux 系统等也是 Web 领域中的一个环节，但本文档不涉及二进制安全内容，仍以狭义上的网站安全为主要内容

在学习 Web 安全的过程中，有 3 个阶段

- 前端知识学习

  前端开发主要就是 HTML、CSS、JavaScript 这 3 门语言的学习

  在学习前，建议你先了解下 HTTP 相关的知识，掌握它的工作原理、请求方法、响应头、状态码、内容类型等等

  行业内有一本很厚的《HTTP 权威指南》，共 694 页，如果从这本书入手其实是很打击人的，不太推荐，建议你上“菜鸟教程”学习 HTTP 课程（所有本课程中提及的书或教程，在文末都会整理一份清单给到你）

  学完之后，直接用 Chrome 浏览器的检查器（快捷键 F12 或 Ctrl+Shift+I）里的“Network”标签查看 HTTP 请求与响应包数据，如下图所示：

  ![10](./img/10.png)

  它可以帮助你快速理解 HTTP 的交互原理，并使你有一个直观的认识

  个人觉得这是快速学习 HTTP 的方法，花 30~60 分钟就足够了

  接下来就是学习 HTML+CSS

  学习前端的最好资料就是“W3school”网站

  关于 HTML 与 CSS 的教程链接也在文末附上了

  最后就是学习 JavaScript

  这是前端开发最精髓的部分，在”菜鸟教程“上也有免费的教程，你可以边学习边实践

  之后，你可以再学习下当前最流行的前端开发框架 Vue.js（有精力也可以学习下 React、Angular 等开发框架），它是一套构建用户界面的渐进式框架，其自带的和第三方的丰富组件可以帮你快速开发出漂亮的网页，不用从头开始写代码

  关于 Vue.js 的学习资料，推荐“Vue.js 中文文档”

  “菜鸟教程”上也有，个人比较喜欢上面的“尝试一下”功能，两套教程均在文末附上链接，记得查看

  “菜鸟教程”更适合入门学习，如果你想进一步地学习，尤其是 JavaScript，最好是找两本书进修下

  这里推荐《JavaScript DOM 编程艺术》和《JavaScript 高级程序设计》，记得先看第一本，再看第二本

- 后端知识学习

  学完前端，就要来学习后端的知识了

  随着 Node.js 的崛起，很多后端也开始用前端语言 JavaScript 来开发后端功能

  Node.js 基于 Chrome V8 提供的 JavaScript 运行环境，非常适合前端工程师作为进军后端开发的阶梯

  关于 Node.js 教程的链接在文末的“其他资料”一节中已附上

  更为传统的后端开发经常是搭配 PHP+MySQL 数据库

  以下是 2020 年 W3Tech 对当前 Web 开发技术的调查情况，其结果表明全球 78.8% 的网站使用 PHP 作为服务器后端开发语言

  ![01](./img/01.png)

  鉴于上图，本课程涉及的主要语言是 PHP，很多漏洞示例也是以 PHP 为例，掌握 PHP 基础也是学习本课程的预备知识要求

  我在这里推荐《PHP 和 MySQL Web 开发》一书，里面讲解了 PHP 的方方面面，而且在第 2 篇中还专门讲解了 MySQL，以及如何用 PHP 与 MySQL 交互

  现在 Go 以高性能的优势发展得相当快，已经有不少后台开发采用 Go，这也是未来后台开发技术的一大发展趋势

  本课程主要以引导入门为主，为了避免课程内容变得太过复杂，关于 Go 的教程就暂不推荐了

  学完这一阶段，咱们就可以进入最后一个学习的阶段，也就是本课程的主题：Web 漏洞攻防技术

- 漏洞攻防学习

  Web 漏洞包含哪一些主流的漏洞类型，最佳的参考就是 OWASP Top 10，不过它在 2017 年之后就停止更新维护了

  以下是当前的官方统计结果，按顺序排名

  1. 注入：SQL、NoSQL 数据库注入，还有命令注入和 LDAP 注入等
  2. 失效的身份认证和会话管理：比如攻击者破解密码、窃取密钥、会话令牌或其他漏洞去冒充他人的身份
  3. 跨站脚本（XSS）：XSS 允许攻击者在受害者的浏览器上执行恶意脚本，从而劫持用户会话、钓鱼欺骗等等
  4. 失效的访问控制：比如越权访问其他用户的个人资料、查看敏感文件、篡改数据等
  5. 安全配置错误：比如服务器的不安全配置，导致敏感信息泄露
  6. 敏感信息泄露：比如账号密码未加密存储、敏感数据传输时未加密保护，最终造成数据泄露
  7. 攻击检测与防护不足：比如 WAF、主机入侵检测等防御系统部署不全，这块偏向漏洞防御本身
  8. 跨站请求伪造（CSRF）：攻击者诱使其他登录用户访问恶意站点，以冒用对方的身份执行一些敏感操作
  9. 使用含有已知漏洞的组件：比如一些第三方的开源库、框架等，尤其是已公开漏洞的旧版本，比如名燥一声的 Struts2 漏洞，因频繁出现漏洞被许多开发者弃用
  10. 未受有效保护的 API：比如浏览器和移动 App 中的 JavaScript API，常常因其提供的特殊功能未受有效保护而被滥用，造成不同等级的危害程度

  OWASP Top 10 也不完全属于具体的 Web 漏洞类型，比如第 7、9 点，但其他涉及的主流漏洞类型，我在本文档中大多会讲到，比如 SQL 注入、XSS、CSRF

  只有真正掌握了这些 Web 漏洞相关的安全技术，才能算是入门了 Web 安全领域，为你将来求职、刷榜漏洞奖励计划奠定基础

  关于这阶段的学习，除了本课程的内容外，还可以系统地学习下这两本书：《黑客攻防技术宝典：Web 实战篇》和《白帽子讲 Web 安全》

  这是个人认为在深度和广度上都有所兼顾的书籍，非常适合 Web 安全的入门

  另外也有一本叫《Web 安全测试》的书籍，这本更偏向实战，里面介绍了不少渗透测试的技巧和工具，在你理解了常见 Web 漏洞类型后，可以将其作为实战参考手册

## 面向漏洞学习

在国外有词叫 Variant Analysis，直译过来叫“变异分析”，意思是通过历史漏洞学习和研究，从而挖掘出类似产品中更多相似的漏洞

尤其是同一款产品下，如果开发写出了一个漏洞，那么在其他地方出现同一类漏洞的概率就比较大

乌云网已经成为历史，但其遗留下的漏洞案例是一笔不错的财富

网上也有人搭建了乌云镜像提供相关的漏洞、知识库的检索，你可以点击链接查看

HackerOne 通常在漏洞修复后的 3 个月会公开漏洞细节，栏目名叫“Hacktivity”，它提供 RSS 订阅，可以非常方便地关注

![02](./img/02.png)

说到漏洞库就不得不提 Exploit-db，其中有着丰富的漏洞细节和利用代码

2014 年那时还是一个叫 milw00rm 的漏洞库为主流，milw00rm 不再维护后，所有漏洞信息都被并入了 Exploit-db

至今，Exploit-db 还在正常运营，其背后的团队正是打造了著名黑客系统 Kali 的 Offensive-Security 安全公司，是一家专门从事安全培训和渗透测试服务的提供商

![03](./img/03.png)

这种通过漏洞学习漏洞的方式，除了加深对漏洞的理解，还可以提高漏洞挖掘的产出，是一种十分有效地学习方式

## 关注安全动态

技术发展非常迅速，一不留眼你就落后了，所以要避免闭门造车，比如诺基亚的塞班、微软的 Windows Mobile，现在都退出了历史舞台，如果你之前不关注这些，还在埋头研究它们的安全性，那就有点浪费时间了

你可以关注一些技术资讯网站、公众号、Twitter、Github、博客、RSS 订阅集合，国内外安全大会（工业界顶会：BlackHat、Defcon、CanSecWest、OffensiveCon，学术界顶会：CCS、NDSS、Oakland S&P、USENIX Security），以及 CTF 比赛等

这些都可以帮你了解安全动态的途径

在文末的“网站推荐”中，我已经整理一份清单，建议你采用 RSS 订阅的方式关注，手机上装个 RSS 订阅客户端，比如 Inoreader、Feedly、深蓝阅读，一有更新就可以立马感知到，非常方便

## 学习资料清单

- 书籍清单

  《JavaScript DOM 编程艺术》：https://item.jd.com/10603153.html

  《JavaScript 高级程序设计》：https://item.jd.com/12958580.html

  《PHP 和 MySQL Web 开发》：https://item.jd.com/10059047.html

  《黑客攻防技术宝典：Web 实战篇》：https://item.jd.com/11020022.html

  《白帽子讲 Web 安全》：https://item.jd.com/11483966.html

  《Web 安全测试》：https://item.jd.com/10021008335997.html

  《Web 前端黑客技术揭秘》：https://item.jd.com/11181832.html

  《SQL 注入攻击与防御》：https://item.jd.com/12369984.html

  网络安全从业者书单推荐：https://github.com/riusksk/secbook

- 网站推荐

  FreeBuf：https://www.freebuf.com

  安全客：https://www.anquanke.com

  Seebug Paper：https://paper.seebug.org

  安全 RSS 订阅：http://riusksk.me/media/riusksk_RSS_20190330.xml

  CTFTime Writeups：https://ctftime.org/writeups

  安全脉搏：https://www.secpulse.com

  SecWiki：https://www.sec-wiki.com

  玄武每日安全：https://sec.today/pulses

  学术论文检索：https://arxiv.org/search/cs

  Exploit-db：https://www.exploit-db.com

  Github：https://github.com

  信息安全知识库：https://vipread.com

  先知社区：https://xz.aliyun.com

- 其它资料

  HTTP 教程：https://www.runoob.com/http/http-tutorial.html

  HTML 教程：https://www.quanzhanketang.com/default.html

  CSS 教程：https://www.runoob.com/css/css-tutorial.html

  JavaScript 教程：https://www.runoob.com/js/js-tutorial.html

  Vue.js 教程：https://www.runoob.com/vue2/vue-tutorial.html

  Vue.js 中文文档：https://vuejs.bootcss.com/guide

  Node.js 教程：https://www.runoob.com/nodejs/nodejs-tutorial.html

  HackerOne Hacktivity：https://hackerone.com/hacktivity

  乌云公开漏洞、知识库搜索：https://wooyun.x10sec.org

  1000 个 PHP 代码审计案例：https://github.com/Xyntax/1000php

  知道创宇研发技能表：https://blog.knownsec.com/Knownsec_RD_Checklist/index.html

## 总结

这一篇主要学习的是 Web 安全的初衷：未知攻，焉知防。如果不能掌握黑客常用的攻击手法，又如何做好防御呢？

在 Web 安全的学习路线上，你可以按照前端、后端、漏洞的顺序进行
