/**
 * @param {number[]} apples
 * @param {number[]} days
 * @return {number}
 */
 var eatenApples = function(apples, days) {
    let stk = []
    const n = apples.length
    let i = 0
    let ans = 0
    while (i < n || stk.length) {
        if (apples[i] > 0) {
            stk.push({
                num: apples[i],
                endday: i + days[i]
            })
        }
        stk.sort((a, b) => a.endday - b.endday)
        let len = stk.length
        for (j = len - 1;j >= 0; j --) {
            if (i === stk[j].endday || stk[j].num === 0) {
                stk.splice(j, 1)
            }
        }
        if (stk.length) {
            stk[0].num -= 1
            ans+=1
        }
        i++
    }
    console.log(ans)
    return ans
};
eatenApples([1,2,3,5,2],
    [3,2,1,4,2])