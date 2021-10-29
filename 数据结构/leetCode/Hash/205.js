
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isIsomorphic = function(s, t) {
    let s2t = {}, t2s = {}
    for (let i = 0; i < s.length; i ++) {
        if (s2t[s[i]] === undefined) {
            s2t[s[i]] = t[i]
        } else {
            if (s2t[s[i]] !== t[i]) return false
        }
        if (t2s[t[i]] === undefined) {
            t2s[t[i]] = s[i]
        } else {
            if (map[t[i]] !== s[i]) return false
        }
    }
    return true
};

isIsomorphic('paper', 'title')
isIsomorphic('dabc', 'babd')