---
sidebar_position: 12
---

# HTTP 请求方法

HTTP 定义了一组**请求方法**，以表明要对给定资源执行的操作

指示针对给定资源要执行的期望动作

虽然他们也可以是名词，但这些请求方法有时被称为 HTTP 动词

每一个请求方法都实现了不同的语义，但一些共同的特征由一组共享：例如一个请求方法可以是 [safe](https://developer.mozilla.org/zh-CN/docs/Glossary/Safe), [idempotent](https://developer.mozilla.org/zh-CN/docs/Glossary/Idempotent), 或 [cacheable](https://developer.mozilla.org/en-US/docs/Glossary/cacheable)

- `GET`

  GET 方法请求一个指定资源的表示形式，使用 GET 的请求应该只被用于获取数据

- `HEAD`

  HEAD 方法请求一个与 GET 请求的响应相同的响应，但没有响应体

- `POST`

  POST 方法用于将实体提交到指定的资源，通常导致在服务器上的状态变化或副作用

- `PUT`

  PUT 方法用请求有效载荷替换目标资源的所有当前表示

- `DELETE`

  DELETE 方法删除指定的资源

- `CONNECT`

  CONNECT 方法建立一个到由目标资源标识的服务器的隧道

- `OPTIONS`

  OPTIONS 方法用于描述目标资源的通信选项

- `TRACE`

  TRACE 方法沿着到目标资源的路径执行一个消息环回测试

- `PATCH`

  PATCH 方法用于对资源应用部分修改
