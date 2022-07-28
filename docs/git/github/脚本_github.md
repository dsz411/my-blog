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