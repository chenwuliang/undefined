

# CSRF 攻击与防御

### 关于浏览器 cookie 的几个属性

-    domain: 'example.com',  // 写cookie所在的域名
-    path: '/',       // 写cookie所在的路径
-    maxAge: 10 * 60 * 1000, // cookie有效时长
-    expires: new Date('2022-02-15'),  // cookie失效时间
-    secure: true, // https
-    httpOnly: true,  // 是否允许在http请求中获取
-    overwrite: false,  // 是否允许重写
-    sameSite: 'None', // cookie 默认发送策略 [SameSite介绍](http://www.ruanyifeng.com/blog/2019/09/cookie-samesite.html)


### 关于浏览器对 SameSite 的限制更新情况
0. [Chrome 更新文档](https://www.chromium.org/updates/same-site?pli=1#20210318)
1. chrome浏览器从80版本开始， SameSite=Lax by default, SameSite=None requires Secure。
2. 91版本之前，允许开发者自己修改策略默认值在[chrome://flags/](chrome://flags/)
3. 从91版本开始开发者不被允许自己修改SameSite策略, 所以采用360浏览器演示


### 因为 SameSite=None 依赖 Secure 所以 需要搭建https服务


1. 生成私钥
```
openssl genrsa -out private_key.pem 1024
参数解释：genrsa -- 用RSA算法
private_key.pem导出的私钥名称
```

2. 生成请求证书
```
openssl req -new -out ca-req.csr -key private_key.pem
参数解释：ca-req.csr -- 证书请求名称， 
private_key.pem前面生成的传输私钥的名称
```

3.  创建证书
```
openssl x509 -req -in ca-req.csr -out ca-cert.pem -signkey private_key.pem -days 3650
```

### JSONP

### mongodb
