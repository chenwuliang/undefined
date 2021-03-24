
setTimeout(function () {
    console.log("settimeout");
},0);

async function async1() {
    console.log("async1 start");
    await  async2();
    console.log("async1 end");
}

async  function async2() {
    console.log( 'async2');
}

console.log("script start");


async1();

new Promise(function (resolve) {
    console.log("promise1");
    resolve();
}).then(function () {
    console.log("promise2");
});

console.log('script end'); 




/**
 * script start
 * async1 start
 * async2
 * async1 end
 * promise1
 * script end
 * promise2
 * settimeout
 */

/**
 * script start
 * async1 start
 * async2
 * promise1
 * script end
 * 
 * async1 end
 * 
 * promise2
 * settimeout
 */