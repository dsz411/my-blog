---
sidebar_position: 11
---

# HTTP Headers

HTTP 头允许客户端和服务器通过 HTTP 请求或响应传递附加信息, HTTP 报头由不区分大小写的名称后跟冒号( : ), 然后是它的值组成, 值前的[空格](https://developer.mozilla.org/en-US/docs/Glossary/Whitespace)将被忽略

自定义专有头历来都带有 **X-** 前缀, 但由于在 [RFC 6648](https://datatracker.ietf.org/doc/html/rfc6648) 中非标准字段成为标准字段时造成的不便, 该约定在 2012 年 6 月被弃用, 其他的则在 [IANA 注册表](https://www.iana.org/assignments/message-headers/perm-headers.html)中列出, 其原始内容在 [RFC 4229](https://datatracker.ietf.org/doc/html/rfc4229) 中定义, IANA 还维护一个[提议的新 HTTP 头的注册表](https://www.iana.org/assignments/message-headers/prov-headers.html)

头部可以根据它们的上下文分组

- [Request headers](https://developer.mozilla.org/en-US/docs/Glossary/Request_header) 包含关于要获取的资源或请求资源的客户端的更多信息
- [Response headers](https://developer.mozilla.org/en-US/docs/Glossary/Response_header) 包含关于响应的附加信息, 比如它的位置或提供它的服务器的信息
- [Representation headers](https://developer.mozilla.org/en-US/docs/Glossary/Representation_header) 包含关于资源 body 的信息, 比如它的 [MIME 类型](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types), 或应用的编码/压缩
- [Payload headers](https://developer.mozilla.org/en-US/docs/Glossary/Payload_header) 包含与表示无关的有关有效负载数据的信息, 包括用于传输的内容长度和编码

headers 也可以根据[代理](https://developer.mozilla.org/en-US/docs/Glossary/Proxy_server)如何处理它们进行分组

- [Connection](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Connection)
- [Keep-Alive](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Keep-Alive)
- [Proxy-Authenticate](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Proxy-Authenticate)
- [Proxy-Authorization](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Proxy-Authorization)
- [TE](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/TE)
- [Trailer](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Trailer)
- [Transfer-Encoding](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Transfer-Encoding)
- [Upgrade](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Upgrade) (参见[协议升级机制](https://developer.mozilla.org/en-US/docs/Web/HTTP/Protocol_upgrade_mechanism))

**端到端 headers**: 这些头必须传送给消息的最终接收者, 服务器接收请求, 客户端接收响应, 中间代理必须不加修改地重新传输这些头, 缓存必须存储它们

**Hop-by-hop (跳到跳) headers**: 这些报头仅对单个传输级连接有意义, 不能由代理或缓存重新传输, 注意, 只能使用 [Connection](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Connection) 头设置 hop-by-hop 头

## 身份验证

- [WWW-Authenticate](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/WWW-Authenticate): 定义应该用于访问资源的身份验证方法
- [Authorization](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization): 包含使用服务器对用户代理进行身份验证的凭据
- [Proxy-Authenticate](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Proxy-Authenticate): 定义应该用于访问代理服务器后面的资源的身份验证方法
- [Proxy-Authorization](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Proxy-Authorization): 包含使用代理服务器对用户代理进行身份验证的凭据

## 缓存

- [Age](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Age): 对象在代理缓存中的时间, 以秒为单位
- [Cache-Control](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control): 请求和响应中用于缓存机制的指示
- [Clear-Site-Data](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Clear-Site-Data): 清除与请求网站相关的浏览数据(例如 cookie, 存储, 缓存)
- [Expires](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Expires): 响应被认为过时的日期/时间
- [Pragma](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Pragma): 特定于实现的头, 可能在请求-响应链的任何位置产生各种影响, 用于向后兼容 HTTP/1.0 缓存, 其中 Cache-Control 头还没有出现
- [Warning](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Warning): 关于可能问题的一般警告信息

## 客户端提示

HTTP [客户端提示](https://developer.mozilla.org/en-US/docs/Glossary/Client_hints)是一组请求头, 提供有关客户端有用的信息, 如设备类型和网络条件, 并允许服务器优化为这些条件提供的服务

服务器使用 [Accept-CH](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-CH) 主动从客户端请求他们感兴趣的客户端提示头, 然后, 客户端可以选择在后续请求中包含请求的头

- [Accept-CH](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-CH): 服务器可以使用 Accept-CH 报头字段或具有 [http-equiv](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-http-equiv) 属性的等效 HTML `<meta>` 元素来声明对客户机提示的支持

下面列出了客户机提示的不同类别

### 设备客户端提示

https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers#device_client_hints

### 网络客户端提示

网络客户端提示允许服务器根据用户的选择, 网络带宽和延迟选择要发送的信息

- [Downlink](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Downlink): 客户端连接到服务器的近似带宽, 单位为 Mbps, 这是 [Network Information API](https://developer.mozilla.org/en-US/docs/Web/API/Network_Information_API) 的一部分
- [ECT](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/ECT): 最匹配连接的延迟和带宽的[有效连接类型](https://developer.mozilla.org/en-US/docs/Glossary/Effective_connection_type)("网络配置文件"), 这是 [Network Information API](https://developer.mozilla.org/en-US/docs/Web/API/Network_Information_API) 的一部分
- [RTT](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/RTT): 应用层往返时间( RTT ), 以毫秒为单位, 其中包括服务器处理时间, 这是 [Network Information API](https://developer.mozilla.org/en-US/docs/Web/API/Network_Information_API) 的一部分
- [Save-Data](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Save-Data): 一个布尔值, 指示用户代理对减少数据使用的偏好

## 条件

- Last-Modified: 资源的最后修改日期, 用于比较同一资源的多个版本, 它不如 ETag 精确, 但在某些环境中更容易计算, 使用 If-Modified-Since 和 If-Unmodified-Since 的条件请求使用此值来更改请求的行为
- ETag: 标识资源版本的唯一字符串, 使用 If-Match 和 If-None-Match 的条件请求使用这个值来改变请求的行为
- If-Match: 使请求具有条件, 并且仅当存储的资源与给定的 ETags 中的一个匹配时才应用该方法
- If-None-Match: 使请求有条件, 并仅当存储的资源不匹配任何给定的 ETags 时应用该方法, 这用于更新缓存(用于安全请求), 或在已有资源时阻止上传新资源
- If-Modified-Since: 使请求具有条件, 并期望仅在给定日期之后修改资源时才传输资源, 这用于仅在缓存过期时传输数据
- If-Unmodified-Since: 使请求具有条件, 并期望仅在给定日期之后没有修改资源时才传输资源, 这确保了特定范围的新片段与以前的片段的一致性, 或者在修改现有文档时实现乐观并发控制系统
- Vary: 确定如何匹配请求头, 以确定是否可以使用缓存的响应, 而不是从源服务器请求一个新的响应

## 连接管理

- Connection: 控制当前事务完成后网络连接是否保持打开状态
- Keep-Alive: 控制持久连接应保持打开的时间

## 内容协商

[内容协商](https://developer.mozilla.org/en-US/docs/Web/HTTP/Content_negotiation)头

- Accept: 通知服务器可以发回的数据[类型](https://developer.mozilla.org/en-US/docs/Glossary/MIME_type)
- Accept-Encoding: 编码算法, 通常是[压缩算法](https://developer.mozilla.org/en-US/docs/Web/HTTP/Compression), 可用于发送回的资源
- Accept-Language: 通知服务器有关期望服务器返回的人类语言的信息, 这是一个提示, 并不一定由用户完全控制, 服务器应该始终注意不要覆盖显式的用户选择(比如从下拉菜单中选择语言)

## 控制器

- Expect: 指示服务器为正确处理请求而需要满足的期望

## Cookies

- Cookie: 包含先前由服务器通过 Set-Cookie 头发送的存储的 HTTP cookies
- Set-Cookie: 从服务器发送 cookies 到用户代理

## CORS

在[这里](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)了解更多关于 CORS 的信息

- Access-Control-Allow-Origin: 指示是否可以共享响应
- Access-Control-Allow-Credentials: 指示当凭据标志为 true 时是否可以公开对请求的响应
- Access-Control-Allow-Headers: 用于响应 preflight 请求, 以指示在发出实际请求时可以使用哪个 HTTP 头
- Access-Control-Allow-Methods: 指定响应 preflight 请求访问资源时允许的方法
- Access-Control-Expose-Headers: 通过列出头的名称, 指示哪些头可以作为响应的一部分公开
- Access-Control-Max-Age: 指示 preflight 请求的结果可以缓存多长时间
- Access-Control-Request-Headers: 在发出 preflight 请求时使用, 以让服务器知道在发出实际请求时将使用哪个 HTTP 头
- Access-Control-Request-Method: 在发出 preflight 请求时使用, 以让服务器知道在发出实际请求时将使用哪个 HTTP 方法
- Origin: 指示获取的来源
- Timing-Allow-Origin: 指定允许查看通过 [Resource Timing API](https://developer.mozilla.org/en-US/docs/Web/API/Resource_Timing_API) 的特性检索到的属性值的起源, 否则由于跨起源的限制, 这些属性值将被报告为零

## Downloads

- Content-Disposition: 指示传输的资源是否应该以内联方式显示(没有头的默认行为), 或者它是否应该像下载一样处理, 并且浏览器应该显示一个 "Save As" 对话框

## 消息体信息

- Content-Length: 资源的大小, 以十进制字节数表示
- Content-Type: 指定资源的媒体类型
- Content-Encoding: 用于指定压缩算法
- Content-Language: 描述面向受众的人类语言, 以便允许用户根据自己喜欢的语言进行区分
- Content-Location: 指示返回数据的替代位置

## 代理

- Forwarded: 包含来自代理服务器的面向客户端的信息, 这些信息在请求路径中涉及代理时被更改或丢失
- Via: 由代理添加, 包括转发代理和反向代理, 并且可以出现在请求头和响应头中

## 重定向

- Location: 指示将页面重定向到的 URL

## 请求上下文

- From: 包含控制请求用户代理的人工用户的 Internet 电子邮件地址
- Host: 指定服务器的域名(用于虚拟主机), 以及服务器正在侦听的 TCP 端口号(可选)
- Referer: 上一个网页的地址, 从该网页可以链接到当前请求的网页
- Referrer-Policy: 规管在 Referer 头中发送的哪些 Referer 信息应包含在发出的请求中
- User-Agent: 包含一个特征字符串, 允许网络协议对等体识别请求软件用户代理的应用程序类型, 操作系统, 软件供应商或软件版本, 另请参见 [Firefox 用户代理字符串引用](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent/Firefox)

## 响应上下文

- Allow: 列出资源支持的 HTTP 请求方法集
- Server: 包含关于源服务器处理请求所使用的软件的信息

## 请求范围

- Accept-Ranges: 指示服务器是否支持范围请求, 如果支持, 范围可以用哪个单位表示
- Range: 指示服务器应该返回的文档的一部分
- If-Range: 创建一个条件范围请求, 只有给定的 etag 或日期与远程资源匹配时才会满足该请求, 用于防止从不兼容的资源版本下载两个范围
- Content-Range: 指示部分消息在完整正文消息中的位置

## 安全

- Cross-Origin-Embedder-Policy (COEP): 允许服务器为给定文档声明嵌入器策略
- Cross-Origin-Opener-Policy (COOP): 阻止其他域打开/控制窗口
- Cross-Origin-Resource-Policy (CORP): 阻止其他域读取应用此头的资源的响应
- Content-Security-Policy (CSP): 控制允许用户代理为给定页面加载的资源
- Content-Security-Policy-Report-Only: 允许 web 开发人员通过监控而不是强制执行政策的效果来试验政策, 这些违规报告由通过 HTTP POST 请求发送到指定 URI 的 JSON 文档组成
- Expect-CT: 允许网站选择在报告和/或执行证书透明度要求, 这防止使用错误的证书为该网站不被注意, 当一个站点启用 Expect-CT 头时, 他们要求 Chrome 检查该站点的任何证书出现在公共 CT 日志中
- Feature-Policy: 提供一种机制来允许和拒绝在其自身框架中以及在其嵌入的 iframe 中使用浏览器特性
- Strict-Transport-Security (HSTS): 强制使用 HTTPS 而不是 HTTP 进行通信
- Upgrade-Insecure-Requests: 向服务器发送一个信号, 表示客户机对加密的和经过身份验证的响应的偏好, 并且它可以成功地处理 upgrade-insecure-requests 指令
- X-Content-Type-Options: 禁用 MIME 嗅探并强制浏览器使用 Content-Type 中给定的类型
- X-Frame-Options (XFO): 指示是否允许浏览器以 `<frame>`, `<iframe>`, `<embed>` 或 `<object>` 的形式呈现页面
- X-XSS-Protection: 启用跨站点脚本过滤

### 获取元数据请求头

Fetch 元数据请求头提供了关于发起请求的上下文的信息, 这允许服务器根据请求的来源和资源的使用方式来决定是否允许请求

- Sec-Fetch-Site: 它是一个请求头, 指示请求发起者的起始点和目标的起始点之间的关系, 它是一个结构化头, 其值是一个具有 cross-site, same-origin, same-site 和 none 可能值的令牌
- Sec-Fetch-Mode: 它是一个向服务器指示请求模式的请求头, 它是一个结构化头, 其值是一个 token, 可能的值有 cors, navigate, no-cors, same-origin 和 websocket
- Sec-Fetch-User: 它是一个请求头, 用于指示导航请求是否由用户激活触发, 它是一个结构化头, 其值是布尔值, 所以可能的值是 ?0 为假, ?1 为真
- Sec-Fetch-Dest: 它是一个请求头, 用于指示请求到服务器的目的地, 它是一个结构化头, 其值是一个标记, 可能的值包括 audio, audioworklet, document, embed, empty, font, image, manifest, object, paintworklet, report, script, serviceworker, sharedworker, style, track, video, worker 和 xslt

## 服务器发送事件

- NEL: 定义一种机制, 使开发人员能够声明网络错误报告策略

## 传输编码

- Transfer-Encoding: 指定用于将资源安全地传输给用户的编码形式
- TE: 指定用户代理愿意接受的传输编码
- Trailer: 允许发送者在分组消息的末尾包含额外的字段

## 其它

- Alt-Svc: 用于列出访问此服务的其他方法
- Date: 包含消息产生的日期和时间
- Early-Date: 表明请求已经在 TLS 早期数据中传递
- Large-Allocation: 告诉浏览器正在加载的页面将需要执行一个大的分配
- Link: Link entity-header 字段提供了一种方法来序列化 HTTP 头中的一个或多个链接, 它在语义上等同于 HTML `<link>` 元素
- Retry-After: 指示用户代理在发出后续请求之前应该等待多长时间
- Server-Timing: 交流给定请求-响应周期的一个或多个指标和描述。
- SourceMap: 将生成的代码链接到源映射
- Upgrade: 与 Upgrade 头字段相关的 RFC 文档是 RFC 7230, 第 6.7 节, 该标准建立了在当前客户机, 服务器, 传输协议连接上升级或更改到不同协议的规则, 例如, 这个头标准允许客户端从 HTTP 1.1 更改为 HTTP 2.0, 假设服务器决定确认并实现 Upgrade 报头字段, 任何一方都不需要接受在 Upgrade 头字段中指定的条款, 它可以在客户端和服务器头中使用, 如果指定了 Upgrade 头字段, 那么发送方也必须发送带有升级选项的 Connection 头字段, 关于 Connection 头字段的详细信息, 请参见上述 RFC 的 6.1 节
- X-DNS-Prefetch-Control: 控制 DNS 预取, 通过该特性, 浏览器可以主动地对用户可能选择遵循的两个链接以及文档引用的项目(包括图像, CSS, JavaScript 等)的 URL 执行域名解析
