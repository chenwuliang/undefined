
# 如何实现一个 nooe c++ 模块

## node 架构
node架构![avatar](./node.png)


1. V8：Google 开源的高性能 JavaScript 引擎，以 C++ 实现。这也是集成在 Chrome 中的 JS 引擎。V8 将你写的 JavaScript 代码编译为机器码（所以它超级快）

2. libuv：提供异步功能的 C 库。它在运行时负责一个事件循环（Event Loop）、一个线程池、文件系统 I/O、DNS 相关和网络 I/O，以及一些其他重要功能。

3. 其他 C/C++ 组件和库：如 c-ares、crypto (OpenSSL)、http-parser 以及 zlib。这些依赖提供了对系统底层功能的访问，包括网络、压缩、加密等。

### node模块加载机制
- node模块分为两种：一类是核心模块，一类是文件模块
1. 核心模块就是NodeJS标准中提供的模块，如fs、http、net、vm等，官方提供的模块，编译成了二进制代码，直接可以通过require获取核心模块，核心模块具有最高的加载优先级，如果有模块和其命名冲突，nodeJS总会加载核心模块
2. 文件模块则是存储为单独的文件或者文件夹的模块，可能是JS代码、JSON或编译好的C/C++代码。在不显示指定文件模块扩展名的时候，NodeJS会分别试图加上 .js、 .json 和 .node 扩展名。
  - 如果是.node模块会调用`process.dlopen()`方法进行加载

## c++模块
- 依赖的知识
  - 具备一定的 C/C++ 基础语法知识
    1. 数据类型
    2. 循环 运算符 分支控制
    3. 指针与引用
    4. 预编译
    5. 数组 函数 结构体 类

### c++ 模块的编写
1. [官方demo](https://nodejs.org/dist/latest-v10.x/docs/api/addons.html#addons_hello_world)
```js
exports.add = function (a, b) {
    return a + b;
}
```
```c++
void Add(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  double value = args[0].As<Number>()->Value() + args[1].As<Number>()->Value();
  Local<Number> num = Number::New(isolate, value);

  args.GetReturnValue().Set(num);
}
```
2. 编写 node.js 扩展的几个实现姿势


- [原生 C/C++](https://nodejs.org/dist/latest-v12.x/docs/api/addons.html)
  - 非常复杂，需要熟悉 [v8](https://github.com/nodejs/node/blob/master/src/README.md)、 api、源码
    - c++的一些重要知识点
      1. 数据类型
      2. 循环 运算符 分支控制
      3. 指针与引用
      4. 预编译
      5. 数组 函数 结构体 类
  - 依赖 node.js 版本，每个版本api都会改动，需要做兼容，所以很难用。


- [N-API](https://nodejs.org/dist/latest-v12.x/docs/api/n-api.html)
  - node.js 由官方维护的 node.js 扩展 api
  - 纯 C 语法不依赖 node.js 版本，node.js 更新后基于 N-API 写的插件照样用，官方的解释是底层调用的 node.js 稳定版的二进制接口
- [node-addon-api](https://github.com/nodejs/node-addon-api)
  - N-API 的 C++ 包装版本(有对象，更美好)，目前 (Release 2.0.0) 并未完全的包装 N-API 的所有 api
- [nan](https://github.com/nodejs/nan)
  - N-API 没出来之前主要的插件开发方式
  - 虽然依赖 node.js 版本，但是维护团队很卖力，帮忙做好了每个版本的编译所以就 不依赖 node.js 版本了

### C++ 模块的编译

1. 编译环境：需要安装[node-gyp](https://github.com/nodejs/node-gyp/)
```
npm i -g node-gyp
npm i -g ts-node
```

- node-gyp<br>
  Google 出品的跨平台构建工具，初衷是用来打包 chromium 的
  gyp 即 generate your package，将你的 C/++ 代码编译成 node.js 可识别的文件
  类似 webpack 将 vue、jsx 等方言编译成为浏览器可识别文件
  也可以用 cMake.js 做同样的事情
  .node 文件在 windows 平台下既 .dll 在 *nix 平台下 .so 文件，.node 的尾缀只是看起来 自然些

- python<br>
  因为 node-gyp 是用 python 写的，所以需要安装python
  ```
  npm config set python /path/to/executable/python
  ```
- Visual Studio2017<br>
  C/C++ 在 windows 下依赖 VS运行环境.
  如果用vscode开发，安装完vscode之后需要下载核心的c++资源包
  ```
  npm config set msvs_version 2017
  ```

- ts-node
  因为项目是 ts 写的，所以用了一个node的ts运行插件

- mac系统下安装 xcode 会自动集成



2. binding.gyp 文件配置
```
{
    'targets': [
        {
            'target_name': 'collector',
            'sources': [
                'src/libuv.cc',
            ],
            "cflags_cc": [
                "-std=c++17"
            ],
            "include_dirs": ['<!(node -e "require(\'nan\')")'],
            "cflags!": [ "-fno-exceptions" ],
            "cflags_cc!": [ "-fno-exceptions" ],
        },
    ]
}

```

3. 编译
```js
"scripts": {
    "install": "node-gyp rebuild",
    "test": "ts-node ./test/test.ts",
    "test-gcc": "g++ -o ./build/link.exe ./test/main.cc && ./build/link.exe",
    "build": "node-gyp clean configure build --verbose --arch=x64",
    "build-test": "yarn build && yarn test",
    "rebuild": "node-gyp rebuild"
  },
```
- 打包之后会在当前目录创建build文件夹
- 上传npm后，在执行install命令会在安装依赖时自动触发，并进行打包构建。



### C++模块的加载


- 加载
```js
const collector = require('../build/Release/collector.node');
```

## libuv 学习
- livuv架构<br>![avatar](./architecture.png)

### 调用机制

1. V8引擎解析JavaScript脚本。
2. 解析后的代码，调用Node API。
3. libuv库负责Node API的执行。它将不同的任务分配给不同的线程，形成一个Event Loop（事件循环），以异步的方式将任务的执行结果返回给V8引擎。
4. V8引擎再将结果返回给用户。


- loop <br>![avatar](./loop_iteration.png)
[阮老师的文章](https://www.ruanyifeng.com/blog/2018/02/node-event-loop.html)


- [libuv Api](http://docs.libuv.org/en/v1.x/api.html)
- 需求：收集 eventLoop 信息
  1. gc 时间
  2. eventloop指标: tcp  udp  timer file句柄数量


