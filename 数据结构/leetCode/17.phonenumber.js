// https://zhuanlan.zhihu.com/p/67708654
// https://leetcode-cn.com/problems/letter-combinations-of-a-phone-number/
var table = {
    2: ['a', 'b', 'c'],
    3: ['d', 'e', 'f'],
    4: ['g', 'h', 'i'],
    5: ['j', 'k', 'l'],
    6: ['m', 'n', 'o'],
    7: ['p', 'q', 'r', 's'],
    8: ['t', 'u', 'v'],
    9: ['w', 'x', 'y', 'z'],
}
function letterCombinations(nums) {
    if (!Object(nums).length) return []
    var result = []
    backtrack(result, [], nums, 0, nums.length);
    return result;
}

function backtrack(list, tempList, nums, start, n) {
    if (tempList.length == n) list.push(tempList.join(''))
    else {
        for (var i = start; i < n; i++) {
            var rows = table[nums[i]];
            for (var j = 0; j < rows.length; j++) {
                tempList.push(rows[j]);
                console.log("push -> " + tempList.join("-"))
                backtrack(list, tempList, nums, i + 1, n);//i+1， 保证结果集的子序列有序
                tempList.pop();
                console.log("pop  ->" + tempList.join("-"))
            }
        }
    }
}
console.log(letterCombinations('2345'))
// console.log(letterCombinations('22'))

