/* eslint-disable no-extend-native */
export default function pop() {
    // 冒泡排序,每一趟找出最大的,总共比较次数为arr.length-1次,每次的比较次数为arr.length-1次，依次递减
    var arr = [1, 5, 7, 9, 16, 2, 4]
    var temp
    for (var i = 0;i < arr.length - 1;i++) {
        for (var j = 0;j < arr.length - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp
            }
        }
    }
}

export const mySort = function (fn) {
    var arr = this
    var temp
    for (var i = 0;i < arr.length - 1;i++) {
        for (var j = 0;j < arr.length - 1;j++) {
            if (fn(arr[j], arr[j + 1]) > 0) {
                temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp
            }
        }
    }
}
Array.prototype.min = function () {
    var arr = this
    var min = arr[0]
    for (var i = 0;i <= arr.length - 1;i++) {
        if (min > arr[i]) {
            min = arr[i]
        }
    }
    return min
}
Array.prototype.findItem = function (fn) {
    var arr = this
    for (var i = 0;i < arr.length - 1;i++) {
        if (fn(arr[i])) {
            return arr[i]
        }
    }
}
// arr = [
//     {name: "张三"},
//     {name: "张4"},
//     {name: "张5"},
//     {name: "张6"}
// ]
// arr.findItem(item => item === 3)

// 快速排序
export function quickSort(arr) {
    if (arr.length <= 1) {
        return arr
    }
    var left = []
    var right = []
    var midIndex = parseInt(arr.length / 2)
    var mid = arr[midIndex]
    for (var i = 0;i < arr.length;i++) {
        if (i === midIndex) continue
        if (arr[i] < mid) {
            left.push(arr[i])
        } else {
            right.push(arr[i])
        }
    }
    return quickSort(left).concat([mid], quickSort(right))
}

/**
 * 选择排序 性能一般
 */
var arr = [1, 23, 5, 8, 11, 78, 45]
var temp
for (var i = 0;i < arr.length - 1;i++) {
    for (var j = i + 1;j < arr.length; j++) {
        if (arr[i] > arr[j]) {
            temp = arr[i]
            arr[i] = arr[j]
            arr[j] = temp
        }
    }
}

/**
 * 希尔排序
 * @param {Array} arr
 * @returns Array
 * 性能最好的排序
 */
function xier(arr) {
    var interval = parseInt(arr.length / 2) // 分组间隔设置
    while (interval > 0) {
        for (var i = 0;i < arr.length;i++) {
            var n = i
            while (arr[n] < arr[n - interval] && n > 0) {
                var temp = arr[n]
                arr[n] = arr[n - interval]
                arr[n - interval] = temp
                n = n - interval
            }
        }
        interval = parseInt(interval / 2)
    }
    return arr
}
xier([12, 9, 38, 44, 7, 98, 35, 59, 49, 88, 38])
