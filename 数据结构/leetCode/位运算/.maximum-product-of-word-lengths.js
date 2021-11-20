/**
 * 乘积最大的子字符串
 * 利用位运算比较字符是否有重复字母
 * https://leetcode-cn.com/problems/maximum-product-of-word-lengths/
 */
/**
 * @param {string[]} words
 * @return {number}
 */
 var maxProduct = function(words) {
    let length = words.length
    const masks = new Array(length).fill(0)
    words.map((word, index) => {
        let ans = 0
        for (let i = 0; i < word.length; i ++) {
            ans =  ans | (1 << (word[i].charCodeAt() - 'a'.charCodeAt()))
        }
        masks[index] = ans
    })
    let res = 0
    for (let i = 0; i < length; i++) {
        for (let j = i + 1; j < length; j ++) {
            if ((masks[i] & masks[j]) === 0) {
                res = Math.max(res, words[j].length * words[i].length)
            }
        }
    }
    return res
};
maxProduct(['ab', 'aaa', 'cd'])