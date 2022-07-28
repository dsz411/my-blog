---
sidebar_position: 14
---

# Content-Security-Policy

HTTP 响应头 `Content-Security-Policy` 允许站点管理者控制用户代理能够为指定的页面加载哪些资源

除了少数例外情况，设置的政策主要涉及指定服务器的源和脚本结束点

这将帮助防止跨站脚本攻击（`Cross-Site Script`）

如需更多信息，请查阅[Content Security Policy (CSP)](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP)

- 头部类型: [Forbidden header name](https://developer.mozilla.org/en-US/docs/Glossary/Forbidden_header_name)
- 响应头: no

语法:

```http
Content-Security-Policy: <policy-directive>; <policy-directive>
```

其中 `<policy-direct>` 包含: `<directive> <value>`，没有内部标点符号

## 指令

### 获取指令

通过获取指令来控制某些可能被加载的确切的资源类型的位置。

- `child-src`

  为 Web Workers 和其他内嵌浏览器内容（例如用 `<frame>` 和 `<iframe>` 加载到页面的内容）定义合法的源地址

  > 如果开发者希望管控内嵌浏览器内容和 web worker，应分别使用 [frame-src](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/frame-src) 和 `worker-src` 指令，来相对的取代 `child-src`

- `connect-src`

  限制能通过脚本接口加载的 URL

- `default-src`

  为其他取指令提供备用服务 fetch directives

- `font-src`

  设置允许通过 `@font-face` 加载的字体源地址

- frame-src

  设置允许通过类似 `<frame>` 和 `<iframe>` 标签加载的内嵌内容的源地址

- img-src

  限制图片和图标的源地址

- manifest-src

  限制应用声明文件的源地址

- media-src

  限制通过 `<audio>`、`<video>` 或 `<track>` 标签加载的媒体文件的源地址

- object-src

  限制 `<object>`、`<embed>` 或 `<applet>` 标签的源地址

  > 被 `object-src` 控制的元素可能碰巧被当作遗留 HTML 元素，导致不支持新标准中的功能（例如 `<iframe>` 中的安全属性 `sandbox` 和 `allow`）
  >
  > 因此建议限制该指令的使用（比如，如果可行，将 `object-src` 显式设置为 `'none'`）

