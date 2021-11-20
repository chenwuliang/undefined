/** 
 * 二叉树深度
 * https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/
 * */ 
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
class TreeNode {
    constructor(val, left, right) {
        this.val = (val===undefined ? 0 : val)
        this.left = (left===undefined ? null : left)
        this.right = (right===undefined ? null : right)
    }
}

/**
 * @param {TreeNode} root
 * @return {number}
 */
 var maxDepth = (root) => {
    if (root === null) return 0
    let arr = []
    function dfs(node, dep) {
        if (node.left === null && node.right === null) {
            arr.push(dep)
            return
        }
        if (node.left) {
            dfs(node.left, dep + 1)
        }
        if (node.right) {
            dfs(node.right, dep + 1)
        } 
    }
    dfs(root, 1)
    return Math.max(...arr)
};

var maxDepth = (root) => {
    let depth = 0
    function dfs(node, dep) {
        if (node === null) return dep > depth ? depth = dep : depth
        dfs(node.left, dep + 1)
        dfs(node.right, dep + 1)
    }
    dfs(root, 0)
    return depth
};

var maxDepth = (root) => {
    if (root === null) return 0
    return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1
};

function dfsum(root) {
    let nodeNum = 1
    function dfs(node) {
        if (node.left === null && node.right === null) return
        if (node.left) {
            nodeNum += 1
            dfs(node.left)
        } 
        if (node.right) {
            nodeNum += 1
            dfs(node.right)
        } 
    }
    dfs(root)
    return nodeNum
}
function sum(root) {
    if (root === null) return 0
    return sum(root.left) + sum(root.right) + 1
}

const root = {
    val: 3,
    left: {
        val: 9,
        left: null,
        right: null
    },
    right: {
        val: 20,
        left: {
            val: 15,
            left: null,
            right: null
        },
        right: {
            val: 7,
            left: null,
            right: null
        },
    }
}
let depth = maxDepth(root)
let n = sum(root)
console.log(n)