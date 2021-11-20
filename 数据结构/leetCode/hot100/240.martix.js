// https://leetcode-cn.com/problems/search-a-2d-matrix-ii/

/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function(matrix, target) {
    for (let i = 0; i < matrix.length; i ++) {
        let index = 0
        let row = matrix[i]
        while (row[index] < target && index < row.length) {
            index += 1
        }
        while (row[index] > target && index > 0) {
            index -= 1
        }
        if (row[index] === target) {
            return true
        }
    }
    return false
};
let matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 5

let r = searchMatrix(matrix, target)
console.log(r)