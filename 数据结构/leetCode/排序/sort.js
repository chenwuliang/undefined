let arr = [1, 3, 2, 4, 10, 21, 33, 41, 21, 91, 26, 99]

/**
 * 计算函数运行时间
 * @param {function} fn 
 * @returns number
 */
function calcdate(fn) {
    let date = Date.now()
    fn()
    let diff = Date.now() - date
    console.log(fn.name, "运行时间", diff)
    return diff
}

/**
 * 冒泡排序
 * @param {number[]} arr 
 * @returns number[]
 */
function pop(arr) {
    let tmp
    for (let i = 0; i < arr.length - 1; i ++) {
        for (let j = 0; j < arr.length - i; i ++) {
            if (arr[j] > arr[j + 1]) {
                tmp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = tmp
            }
        }
    }
    return arr
}


/**
 * 快速排序
 * @param {number[]} arr 
 * @returns number[]
 */
 function quick(arr) {
    
}