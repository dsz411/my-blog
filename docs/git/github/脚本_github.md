---
sidebar_position: 5
---

# 脚本 GitHub

所以现在我们已经介绍了 GitHub 的大部分功能与工作流程，但是任意一个小组或项目都会去自定义，因为他们想要创造或扩展想要整合的服务

对我们来说很幸运的是，GitHub 在许多方面都真的很方便 Hack

在本节中我们将会介绍如何使用 GitHub 钩子系统与 API 接口，使 GitHub 按照我们的设想来工作

## 服务与钩子

GitHub 仓库管理中的钩子与服务区块是 GitHub 与外部系统交互最简单的方式

### 服务

首先我们来看一下服务

钩子与服务整合都可以在仓库的设置区块中找到，就在我们之前添加协作者与改变项目的默认分支的地方

在 “Webhooks and Services” 标签下你会看到与 [服务与钩子配置区域](https://git-scm.com/book/zh/v2/ch00/_services_hooks) 类似的内容

![69](../img/69.png)

有许多可以选择的服务，大多数是整合到其他的商业与开源系统中

它们中的大多数是为了整合持续集成服务、BUG 与问题追踪系统、聊天室系统与文档系统

我们将会通过设置一个非常简单的例子来介绍

如果从 “Add Service” 选择 “email”，会得到一个类似 [电子邮件服务配置](https://git-scm.com/book/zh/v2/ch00/_service_config) 的配置屏幕

![70](../img/70.png)

在本例中，如果我们点击 “Add service” 按钮，每次有人推送内容到仓库时，指定的电子邮件地址都会收到一封邮件

服务可以监听许多不同类型的事件，但是大多数只监听推送事件然后使用那些数据做一些事情

如果有一个正在使用的系统想要整合到 GitHub，应当先检查这里看有没有已有的可用的服务整合

例如，如果正使用 Jenkins 来测试你的代码库，当每次有人推送到你的仓库时你可以启用 Jenkins 内置的整合启动测试运行

### 钩子

如果需要做一些更具体的事，或者想要整合一个不在这个列表中的服务或站点，可以转而使用更通用的钩子系统

GitHub 仓库钩子是非常简单的

指定一个 URL 然后 GitHub 在任一期望的事件发生时就会发送一个 HTTP 请求到那个 URL 

通常做这件事的方式是可以设置一个小的 web 服务来监听 GitHub 钩子请求然后使用收到的数据做一些事情

为了启用一个钩子，点击 [服务与钩子配置区域](https://git-scm.com/book/zh/v2/ch00/_services_hooks) 中的 “Add webhook” 按钮

这会将你引导至一个类似 [Web 钩子配置](https://git-scm.com/book/zh/v2/ch00/_web_hook) 的页面

![71](../img/71.png)

Web 钩子的设置非常简单

大多数情况下只需要输入一个 URL 与一个密钥然后点击 “Add webhook”

有几个选项可以指定在哪个事件时想要 GitHub 发送请求—— 默认的行为是只有当某人推送新代码到仓库的任一分支时的 `push` 事件获得一个请求

让我们看一个设置处理 web 钩子的 web 服务的小例子

我们将会使用 Ruby web 框架 Sinatra，因为它相当简洁，应该能够轻松地看到我们正在做什么

假设我们想要在某个特定的人推送到我们的项目的特定分支并修改一个特定文件时得到一封邮件

我们可以相当容易地使用类似下面的代码做到：

```
require 'sinatra'
require 'json'
require 'mail'

post '/payload' do
  push = JSON.parse(request.body.read) # parse the JSON

  # gather the data we're looking for
  pusher = push["pusher"]["name"]
  branch = push["ref"]

  # get a list of all the files touched
  files = push["commits"].map do |commit|
    commit['added'] + commit['modified'] + commit['removed']
  end
  files = files.flatten.uniq

  # check for our criteria
  if pusher == 'schacon' &&
     branch == 'ref/heads/special-branch' &&
     files.include?('special-file.txt')

    Mail.deliver do
      from     'tchacon@example.com'
      to       'tchacon@example.com'
      subject  'Scott Changed the File'
      body     "ALARM"
    end
  end
end
```

这里我们拿到一个 GitHub 传送给我们的 JSON 请求然后查找推送者，他们推送到了什么分支以及推送的所有提交都改动了哪些文件

然后我们检查它是否与我们的条件区配，如果匹配则发送一封邮件

为了开发与测试类似这样的东西，在设置钩子的地方有一个漂亮的开发者控制台

可以看到 GitHub 为那个 webhook 的最后几次请求

对每一个钩子，当它发送后都可以深入挖掘，检测它是否是成功的与请求及回应的消息头与消息体

这使得测试与调试钩子非常容易

![72](../img/72.png)

开发者控制台的另一个很棒的功能是可以轻松地重新发送任何请求来测试你的服务

关于如何编写 web 钩子与所有可监听的不同事件类型的更多信息，请访问在 https://docs.github.com/cn/developers/webhooks-and-events/webhooks/about-webhooks 的 GitHub 开发者文档

## GitHub API

服务与钩子给你提供了一种方式来接收关于在仓库中发生的事件的推送通知，但是如何获取相关事件的详情呢？

如何自动化一些诸如添加协作者或给问题加标签的事情呢？

这是 GitHub API 派上用场的地方

在自动化流行的趋势下，GitHub 提供了大量的 API 接口，可以进行几乎任何能在网站上进行的操作

在本节中我们将会学习如何授权与连接到 API，如何通过 API 在一个问题上评论与如何修改一个 Pull Request 的状态

### 基本用途

可以做的最基本的事情是向一个不需要授权的接口上发送一个简单的 GET 请求

该接口可能是一个用户或开源项目的只读信息

例如，如果我们想要知道更多关于名为 “schacon” 的用户信息，我们可以运行类似下面的东西：

```shell
$ curl https://api.github.com/users/schacon
{
  "login": "schacon",
  "id": 70,
  "avatar_url": "https://avatars.githubusercontent.com/u/70",
# …
  "name": "Scott Chacon",
  "company": "GitHub",
  "following": 19,
  "created_at": "2008-01-27T17:19:28Z",
  "updated_at": "2014-06-10T02:37:23Z"
}
```

有大量类似这样的接口来获得关于组织、项目、问题、提交的信息 — 差不多就是你能在 GitHub 上看到的所有东西

甚至可以使用 API 来渲染任意 Markdown 或寻找一个 `.gitignore` 模板

```shell
$ curl https://api.github.com/gitignore/templates/Java
{
  "name": "Java",
  "source": "*.class

# Mobile Tools for Java (J2ME)
.mtj.tmp/

# Package Files #
*.jar
*.war
*.ear

# virtual machine crash logs, see https://www.java.com/en/download/help/error_hotspot.xml
hs_err_pid*
"
}
```

