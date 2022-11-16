---
sidebar_position: 1
---

# CLI 开发的简单介绍

新建项目

```shell
$ mkdir cli-app
$ cd cli-app
$ npm init
```

安装依赖

```shell
$ npm install commander download-git-repo ora handlebars figlet clear chalk open watch
```

新建 `bin/kfc.js` 文件, 写入以下代码

```javascript
#!/usr/bin/env node
console.log("cli....");
```

第一行是比不可少的(特别是在 MacOS 环境中)，它指定了程序使用 node 解析器, 否则会报错: `line 1: syntax error near unexpected token "cli..."`

在 package.json 文件里添加 bin 字段

```javascript
{
	// ...
  "bin": {
    "kfc": "./bin/kfc.js"
  },
  //...
}
```

然后运行 npm link 命令, npm link 命令可以把 kfc 设置为全局(也就是在其它文件夹也可以使用 kfc 命令)

```shell
$ npm link
```

现在就可以使用 kfc 命令来打印 'cli....' 了

```shell
$ kfc
cli....
```

## 创建命令行界面

使用 commander 库定制命令, 在 bin/kfc.js 文件里输入

```javascript
#!/usr/bin/env node
import {program} from "commander";
import packageInfo from "../package.json" assert { type: "json" };

program.version(packageInfo.version);

program
  .command("init <name>") // name 为参数
  .description("init project")
  .action((name) => {
    console.log("init", name);
  });

program.parse(process.argv);
```

现在在输入 kfc, 就不一样了

```shell
$ kfc
Usage: kfc [options] [command]

Options:
  -V, --version   output the version number
  -h, --help      display help for command

Commands:
  init <name>     init project
  help [command]  display help for command
```

现在将 action 里的逻辑分割到一个新的文件夹中, 新建 lib/init.mjs 文件(注意后缀名是 `.mjs`), 输入以下内容

```javascript
import { promisify } from "node:util";
import _figlet from "figlet";
import clear from "clear";
import chalk from "chalk";

const figlet = promisify(_figlet);


const log = (content) => console.log(chalk.green(content));

export default async (name) => {
  // 打印欢迎界面
  clear();
  const data = await figlet("KFC Welcome");
  log(data);
};
```

然后回到 bin/kfc.js 文件导入它

```javascript
#!/usr/bin/env node
import {program} from "commander";
import packageInfo from "../package.json" assert { type: "json" };
import actions from "../lib/init.mjs";

program.version(packageInfo.version);

program
  .command("init <name>")
  .description("init project")
  .action(actions);

program.parse(process.argv);
```

此时运行 `kfc init ...` 就会不一样了

![02](./img/02.png)

## 从 Github 上下载模板

现在从 Github 上下载模板, 为此新建 lib/download.js 文件, 输入以下内容

```javascript
const { promisify } = require("util");

module.exports.clone = async function (repo, desc) {
  const download = promisify(require("download-git-repo"));
  const ora = require("ora");
  const process = ora(`Downloading...${repo}`);
  process.start();
  await download(repo, desc);
  process.succeed();
};
```

然后在 lib/init.js 文件中导入它

```javascript
const { promisify } = require("util");
const figlet = promisify(require("figlet"));
const clear = require("clear");
const chalk = require("chalk");

const log = (content) => console.log(chalk.green(content));
const { clone } = require("./download");

module.exports = async (name) => {
  // 打印欢迎界面
  clear();
  const data = await figlet("KKB Welcome");
  log(data);

  // clone
  log(`🚀创建项目 ${name}`);
  await clone("github:su37josephxia/vue-sample", name);
};
```

现在运行 `kfc init myvue`

```shell
$ kfc init myvue
Usage: kfc [options] [command]

Options:
  -V, --version   output the version number
  -h, --help      display help for command

Commands:
  init <name>     init project
  help [command]  display help for command



🚀创建项目 myvue
✔ Downloading...github:su37josephxia/vue-sample
```

现在可以看到在 vue-auto-route/ 文件夹下有了一个 myvue/ 文件夹, 但现在项目中没有任何依赖, 显然真实项目不是这样的, 下面就来写一些代码来使命令行自动安装依赖, 在 lib/init.js 中添加如下代码

```javascript
const { promisify } = require("util");
const figlet = promisify(require("figlet"));
const clear = require("clear");
const chalk = require("chalk");

const log = (content) => console.log(chalk.green(content));
const { clone } = require("./download");

const spawn = async (...args) => {
  const { spawn } = require("child_process");
  return new Promise((resolve) => {
    const proc = spawn(...args);
    proc.stdout.pipe(process.stdout);
    proc.stderr.pipe(process.stderr);
    proc.on("close", () => {
      resolve();
    });
  });
};

module.exports = async (name) => {
  // 打印欢迎界面
  clear();
  const data = await figlet("KKB Welcome");
  log(data);

  log(`🚀创建项目 ${name}`);
  await clone('github:su37josephxia/vue-template', name);

  // 自动安装依赖
  log("安装依赖");
  await spawn("yarn.cmd", ["install"], { cwd: `./${name}` });
  log(`
👌 安装完成
To get Start:
=============================
  cd ${name}
  npm run serve
=============================
  `);
};
```

> 注意在 windows 上, yarn 要用 yarn.cmd, 而不是 yarn, 可以使用以下语句进行判断

```javascript
process.platform === "win32" ? "yarn.cmd" : "yarn";
```

现在程序可以正常运行了, 现在来配置程序自动启动并且打开浏览器, 在 lib/init.js 文件中添加如下代码

```javascript
const { promisify } = require("util");
const figlet = promisify(require("figlet"));
const clear = require("clear");
const chalk = require("chalk");
const open = require("open");

const log = (content) => console.log(chalk.green(content));
const { clone } = require("./download");

const spawn = async (...args) => {
  const { spawn } = require("child_process");
  return new Promise((resolve) => {
    const proc = spawn(...args);
    proc.stdout.pipe(process.stdout);
    proc.stderr.pipe(process.stderr);
    proc.on("close", () => {
      resolve();
    });
  });
};

module.exports = async (name) => {
  // 打印欢迎界面
  clear();
  const data = await figlet("KKB Welcome");
  log(data);

  log(`🚀创建项目 ${name}`);
  await clone('github:su37josephxia/vue-template', name);

  // 自动安装依赖
  log("安装依赖");
  await spawn("yarn.cmd", ["install"], { cwd: `./${name}` });
  log(`
👌 安装完成
To get Start:
=============================
  cd ${name}
  npm run serve
=============================
  `);

  open(`http://localhost:8080`);
  // 启动
  await spawn("yarn.cmd", ["serve"], { cwd: `./${name}` });
};
```

现在程序是可以正常运行的
