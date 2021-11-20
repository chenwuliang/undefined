/**
 * Definition for a binary tree node.

 */

function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}
/**
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */
 var flatten = function(root) {
    let res = []
    const dfs = node => {
        if (node === null) {
            return
        }
        res.push(node.val)
        dfs(node.left)
        dfs(node.right)
    }
    dfs(root)
    let cur = root
    root.val = res[0]
    for (let i = 1; i < res.length; i ++) {
        cur.left = null
        cur.right = new TreeNode(res[i])
        cur = cur.right
    }
};

let node = {
    val: 1,
    left: {
        val: 2,
        left: {
            val: 3,
            left: null,
            right: null
        },
        right: {
            val: 4,
            left: null,
            right: null
        }
    },
    right: {
        val: 5,
        left: {
            val: null,
            left: null,
            right: null
        },
        right: {
            val: 6,
            left: null,
            right: null
        }
    }
}
flatten(node)