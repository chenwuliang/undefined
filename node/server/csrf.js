const https = require('https')
const Koa = require('koa');
const Logger = require('koa-logger');
const fs = require('fs');

const app = new Koa();
app.use(Logger());

const COOKIE_KEY = "user"
const USER_LIST = [
    {
        name: "zhangsan",
        age: 25,
    }
]
const find = user => USER_LIST.find(ele => user === ele.name)
const isUser = user => find(user) !== undefined

var options = {
    key: fs.readFileSync(__dirname + '/private_key.pem'),  //私钥文件路径
    cert: fs.readFileSync(__dirname +'/ca-cert.pem')  //证书文件路径
};

app.use(async (ctx) => {
    const uesr = ctx.query.user
    if (ctx.url.includes('/login')) {
        if (isUser(uesr)) {
            ctx.cookies.set(
                'user',
                'cidddd',    //可替换为token
                {
                    domain: 'localhost',  // 写cookie所在的域名
                    path: '/',       // 写cookie所在的路径
                    maxAge: 10 * 60 * 1000, // cookie有效时长
                    expires: new Date('2021-08-15'),  // cookie失效时间
                    secure: true, // https
                    httpOnly: true,  // 是否只用于http请求中获取
                    overwrite: false,  // 是否允许重写
                    sameSite: 'None', // cookie 默认发送策略
                }
            )
            ctx.body = `用户${uesr}已注册`
        } else {
            ctx.body = `用户未注册`
        }
    }
    else if (ctx.url.includes("/jsonp")) {
        let data = '未登录无cookie'
        // console.log('jsonp cookie', ctx.cookies.get(COOKIE_KEY))
        if (ctx.cookies.get(COOKIE_KEY)) {
            data = ctx.cookies.get(COOKIE_KEY)
        }
        let cb = ctx.request.query.callback;
        ctx.type = 'text';
        ctx.body = cb + '(' + JSON.stringify(data) + ')';
    } 
    else {
        ctx.body = '非index'
    }
})

https.createServer(options, app.callback()).listen(9527, () => {
    console.log(`server running success at 9527`)
});