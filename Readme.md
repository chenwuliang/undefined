# 复习总结

## 知识梳理   
https://www.bilibili.com/video/BV1ek4y1r7GT?from=search&seid=6372870826348641699

## JS

- 基础：es6语法 https://es6.ruanyifeng.com/#README

    1. Promise async await
    2. let const 解构 
    3. 箭头函数 
    4. Map Set Symbol
    5. Array String Object 新的方法
    6. 模块化 Module import

- 高级：
    1. 继承的几种方式 (class继承、原型继承、组合继承、寄生继承、寄生组合继承) 明确知道优缺点 
    2. 原型理解（prototype）
    3. this理解 this在各个环境下的指向问题（call、apply、bind 、箭头函数 用法以及实现）
    4. promise 各个方法的实现（例如：promise.all的实现 实现一个并发数是3个请求的函数 ）
    5. 发布订阅模式 （实现class EventEmitter ）
    ```
        on(eventName, callback)
        once(eventName, callback)
        emit(eventName, ...args)
    ```
    6. 树形结构寻路径
    ```
        const list = [
            {id: 1, children: [2,3]},
            {id: 5, children: [4,6]},
            {id: 10, children: [1,11]},
            {id: 14}
        ]
        find(2) // 2, 1, 10
    ```
    7. 节流 防抖 实现
    8. 深克隆 实现
    
## 浏览器
- https://juejin.cn/post/6844904021308735502

1. eventLoop
2. 重绘 回流
3. 浏览器的运行机制 （从url输入到页面显示）

## HTTP 
- https://juejin.cn/post/6844904100035821575

1. http1.0 http1.1 http2（多路复用以及解决了什么问题，帧，push）
2. 强缓存 协商缓存
3. 跨域 以及解决方式 4种 
    CORS  1.cookie 2. 预检 3. token 如何携带 4. 白名单
    jsonp 
    iframe 
    nginx node中间件
4. 安全问题: 如何防止，攻击方式
    - csrf
    - xss
5. https 加密方式 过程 以及细节
6. 三次握手 过程

## TCP
- https://juejin.cn/post/6844904070889603085

## webpack
1. 内部运行过程
2. loader plugin区别
3. 实现一个plugin  & aplly函数接受的参数 & complile 有那些钩子 
4. 构建优化 一个是速度 
5. 编译优化 
    1. 优化分析 文件大小 依赖分析 编译过程 
    2. 如何量化 ：1. 时间 2. 文件大小 
    3. 从哪些角度考虑做优化 ： 缓存角度 动态加载 happypack
6. chunkhash contentHash hash
* speed-measure-webpack-plugin / webpack-bundle-analyzer

## 框架原理
- Vue

[黄轶](https://ustbhuangyi.github.io/vue-analysis/) | [learnVue](https://github.com/answershuto/learnVue)
    0. 使用
        1. data 函数 return 对象原因
        2. 组件通信方案
        3. prop 在子组件中修改会有什么问题
        * ...
    1. 双向绑定
    2. 依赖分析 watch dep 源码
    3. 虚拟dom 有哪些属性 diff 如何渲染到浏览器中， （编译时 运行时）
    4. watch 做了哪几件处理 或者和 computed data props 中双向绑定的处理逻辑的区别
    5. vue-loader做了什么事
    6. vue3 vs vue2 
        1. 双向绑定改变 proxy 优点
        2. 函数式编程 优点
        * 需要去看下vue3的使用以及部分原理
    7. nextTick 原理 降级处理用了那些API
    8. 如何做预渲染 & SSR & SEO优化

- React

## Node

https://www.bilibili.com/video/BV11t411k79h?from=search&seid=6109501002242082581

1. 与前端比 eventLoop 差异
2. commonjs & module 实现原理  & require 过程 & 导出的是值传递还是依赖 & 如何解决循环引用 & 和 require 与 import 的区别
3. AMD & CMD 区别 / commonjs & requirejs 
4. koa express 的差异 （需要学习下使用再看下原理）


## 面试题
0. AST 抽象语法树
1. 同源 tab 如何通信 window.open 打开了一个另一个页面 纯前端实现
2. element-ui 如何实现按需加载 官网 babel-plugin
3. 函数柯里化
4. 快排 冒泡 希尔 排序
5. 订阅发布和观察者模式的区别
6. js浮点数溢出机制
7. 实现一个 flat 函数 手写
8. blob & createObjectURL 兼容性问题
9. 瀑布流开发模式的优缺点
10. cnpm npm yarn 的区别 如何搭建公司级仓库 以及npm 发布流程
11. 微前端
12. 监控 Sentry 错误如何捕获 捕获思路


