console.log('1');
async function async1() {
    console.log('2');
    async2()
    .then(res => {
        console.log(res)
        return 200
    }).then((res) => {
        console.log(res);
    }).catch(err => {
        console.log(err)
    })
}
function async2() {
    return new Promise((resolve, reject) => {
        console.log('4');
        setTimeout(() => {
            resolve(100)
        }, 4000);
        setTimeout(() => {
            reject(new Error('超时'))
        }, 3000);
    })
    
}

async1();


console.log('10');

new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(100)
    }, 4000);
    
}).then(
    res => {
        console.log(res)
    }
)



// -----------------------------
console.log('1');
        async function async1() {
            console.log('2');
            await async2();
            console.log('3');
        }
        async function async2() {
            console.log('4');
        }
        setTimeout(function () {
            console.log('5');
            new Promise(function (resolve) {
                console.log('6');
                resolve();
            }).then(function () {
                console.log('7')
            })
        })

        async1();

        new Promise(function (resolve) {
            console.log('8');
            resolve();
        }).then(function () {
            console.log('9');
        });
        console.log('10');
// 3.1 2.28
cainian 
//  2022 2.28
// 3.5
/**
 * 4 
 * 交易月
 * 1
 * 4
 * 7
 * 10
 * 
 * 3.5 b
 * s a b+ b b- c d
 * 核算窗口期 系数
 * 
 * 2022 3.1 4个月
 * 高徒教育
 * 高徒学院
 */