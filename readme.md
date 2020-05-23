# 豚声言語 など Whitespace 方言対応インタープリター

## 使い方 1

`examples/hworld.bgg`にある Hello World 言語のサンプルが実行されます

```shell
npm install
npm run hworld-bgg
```

## 方言の作り方

`langs`ディレクトリの中に`拡張子.ts`形式の方言定義ファイルを設置してください。

## 方言間の変換

`npm run conv`を実行すると `examples/hworld.ws`から`examples/hworld.bgg`に変換されます
また`ts-node conv.ts <元ソース> <変換先ソース>`で方言間の変換ができます

---

# Whitespace Interpreter

CLI to interpret programs written in the [Whitespace programming language](http://compsoc.dur.ac.uk/whitespace/).

## Usage

**Quick Start**

```shell
$ npx whitespace-lang print-hello-world.ws
```

---

```shell
# Install
$ npm i -g whitespace-lang

# Running a program
$ whitespace print-hello-world.ws
$ Hello World!

# Also works with stdin!
$ cat print-hello-world.ws | whitespace
$ Hello World!
```

## Contributing

This is a silly project, I won't be maintaining it for any real use case!

Saying that, feel free to make GitHub issues. 👍

## Legal

### Credit

**Thanks [vii5ard](https://github.com/vii5ard)!**  
_The interpreter & compiler where adapted from the [vii5ard/whitespace](https://github.com/vii5ard/whitespace) IDE, which you should use to create programs!_

### License

MIT License

_Copyright (c) 2018 Lochlan Bunn_
