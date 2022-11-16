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