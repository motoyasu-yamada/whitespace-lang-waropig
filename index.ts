#!/usr/bin/env node
import { LanguageDefinition } from "./lang";
import { extname } from "path";
const toPromise = require("util").promisify;
const readFile = toPromise(require("fs").readFile);
const makeCli = require("meow");
const getStdin = require("get-stdin");

const ws = require("./lib/ws-core");

const cli = makeCli(`
  Usage

    $ whitespace [source-file]

  Examples

    $ whitespace print-hello-world.ws
    $ cat print-hello-world.ws | whitespace
		
    Prints:
    $ Hello World!
`);

const srcFile = cli.input[0];
let srcLang: LanguageDefinition;
let srcExt;

if (srcFile) {
  srcExt = extname(srcFile)?.slice(1);
}
srcExt = srcExt ?? "ws";
try {
  const srcLangModule = require(`./langs/${srcExt}`);
  srcLang = srcLangModule.default;
} catch (e) {
  console.log(e);
  throw new Error(`指定された入力言語(拡張子：${srcExt})は認識できません`);
}
console.log(`言語: ${srcLang.name}(拡張子：${srcExt})で実行します`);

if (srcFile) {
  readFile(srcFile, "utf-8")
    .catch(() => {
      console.error("Could not read file:", srcFile);
      cli.showHelp(1);
    })
    .then((src) => runProgram(src, srcLang));
} else {
  const failedStdin = () => {
    cli.showHelp(1);
  };
  getStdin()
    .catch(failedStdin)
    .then((str) => {
      if (!str) failedStdin();
      else runProgram(str, srcLang);
    });
}

function runProgram(src, srcLang: LanguageDefinition) {
  try {
    console.log("コンパイル開始");
    const program = ws.compile(src, srcLang);
    console.log("コンパイル完了");
    const env = ws.env();
    env.print = (str) => process.stdout.write(str);
    env.runProgram(program);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}
