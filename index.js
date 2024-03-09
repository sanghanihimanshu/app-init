#!/usr/bin/env node
import * as p from "@clack/prompts";
import color from "picocolors";
import {
  webFrameworks,
  packageManager,
  language,
  command,
} from "./options/options.js";
import { execSync } from "child_process";
function onCancel() {
  p.cancel("Operation cancelled.");
  process.exit(0);
}
const spinner = p.spinner();
let fullcommand;
let appName;
let pm;
async function main() {
  console.clear();
  p.intro(`${color.bgCyan(color.white("APP-INIT"))}`);
  appName = await p.text({
    message: "enter your application name",
    placeholder: "my-app",
    defaultValue: "my-app",
  });
  const changeset = await p.group(
    {
      PackageManager: () =>
        p.select({
          message: "Select Development platform",
          options: packageManager,
          initialValue: packageManager[0],
        }),
      check: async ({ results }) => {
        try {
          p.log.step("Checking for " + results.PackageManager);
          execSync(results.PackageManager + " -v", (error) => {
            if (error) {
              p.log.error(error.message);
              return;
            }
          });
          return p.log.success(results.PackageManager + " already installed");
        } catch (e) {
          p.log.step("Installing " + results.PackageManager);
          execSync("npm i -g " + results.PackageManager, (error) => {
            if (error) {
              p.log.error(error.message);
              return;
            }
          });
          return p.log.success("Installation complete");
        }
      },
      Language: () => {
        return p.select({
          message: `Select your Language`,
          options: language,
          initialValue: language[0],
        });
      },
      WebFrameworks: ({ results }) => {
        return p.select({
          message: `Select your webFrameworks`,
          options: webFrameworks[results.PackageManager],
        });
      },
      create: async ({ results }) => {
        fullcommand = command.vite({
          packageManager: results.PackageManager,
          language: results.Language,
          Name: appName,
          webFrameworks: results.WebFrameworks[1],
        });
        pm = results.PackageManager;
        return p.log.step("Creating application");
      },
    },
    {
      onCancel,
    }
  );
  if (p.isCancel(appName)) {
    return onCancel();
  }
  try {
    execSync(fullcommand + "&&" + "cd " + appName + "&&" + pm + " install");
    p.log.success(`app created! ${color.underline(color.cyan(appName))}`);
    return p.outro("let`s start race 🚀");
  } catch (error) {
    return p.cancel(color.red(error.message));
  }
}

main().catch((e) => {
  p.cancel(e.message);
});
