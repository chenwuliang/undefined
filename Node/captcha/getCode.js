const svgCaptcha = require("svg-captcha");
// const sharp = require("sharp");
const fs = require("fs");
const codeConfig = {
    mathMin: 1, //数学表达式的最小值
    mathMax: 99, // 数学表达式的最大值
    mathOperator: "+-", // 使用的运算符:+、-或+-(用于随机的+或-)
    noise: 1, // 干扰线条的数量
    width: 100, //验证码宽度
    height: 40, //验证码高度
    fontSize: 40, //字体大小
    color: true, //开启字体颜色
    background: "#cc9966", //背景颜色
};
// Node.js

const save = (captcha) => {
    fs.writeFile("test.png", captcha.data, (err) => {
        console.log(err);
    });
};

module.exports = getCode = (req, res) => {
    // res.setHeader('Content-Type', 'image/svg+xml')
    const captcha = svgCaptcha.createMathExpr(codeConfig);

    // fs.writeFile("test.png", captcha.data, (err) => {
    //     console.log(err);
    //     res.set("content-type", "image/png"); //设置返回类型
    //     var stream = fs.createReadStream("./test.png");
    //     var responseData = []; //存储文件流
    //     if (stream) {
    //         //判断状态
    //         stream.on("data", function (chunk) {
    //             responseData.push(chunk);
    //         });
    //         stream.on("end", function () {
    //             var finalData = Buffer.concat(responseData);
    //             res.write(finalData);
    //             res.end();
    //         });
    //     }
    // });
    res.send(captcha.data);


};
