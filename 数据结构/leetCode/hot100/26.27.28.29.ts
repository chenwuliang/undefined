// https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array/


/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    let len = nums.length
    let pre, cur
    for (let i = len - 1; i >= 0; i--) {
        pre = nums[i], cur = nums[i - 1]
        if (cur === pre) {
            nums.splice(i, 1)
        }
    }
    return nums.length
};
let arr = [1,1,2,2,3,3,3,4,5,6,7,7]
removeDuplicates(arr)


// 27 https://leetcode-cn.com/problems/remove-element/
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
 var removeElement = function(nums, val) {
    for (let i = nums.length; i > -1; i --) {
        if (nums[i] === val) {
            nums.splice(i, 1)
        }
    }
    return nums.length
};

// 28 https://leetcode-cn.com/problems/implement-strstr/
function strStr(haystack: string, needle: string): number {
    if (needle === "") return 0
    else if (haystack.includes(needle)) {
        return haystack.split(needle)[0].length
    } else return -1
};

// 29
function divide(dividend: number, divisor: number): number {
    try {
        let res = (dividend / divisor)
        if (res > Math.pow(2, 31) - 1 || res < Math.pow(-2, 31)) throw new Error('')
        return ~~res
    } catch (e) {
        return Math.pow(2, 31) - 1
    }
};