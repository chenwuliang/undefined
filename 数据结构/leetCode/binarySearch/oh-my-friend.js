/**
 * https://leetcode-cn.com/problems/friends-of-appropriate-ages/
 */

 function numFriendRequests(ages) {
    ages = ages.sort()
    let ans = 0
    let n = ages.length - 1
    while (n >= 0) {
        let left = 0
        let right = n
        while (left < right) {
            const mid = Math.floor(((right - left) / 2) + left)
            if (
                condition(mid, right, ages) &&
                !condition(mid-1, right, ages)
            ) {
                ans += mid
            } else if (!condition(mid, right, ages)) {
                left = mid + 1
            } else {
                right = mid - 1
            }
        }
        n--
    }
    return ans
};

function condition(x, y, ages) {
    if (ages[y] <= 0.5 * ages[x] + 7 || ages[y] > ages[x]) {
        return true
    } else {
        return false
    }
}