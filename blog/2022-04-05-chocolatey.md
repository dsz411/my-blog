---
slug: "chocolatey"
title: "Chocolatey"
tags: ["package manager"]
authors:
  - name: Shouzhou Du
    title: Author of this website
    url: https://github.com/dsz411
    image_url: https://avatars.githubusercontent.com/u/49437416?v=4
---

Chocolatey是Windows平台上的包管理器，通过它可以集中安装、管理、更新各种各样的软件

以管理员身份运行 `powershell`, 输入以下命令

```shell
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

等待几分钟, 如果没有任何错误，那么 chocolatey 就安装好了

访问官方的可安装软件列表: https://community.chocolatey.org/packages

卸载软件: `choco uninstall <name>`