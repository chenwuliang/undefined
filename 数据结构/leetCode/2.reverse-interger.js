// https://leetcode-cn.com/problems/reverse-integer/
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
    const r = parseInt(((x+'').split('').reverse().join("")) )
    if (r > Math.pow(2, 31) - 1 || r <= Math.pow(-2, 31)) {
        return 0
    }
    
    return x > 0 ? r : -r
};


var reverse = function(x) {
    let rev = 0;
    while (x !== 0) {
        const digit = x % 10;
        x = ~~(x / 10);
        rev = rev * 10 + digit;//这里会越界吧
        if (rev < Math.pow(-2, 31) || rev > Math.pow(2, 31) - 1) {
            return 0;
        }
    }
    return rev;
}