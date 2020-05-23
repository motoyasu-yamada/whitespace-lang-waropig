import { readFileSync, writeFileSync } from "fs";
import { extname } from "path";
import { LanguageDefinition } from "./lang";

const [, , srcFile, dstFile] = process.argv;

const srcExt = extname(srcFile).slice(1);
const srcLang: LanguageDefinition = require(`./langs/${srcExt}`).default;
if (!srcLang) {
  throw new Error(`指定された入力言語(${srcExt})は認識できません`);
}
console.log(`入力言語: ${srcLang.name}(${srcExt})`);

const srcTokenToId = Object.entries(srcLang.tokens).reduce((p, [id, token]) => {
  return { ...p, [token]: id };
}, {} as any);

const dstExt = extname(dstFile).slice(1);
const dstLang: LanguageDefinition = require(`./langs/${dstExt}`).default;
if (!dstLang) {
  throw new Error(`指定された出力言語(${dstExt})は認識できません`);
}
console.log(`出力言語: ${dstLang.name}(${dstExt})`);

const src = readFileSync(srcFile).toString();
if (!src) {
  throw new Error("指定されたソースファイルはありません");
}
const srcLength = src.length;
let dst = "";
for (let i = 0; i < srcLength; i++) {
  const c = src.charAt(i);
  const id = srcTokenToId[c];
  if (id) {
    dst += dstLang.tokens[id];
  } else {
    dst += c;
  }
}

writeFileSync(dstFile, dst);
