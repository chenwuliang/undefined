// https://leetcode-cn.com/problems/minimum-moves-to-equal-array-elements/

/**
 * @param {number[]} nums
 * @return {number}
 */

var minMoves = function(nums) {
    let min = Math.min(...nums)
    let times = 0
    for (let num of nums) {
        times += num - min
    }
    
    return times
};

let res = minMoves([1,1,1000000000])
console.log(res)
