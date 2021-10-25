// https://leetcode-cn.com/problems/majority-element-ii/
/**
 * @param {number[]} nums
 * @return {number[]}
 */
 var majorityElement = function(nums) {
    const map = new Map()
    nums.map(item => {
        if (map.has(item)) {
            map.set(item, map.get(item) + 1)
        } else {
            map.set(item, 1)
        }
    })
    const max = Math.floor(nums.length / 3)
    let ans = []
    for (let [key, value] of map) {
        if (value > max) {
            ans.push(key)
        }
    }
    return ans
};

let r = majorityElement([3, 2, 3])
console.log(r) // [3]