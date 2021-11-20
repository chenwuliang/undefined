// https://leetcode-cn.com/problems/binary-tree-preorder-traversal/
// https://leetcode-cn.com/problems/binary-tree-inorder-traversal/
// https://leetcode-cn.com/problems/binary-tree-postorder-traversal/

// 一个不错的题解
// https://leetcode-cn.com/problems/binary-tree-preorder-traversal/solution/die-dai-chao-jian-dan-er-cha-shu-qian-zh-z1k5/

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

// 借用 js 递归函数栈
// 前序遍历
var traversal = function(root) {
    let res = []
    const dfs = node => {
        if (!node) return
        res.push(node.val)
        dfs(node.left)
        dfs(node.right)
    }
    dfs(root)
    return res
};
// 中序遍历
var traversal = function(root) {
    let res = []
    const dfs = node => {
        if (!node) return
        dfs(node.left)
        res.push(node.val)
        dfs(node.right)
    }
    dfs(root)
    return res
};
// 后序遍历
var traversal = function(root) {
    let res = []
    const dfs = node => {
        if (!node) return
        dfs(node.left)
        dfs(node.right)
        res.push(node.val)
    }
    dfs(root)
    return res
};

/**
 * 迭代法，手动实现栈
 */
// 前序遍历
var traversal = function(root) {
    let res = []
    let stack = []
    while (root || stack.length) {
        while (root) {
            res.push(root.val) // 入栈时记录
            stack.push(root)
            root = root.left
        }
        root = stack.pop()
        root = root.right
    }
    return res
};

// 中序遍历
var traversal = function(root) {
    let res = []
    let stack = []
    while (root || stack.length) {
        while (root) {
            stack.push(root)
            root = root.left
        }
        root = stack.pop()
        res.push(root.val) // 出栈时记录
        root = root.right
    }
    return res
};

// 后序遍历 从右子节点开始遍历
var traversal = function(root) {
    let res = []
    let stack = []
    while (root || stack.length) {
        while (right) {
            stack.push(root)
            res.unshift(root.val) // 入栈时 插入队列前
            root = root.right
        }
        root = stack.pop()
        root = root.left
    }
    return res
};
var traversal = function(root) {
    const res = [], stack = []
    stack.push(root)
    while (stack.length) {
        const curr = stack.pop();
        res.unshift(curr.val)
        if (curr.left) stack.push(curr.left)
        if (curr.right) stack.push(curr.right)
    }
    return res
};