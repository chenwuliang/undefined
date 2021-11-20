function removeDuplicates(nums) {
    let arr = [...new Set(nums)]
    nums.splice(0, nums.length, arr)
    return nums.length
};

let nums = [1,1,2,2,3,3]
let res = removeDuplicates(nums)
console.log(nums)
console.log(res)
