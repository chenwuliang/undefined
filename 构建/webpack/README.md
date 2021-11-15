# webpack
[官网](https://webpack.docschina.org/)

## 知识点

### 性能优化
1. 路由懒加载
    - [VueRouter](https://router.vuejs.org/zh/guide/advanced/lazy-loading.html)
        ```js
        const Foo = () => import(/* webpackChunkName: "group-foo" */ './Foo.vue')
        const Bar = () => import(/* webpackChunkName: "group-foo" */ './Bar.vue')

        const Home = resolve => require(['@/components/home'], resolve)
        ```

    - [Webpack懒加载](https://webpack.docschina.org/guides/lazy-loading/#example)
    - [ensure](https://webpack.docschina.org/api/module-methods/#requireensure)
        ```js
        const Demo = r => require.ensure([], () => r(require('@/components/demo')), 'demo')
        ```

2. 打包优化
    - [contentHash](https://webpack.docschina.org/guides/caching/#output-filenames)
    - [dll](https://webpack.docschina.org/plugins/dll-plugin/)
    - 忽略不需要的代码 [IgnorePlugin](https://webpack.docschina.org/plugins/ignore-plugin/)
    - Happypack多进程打包
    ```js
    module.exports = {
        module: {
            rules: [
                {
                    test: /\.js$/,
                    // 将.js文件交给id为happyBabel的happypack实例来执行
                    loader: 'happypack/loader?id=happyBabel',
                    exclude: /node_modules/
                }
            ]
        },
        output: {
            filename: '[name].[contenthash].js',
            path: path.resolve(__dirname, 'dist'),
            // 每次打包自动清除 dist
            clean: true,
            // 存放动态链接库的全局变量名称，例如对应 react 来说就是 _dll_react
            // 之所以在前面加上 _dll_ 是为了防止全局变量冲突
            library: '_dll_[name]',
        },
        plugins: [
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/), // 忽略moment中不想解析的代码
            new DllPlugin({
                // 动态链接库的全局变量名称，需要和 output.library 中保持一致
                // 该字段的值也就是输出的 manifest.json 文件 中 name 字段的值
                // 例如 react.manifest.json 中就有 "name": "_dll_react"
                name: '_dll_[name]',
                // 描述动态链接库的 manifest.json 文件输出时的文件名称
                path: path.join(distPath, '[name].manifest.json'),
            }),
            new HappyPack({
            // id标识happypack处理那一类文件
                id: 'happyBabel',
                // 配置loader
                loaders: [{
                    loader: 'babel-loader?cacheDirectory=true'
                }],
                // 共享进程池
                threadPool: HappyPack.ThreadPool({size: require('os').cpus().length}),
                // 日志输出
                verbose: true
            })
        ]
    };
    ```

3. 开发构建优化
    #### 构建过程
    - [构建优化](https://webpack.docschina.org/guides/build-performance/)
    - webpack5 => 压缩过程优化 [terser-webpack-plugin + uglyify](https://webpack.docschina.org/plugins/terser-webpack-plugin/#uglify-js)

    #### 利用缓存
    - [optimization](https://webpack.docschina.org/configuration/optimization/)
    - [cache](https://webpack.docschina.org/configuration/cache/#cache)
    ```js
    module.exports = {
        cache: {
            type: 'filesystem',
            allowCollectingMemory: true,
        },
        devtools: 'eval-cheap-module-source-map', //`eval` 性能最好, 综合考虑 `eval-cheap-module-source-map` 最合适
        optimization: {
            moduleIds: 'deterministic', // 保证哈希的正确性
            /**
             将第三方库(library)（例如 lodash 或 react）提取到单独的 vendor chunk 文件中，是比较推荐的做法，这是因为，它们很少像本地的源代码那样频繁修改。因此通过实现以上步骤，利用 client 的长效缓存机制，命中缓存来消除请求，并减少向 server 获取资源，同时还能保证 client 代码和 server 代码版本一致。 这可以通过使用 SplitChunksPlugin 示例 2 中演示的 SplitChunksPlugin 插件的 cacheGroups 选项来实现。我们在 optimization.splitChunks 添加如下 cacheGroups 参数并构建：
            */
            runtimeChunk: 'single', // 为所有 chunk 创建一个 runtime bundle
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all',
                    },
                },
            },
            minimize: true,
            minimizer: [new TerserPlugin({
                minify: TerserPlugin.uglifyJsMinify,
                // `terserOptions` options will be passed to `uglify-js`
                // Link to options - https://github.com/mishoo/UglifyJS#minify-options
                terserOptions: {},
            })],
        },
    };
    ```
4. 其他优化

    - CDN 加速
    - 图片懒加载 + 精灵图片 + base64
    - 减少重绘
    - 

### 常用插件

1. 

HotModuleReplacementPlugin