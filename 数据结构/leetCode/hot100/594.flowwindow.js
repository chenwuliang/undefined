// 594 滑动窗口
// var findLHS = function(nums) {
//     nums.sort((a, b) => a - b);
//     let begin = 0;
//     let res = 0;
//     for (let end = 0; end < nums.length; end++) {
//         while (nums[end] - nums[begin] > 1) {
//             begin++;
//         }
//         if (nums[end] - nums[begin] === 1) {
//             res = Math.max(res, end - begin + 1);
//         }
//     }
//     return res;
// };

// findLHS([1,1,2,2,2,3,3,4,4])

// 3. 最长不重复字符串
// https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    let res = 0
    let flag = []
    for (let end = 0; end < s.length; end++) {
        while (flag.includes(s[end])) {
            flag.shift()
        }
        flag.push(s[end])
        res = Math.max(res, flag.length)
    }
    return res
};

lengthOfLongestSubstring('abcadad')
