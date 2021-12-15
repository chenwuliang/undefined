/**
 * @param {number[][]} grid
 * @param {number} row
 * @param {number} col
 * @param {number} color
 * @return {number[][]}
 */
 var colorBorder = function(grid, row, col, color) {
    if (grid === null || grid.length === 0) return
    let map = []
    let reset = []
    const start = grid[row][col]
    const rowlength = grid.length
    const collength = grid[0].length
    let index = 0
    const dfs = (i, j) => {
        console.log(i, j)
        if (
            i < 0 ||
            i >= rowlength ||
            j >= collength ||
            j < 0 ||
            grid[i][j] === null
        ) {
            return
        } 

        const cur = grid[i][j]
        if (cur === start) {
            if (
                (i === 0 || j === 0 || i === rowlength - 1 || j === collength - 1) ||
                (grid[i+1][j] !== cur && grid[i+1][j] !== null) ||
                (grid[i][j+1] !== cur && grid[i][j+1] !== null) ||
                (grid[i-1][j] !== cur && grid[i-1][j] !== null) ||
                (grid[i][j-1] !== cur && grid[i][j-1] !== null)
            ) {
                map.push([i, j])
                grid[i][j] = null
                
            } 
            dfs(i, j+1)
            dfs(i+1, j)
            dfs(i-1, j)
            dfs(i, j-1)
        }
    }
    dfs(row, col)
    for (let [i, j] of map) {
        grid[i][j] = color
    }
    return grid
};

colorBorder(
    [[2,1,3,2,1,1,2],[1,2,3,1,2,1,2],[1,2,1,2,2,2,2],[2,1,2,2,2,2,2],[2,3,3,3,2,1,2]],
    4,
    4,
    3
)