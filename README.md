# 简介
农户作业需求发布平台--小程序端代码

# clone
执行clone操作之前先将自己电脑上的 `ssh公钥` 添加到阿里云效上。
`git clone git@code.aliyun.com:wemiracle-front-end/farm.git`

# 安装开发环境
确保本地环境已安装node，微信开发者工具

安装项目依赖(在项目根目录下运行)： `npm install`

# 运行开发环境
`npm run dev:weapp`
打开微信开发者工具，选择导入项目，项目目录为项目根目录

# 构建 production 版本
`npm run build:weapp`

# 更新Taro框架
先运行`npx taro update self` 更新taro/cli版本，之后运行 `npx taro update project` 更新项目版本

# 发布代码
在微信开发者工具中发布代码，dev 版本是测试环境（使用的是测试域名）， production是正式版本。