---
sidebar_position: 13
---

# HTTP状态响应代码

HTTP 响应状态码用来表明特定 HTTP 请求是否成功完成

响应被归为以下五大类：

1. 信息响应 (`100`–`199`)
2. 成功响应 (`200`–`299`)
3. 重定向消息 (`300`–`399`)
4. 客户端错误响应 (`400`–`499`)
5. 服务端错误响应 (`500`–`599`)

以下状态码由 [section 10 of RFC 2616](https://datatracker.ietf.org/doc/html/rfc2616#section-10)定义

你可以在[RFC 7231](https://datatracker.ietf.org/doc/html/rfc7231#section-6)中找到更新后的规范

> 如果您收到的响应不在 [此列表](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status#信息响应) 中，则它为非标准响应，可能是服务器软件的自定义响应

## 信息响应

- `100 Continue`

  这个临时响应表明，迄今为止的所有内容都是可行的，客户端应该继续请求，如果已经完成，则忽略它。

- `101 Switching Protocols`

  该代码是响应客户端的 [Upgrade](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Upgrade) 请求头发送的， 指明服务器即将切换的协议

- `102 Processing` ([WebDAV](https://developer.mozilla.org/zh-CN/docs/Glossary/WebDAV))

  此代码表示服务器已收到并正在处理该请求，但当前没有响应可用。

- `103 Early Hints`

  此状态代码主要用于与 [`Link`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Link) 链接头一起使用，以允许用户代理在服务器准备响应阶段时开始预加载 [preloading](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Link_types/preload) 资源
