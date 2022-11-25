import { promisify } from "node:util";
import _figlet from "figlet";
import clear from "clear";
import chalk from "chalk";
import { clone } from "./download.mjs";

const figlet = promisify(_figlet);

const log = (content) => console.log(chalk.green(content));

export default async (name) => {
  // 打印欢迎界面
  clear();
  const data = await figlet("KFC Welcome");
  log(data);

  // 克隆项目
  log(`🚀创建项目 ${name}`);
  await clone("github:facebook/create-react-app", name);
};
