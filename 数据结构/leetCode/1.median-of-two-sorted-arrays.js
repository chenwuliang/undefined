// https://leetcode-cn.com/problems/median-of-two-sorted-arrays/

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    const arr = [...nums1, ...nums2].sort((a, b) => a - b)
    const len = arr.length
    console.log(len)
    if (len % 2 === 0) {
        let mid1 = len / 2 - 1
        let mid2 = mid1 + 1
        return (arr[mid1] + arr[mid2]) / 2
    } else {
        return arr[Math.floor(len / 2)]
    }
};
let res = findMedianSortedArrays([1,3], [2])
console.log(res)