function debounce(fn) {
    let timeout = null;
    return function(...arg) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            fn(...arg);
        }, 400);
    };
}

function log(...arg) {
    console.log('test', arg)
}
const delog = debounce(log)
delog(123)
delog(123)
delog(123,232,323)