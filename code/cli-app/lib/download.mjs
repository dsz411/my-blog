import { promisify } from "node:util";
import _download from "download-git-repo";
import ora from "ora";

const clone = async (repo, desc) => {
  const download = promisify(_download);
  const process = ora(`Downloading...${repo}`);
  process.start();
  await download(repo, desc);
  process.succeed();
}

export { clone };
