
/**
 * 亲密字符串
 * https://leetcode-cn.com/problems/buddy-strings/
 */
/**
 * @param {string} s
 * @param {string} goal
 * @return {boolean}
 */
var buddyStrings = function (s, goal) {
  if (s.length != goal.length) return false;
  let not = 0,
    res = [],
    set = new Set();
  for (let i = 0; i < s.length; i++) {
    set.add(s[i]);
    if (s[i] != goal[i]) {
      not++;
      res.push(i);
      if (not == 3) return false;
    }
  }
  if (
    res.length == 2 &&
    s[res[0]] == goal[res[1]] &&
    s[res[1]] == goal[res[0]]
  ) {
    return true;
  } else if (not == 0 && set.size < s.length) {
    return true;
  } else return false;
};

buddyStrings('ab', 'ab')