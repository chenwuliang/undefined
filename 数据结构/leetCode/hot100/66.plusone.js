// 66
// https://leetcode-cn.com/problems/plus-one/
/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function(digits) {
    let toPlus = true
    for (let i = digits.length - 1; i >= 0; i --) {
        let cur = digits[i]
        if (!toPlus) return digits
        
        if (cur + 1 > 9) {
            digits[i] = 0
            toPlus = true
            if (i === 0) {
                digits.unshift(1)
                return digits
            }
        } else {
            digits[i] = cur + 1
            toPlus = false
        }
    }
    return digits
};

let arr = [9, 9]
plusOne(arr)
console.log(arr)