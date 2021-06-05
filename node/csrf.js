
const Koa = require('koa');
const Router = require('koa-router');
const Logger = require('koa-logger');

const app = new Koa();
app.use(Logger());

const USER_LIST = [
    {
        name: "zhangsan",
        age: 25
    }
]

const isUser = (user) => USER_LIST.find(ele => user === ele.name) !== undefined
const isLogin = (user) => USER_LIST.find(ele => user === ele.name) !== undefined

app.use(async (ctx) => {
    if (ctx.url.includes('/login')) {
        if (isUser(user)) {
            ctx.cookies.set(
                'cid',
                'ddddd',    //可替换为token
                {
                    domain: 'localhost',  // 写cookie所在的域名
                    path: '/',       // 写cookie所在的路径
                    maxAge: 10 * 60 * 1000, // cookie有效时长
                    expires: new Date('2017-02-15'),  // cookie失效时间
                    secure: false, // https
                    // httpOnly: true,  // 是否只用于http请求中获取
                    overwrite: false,  // 是否允许重写
                    // sameSite: true, // cookie 默认发送策略
                }
            )
            console.log("用户已注册", ctx.cookies.get('cid'))
        } else {
            console.log("用户未注册", ctx.cookies.get('cid'))
        }

        ctx.body = 'cookie is ok'
    }
    else if (ctx.url.includes(  "/jsonp" )) {
        console.log(ctx.cookies.get('cid'))
        let cb = ctx.request.query.callback;
        ctx.type = 'text';
        ctx.body = cb + '(' + '"数据"' + ')';
    } 
    else {

        console.log(222)
        ctx.body = '非index'
        console.log(11)
    }
})


app.listen(3000);