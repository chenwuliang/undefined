
function quicksort(nums) {
    if (nums.length === 1 || nums.length === 0) return nums
    let mid = nums[Math.floor(nums.length / 2)]
    let left = [], right = [], middle = []
    for (let i = 0; i < nums.length; i ++) {
        if (nums[i] < mid) {
            left.push(nums[i])
        } else if (nums[i] > mid) {
            right.push(nums[i])
        } else {
            middle.push(mid)
        }
    }
    return quicksort(left).concat(middle).concat(quicksort(right))
}

let res = quicksort([2, 3, 1, 4, 1, 4, 6, 9])
console.log(res)