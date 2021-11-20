/**
 * 112
 * https://leetcode-cn.com/problems/path-sum/
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
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {boolean}
 */
 var hasPathSum = function(root, targetSum) {
    let flag = false
    const dfs = (node, tar) => {
        if (node === null) return
        if (tar === node.val) {
            flag = true
            return
        }
        dfs(node.left, tar - node.val)
        dfs(node.right, tar - node.val)
    }
    dfs(root, targetSum)
    return flag
};

hasPathSum(
    {
        val: 1,
        left: {
            val: 2,
            left: null,
            right: null
        },
        rifht: null
    },
    1
)