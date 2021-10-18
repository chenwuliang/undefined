// https://leetcode-cn.com/problems/longest-palindromic-substring/
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    if (s.length <= 1) return s
    if (s.length ===2) return ''
    
};

var isR = str => str === str.split('').reverse().join('')