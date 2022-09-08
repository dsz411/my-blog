---
sidebar_position: 10
---

# HTTP 客户端提示

客户端提示是一组 HTTP 请求报头字段, 服务器可以主动从客户端请求这些字段, 以获取有关设备, 网络, 用户和用户代理特定首选项的信息, 服务器可以根据客户端选择提供的信息决定发送哪些资源

"hint" 头的集合在主题 [HTTP 头](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers#client_hints)中列出, 并[总结如下](https://developer.mozilla.org/en-US/docs/Web/HTTP/Client_hints#hint_types)

服务器必须声明它支持客户端提示, 并使用 Accept-CH 头指定它想要接收的提示, 当一个支持客户端提示的客户端接收到 Accept-CH 报头时, 它可以选择在它的后续请求中附加部分或全部列出的客户端提示报头

例如, 下面响应中的 Accept-CH 后面, 客户端可以向所有后续请求追加 Width, Downlink 和 Sec-CH-UA 报头

```
Accept-CH: Width, Downlink, Sec-CH-UA
```

这种方法非常有效, 因为服务器只请求它能够有效处理的信息, 这也是相对的"隐私保护", 因为它由客户决定哪些信息可以安全地共享

如果没有请求, 客户端事件可能会发送一小组 [low entropy 的客户端提示头](https://developer.mozilla.org/en-US/docs/Web/HTTP/Client_hints#low_entropy_hints)

> 客户端提示也可以在 HTML 中使用带有 http-equiv 属性的 `<meta>` 元素指定
>
> ```html
> <meta http-equiv="Accept-CH" content="Width, Downlink, Sec-CH-UA">
> ```

## 缓存和客户端提示

决定在响应中发送哪些资源的客户机提示通常也应该包含在受影响的响应的 Vary 报头中, 这确保了为提示头的每个不同值缓存不同的资源

```
Vary: Accept, Width, ECT
```

对于值变化很大的客户端提示头, 可能更喜欢省略 Vary 或使用其他策略, 因为这有效地使资源不可缓存(为每个惟一值创建一个新的缓存条目), 这尤其适用于网络客户端提示, 如 Downlink 和 RTT, 有关详细资料请参阅 [HTTP Caching > Varying responses](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching#varying_responses)

## Hint life-time

服务器指定客户端提示头, 它希望在 Accept-CH 响应头中获取该提示头, 用户代理将请求的客户机提示头, 或者至少是它希望与该服务器共享的子集, 追加到当前浏览会话中的所有后续请求

换句话说, 在浏览器关闭之前, 对一组特定提示的请求不会过期

服务器可以通过用一个新列表重新发送 Accept-CH 响应头来替换它感兴趣的客户端提示集, 例如, 为了停止请求任何提示, 它将发送带有空列表的 Accept-CH

## Low entropy hints

客户端提示大致分为高熵提示和低熵提示

低熵提示是那些不会透露太多信息的提示, 这些信息可能被用来"指纹"(识别)一个特定的用户, 默认情况下, 它们可能会在每个客户端请求上发送, 而不考虑服务器的 Accept-CH 响应头, 这取决于权限策略, 这些提示包括 [`Save-Data`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Save-Data), [`Sec-CH-UA`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Sec-CH-UA), [`Sec-CH-UA-Mobile`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Sec-CH-UA-Mobile), [`Sec-CH-UA-Platform`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Sec-CH-UA-Platform)

高熵提示是那些有可能提供更多信息的提示, 这些信息可以用于用户指纹识别, 因此, 用户代理可以决定是否提供这些信息, 决策可能基于用户首选项, 权限请求或权限策略, 所有不是低熵提示的客户端提示都被认为是高熵提示

## 提示类型

### User-agent 客户端提示

用户代理( UA )客户端提示头允许服务器根据用户代理(浏览器), 操作系统和设备改变响应, 头包括: [`Sec-CH-UA`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Sec-CH-UA), [`Sec-CH-UA-Arch`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Sec-CH-UA-Arch), [`Sec-CH-UA-Bitness`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Sec-CH-UA-Bitness), [`Sec-CH-UA-Full-Version-List`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Sec-CH-UA-Full-Version-List), [`Sec-CH-UA-Full-Version`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Sec-CH-UA-Full-Version), [`Sec-CH-UA-Mobile`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Sec-CH-UA-Mobile), [`Sec-CH-UA-Model`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Sec-CH-UA-Model), [`Sec-CH-UA-Platform`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Sec-CH-UA-Platform) 和 [`Sec-CH-UA-Platform-Version`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Sec-CH-UA-Platform-Version)

客户提示可以通过[用户代理客户提示 API](https://developer.mozilla.org/en-US/docs/Web/API/User-Agent_Client_Hints_API) 访问网页 Javascript

> 服务器目前通过解析 User-Agent 头获得大部分相同的信息, 由于历史原因, 这个报头包含了很多不相关的信息, 以及可能用于识别特定用户的信息, UA 客户端提示提供了一种更有效, 更保护隐私的获取所需信息的方式, 他们最终有望取代这种旧的方法

### 设备客户机提示

设备客户端提示允许服务器根据设备特征(包括可用内存和屏幕属性)改变响应, 头包括: [`Device-Memory`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Device-Memory), [`DPR`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/DPR), [`Width`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Width), [`Viewport-Width`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Viewport-Width)

### 网络客户端提示

网络客户端提示允许服务器根据用户的选择, 网络带宽和延迟改变响应, 头包括 [`Save-Data`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Save-Data), [`Downlink`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Downlink), [`ECT`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/ECT), [`RTT`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/RTT)