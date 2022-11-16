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
