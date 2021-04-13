// 作业帮

/**
 * 1. http2 特点
 *     1.1  多路复用 以及阻塞原因 多个握手过程 多个请求等待过程
 * 2. js浮点数溢出机制
 * 3. xss
 * 4. csrf
 * 
 */

const list = [

    {id: 6},
    
    {id: 2, children: [5]},
    
    {id: 13},
    
    {id: 5, children: [10, 11]},
    
    {id: 1, children: [2, 3, 4]},
    
    {id: 10},
    
    {id: 8, children: [13]},
    
    {id: 4, children: [8, 9]},
    
    {id: 9},
    
    {id: 3, children: [6, 7]},
    
    {id: 11, children: [14]},
    
    {id: 14},
    
    {id: 7, children: [12]},
    
    {id: 12} 
]
let res = []
function find(id) {
    list.forEach(ele => {
        if (ele.children && ele.children.includes(id)) {
            res.unshift(ele.id)
            find(ele.id)
        }
    })
    return res
}
find(5)
console.log(res)

// 2. eventLoop
async function async1() {

    console.log('async1 start');

    await async2();

    console.log('async1 end');

}

 

async function async2() {

    console.log('async2');

}

 

console.log('script start');

 

setTimeout(()=>{

    console.log('setTimeout');

},0)

 

async1();

 

new Promise((resolve)=>{

    console.log('promise1');

    resolve();

}).then(()=>{

    console.log('promise2');

});