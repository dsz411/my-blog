---
sidebar_position: 9
---

# HTTP 1.x 中的连接管理

连接管理是一个 HTTP 的关键话题：打开和保持连接在很大程度上影响着网站和 Web 应用程序的性能

在 HTTP/1.x 里有多种模型：*短连接*, *长连接*, 和 *HTTP 流水线*

HTTP 的传输协议主要依赖于 TCP 来提供从客户端到服务器端之间的连接

在早期，HTTP 使用一个简单的模型来处理这样的连接

这些连接的生命周期是短暂的：每发起一个请求时都会创建一个新的连接，并在收到应答时立即关闭

这个简单的模型对性能有先天的限制：打开每一个 TCP 连接都是相当耗费资源的操作

客户端和服务器端之间需要交换好些个消息

当请求发起时，网络延迟和带宽都会对性能造成影响

现代浏览器往往要发起很多次请求 (十几个或者更多) 才能拿到所需的完整信息，证明了这个早期模型的效率低下

有两个新的模型在 HTTP/1.1 诞生了

首先是长连接模型，它会保持连接去完成多次连续的请求，减少了不断重新打开连接的时间

然后是 HTTP 流水线模型，它还要更先进一些，多个连续的请求甚至都不用等待立即返回就可以被发送，这样就减少了耗费在网络延迟上的时间

![11](./img/11.png)

> HTTP/2 新增了其它连接管理模型

要注意的一个重点是 HTTP 的连接管理适用于两个连续节点之间的连接，如 [hop-by-hop](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers#hbh)，而不是 [end-to-end](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers#e2e)

当模型用于从客户端到第一个代理服务器的连接和从代理服务器到目标服务器之间的连接时 (或者任意中间代理) 效果可能是不一样的

HTTP 协议头受不同连接模型的影响，比如 [`Connection`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Connection) 和 [`Keep-Alive`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Keep-Alive)，就是 [hop-by-hop](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers#hbh) 协议头，它们的值是可以被中间节点修改的

一个相关的话题是 HTTP 连接升级，在这里，一个 HTTP/1.1 连接升级为一个不同的协议，比如 TLS/1.0，Websocket，甚至明文形式的 HTTP/2

更多细节参阅[协议升级机制](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Protocol_upgrade_mechanism)

## 短连接

