setTimeout(() => {
    console.log(1)
}, 0);

new Promise(function (res, rej) {
    console.log(2)
    for (var i = 0; i < 10000; i ++) {
        if (i === 10) {
            console.log(10)
        }
        console.log(res)
        i == 9999 && res()
    }
    console.log(3)
}).then(function () {
    console.log(4)
})
console.log(5)

// 2 10 3 4 5 1
// 2 10 4 5 3 1
// 2 10 3 5 4 1 