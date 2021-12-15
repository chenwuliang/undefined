/**
 * https://leetcode-cn.com/leetbook/read/binary-search/xexoac/
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    const n = nums.sort((a, b) => a - b)
    let left = 0;
    let right = n.length - 1
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (n[mid] < target) {
            left = mid + 1
        } else if (n[mid] > target) {
            right = mid - 1
        } else {
            return mid
        }
    }
    return -1
};

let nums = [5], target = 5
search(nums, target)
