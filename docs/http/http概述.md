---
sidebar_position: 1
---

# HTTP 概述

HTTP 是一种能够获取如 HTML 这样的网络资源的 [protocol](https://developer.mozilla.org/zh-CN/docs/Glossary/Protocol)(通讯协议)

它是在 Web 上进行数据交换的基础，是一种 client-server 协议，也就是说，请求通常是由像浏览器这样的接受方发起的

一个完整的 Web 文档通常是由不同的子文档拼接而成的，像是文本、布局描述、图片、视频、脚本等等

![./img/01.png](./img/01.png)

客户端和服务端通过交换各自的消息（与数据流正好相反）进行交互

由像浏览器这样的客户端发出的消息叫做 *requests*，被服务端响应的消息叫做 *responses*

![02](./img/02.png)

HTTP 被设计于 20 世纪 90 年代初期，是一种可扩展的协议

它是应用层的协议，通过[TCP](https://developer.mozilla.org/zh-CN/docs/Glossary/TCP)，或者是[TLS](https://developer.mozilla.org/zh-CN/docs/Glossary/TLS)－加密的 TCP 连接来发送，理论上任何可靠的传输协议都可以使用

因为其良好的扩展性，时至今日，它不仅被用来传输超文本文档，还用来传输图片、视频或者向服务器发送如 HTML 表单这样的信息

HTTP 还可以根据网页需求，仅获取部分 Web 文档内容更新网页

## 基于 HTTP 的组件系统

HTTP 是一个 client-server 协议：请求通过一个实体被发出，实体也就是用户代理

大多数情况下，这个用户代理都是指浏览器，当然它也可能是任何东西，比如一个爬取网页生成维护搜索引擎索引的机器爬虫

每一个发送到服务器的请求，都会被服务器处理并返回一个消息，也就是*response*

在这个请求与响应之间，还有许许多多的被称为 [proxies](https://developer.mozilla.org/zh-CN/docs/Glossary/Proxy_server) 的实体，他们的作用与表现各不相同，比如有些是网关，还有些是[caches](https://developer.mozilla.org/zh-CN/docs/Glossary/Cache)等

![03](./img/03.png)

实际上，在一个浏览器和处理请求的服务器之间，还有路由器、调制解调器等许多计算机

由于 Web 的层次设计，那些在网络层和传输层的细节都被隐藏起来了

HTTP 位于最上层的应用层

虽然底层对于分析网络问题非常重要，但是大多都跟对 HTTP 的描述不相干

