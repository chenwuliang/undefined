/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
 var threeSumClosest = function(nums, target) {
    let min = Number.MAX_VALUE
    let ans = 0
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            for (let k = j + 1; k < nums.length; k++) {
                let m = Math.abs(nums[i] + nums[k] + nums[j] - target)
                if (m < min) {
                    min = m
                    ans = nums[i] + nums[k] + nums[j]
                }
            }
        }
    }
    return ans
};

threeSumClosest([0, 0, 0], 1)