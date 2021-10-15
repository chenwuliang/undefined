// https://leetcode-cn.com/problems/palindrome-number/

/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
    if (x < 0) return false
    else return x + "" === (x + "").split("").reverse().join("")
};

console.log(isPalindrome(123))
console.log(isPalindrome(-123))
console.log(isPalindrome(323))