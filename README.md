# kit

一些工具集

[nodejs 开发跨平台 cli 工具](https://blog.fengjx.com/pages/64b9b4/)

## 技术选型

- [commander](https://github.com/tj/commander.js) 命令行参数解析
- [inquirer](https://github.com/SBoudrias/Inquirer.js) 交互式命令行参数解析
- [shelljs](https://github.com/shelljs/shelljs) 跨平台 shell 命令
- [pkg](https://github.com/vercel/pkg) node 可执行文件打包工具

## 测试

```bash
# 使用 pnpm
pnpm dev hello -n fjx

# 使用 yarn
yarn dev hello -n fjx

# 使用 npm
npm run dev  -- hello -n fjx
```

## 打包

```bash
# mac 包
npm run pkg:mac

# windows 包
npm run pkg:win

# linux 包
npm run pkg:win
```

## 查看帮助

```bash
pnpm dev --help
yarn dev --help
npm run dev -- --help
```
