/**
 * 相同的树
 * https://leetcode-cn.com/problems/same-tree/
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function(p, q) {
    let r1 = []
    let r2 = []
    const dfs = (node, res) => {
        res.push(node && node.val)
        dfs(node.left, res)
        dfs(node.right, res)
    }
    dfs(p, r1)
    dfs(q, r2)
    for (let i = 0; i < r1.length; i ++) {
        if (r1[i] !== r2[i]) return false
    }
    return true
};
var isSameTree = function(p, q) {
    if (p === null && q === null) {
        return true
    } else if (p === null || q === null) {
        return false
    } else if (p.val !== q.val) {
        return false
    } else {
        return isSameTree(p.left, q.left) && isSameTree(p.right, q.right)
    }
};

// let p = {
//     val: 1,
//     left: {
//         val: 2,
//         left: null,
//         left: null
//     },
//     right: null
// }
// let q = {
//     val: 1,
//     left: null,
//     right: {
//         val: 2,
//         left: null,
//         right: null,
//     }
// }
// isSameTree(p, q)
