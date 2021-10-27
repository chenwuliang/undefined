/**
 * @param {number[]} nums
 * @return {number}
 */
// 单调栈
var thirdMax = function(nums) {
    nums = [...new Set(nums)]
    let stack = [], i = 0
    while (i < nums.length) {
        if (stack.length) {
            while (nums[i] > stack[stack.length - 1]) {
                let v = stack.pop()
                nums.push(v)
            }
            if (stack.length < 3) {
                stack.push(nums[i])
            }
            if (nums[i] < stack[stack.length - 1]) {
                if (stack.length < 3) {
                    stack.push(nums[i])
                }
            } 
        } else {
            stack.push(nums[i])
        }
        i ++
    }
    if (stack.length === 2 || stack.length === 1) return stack[0]
    else return stack[2]
};
let arr = [5,2,4,1,3,6,0]
let r = thirdMax(arr)
console.log(r)