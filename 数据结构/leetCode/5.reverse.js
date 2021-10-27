
// https://leetcode-cn.com/problems/longest-palindromic-substring/
/**
 * @param {string} s
 * @return {string}
 */
// 中心扩展
var longestPalindrome = function (s) {
    if (s.length === 1) return s;
    if (s.length === 0) return "";
    if (s.length === 2) {
        return s[0] === s[1] ? s : s[0]
    }
    let res = "";
    for (let i = 0; i < s.length; i ++) {
      let a = find(i, i + 1, s);
      let b = find(i, i + 2, s);
      let c = a.length > b.length ? a : b
      res = c.length > res.length ? c : res
    }
    return res.length === 0 ? res[0] : res;
};
  
function find(l, r, s) {
    if (s[l] !== s[r]) return ""
    while (l >= 0 && r < s.length && s[l] === s[r]) {
        l --
        r ++
    }
    return s.substring(l + 1, r + 1 - 1)
}


let r= longestPalindrome('babad')
console.log(r)