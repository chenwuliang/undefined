/**
 * not ac
 * @param {number} n
 * @return {number}
 */
 var findNthDigit = function(n) {
    if (n < 10) {
        return n;
    }
    let cur = 1;
    let length = 0;
    while (cur <= n) {
        length += (cur + "").length;
        if (length >= n) {
            const ans = numberX(cur, length - n);
            console.log(n, ":", ans);
            return ans;
        }
        cur++;
    }
};

const numberX = (n, x) => ((n + "").split("").reverse().join("") + "")[x] - 0;

findNthDigit(10); // 1
findNthDigit(11); // 0
findNthDigit(20); // 1
findNthDigit(100); // 5
findNthDigit(200);