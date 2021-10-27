// https://leetcode-cn.com/problems/merge-k-sorted-lists/
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

 function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function(lists) {
    let arr = []
    for (let i = 0; i < lists.length; i ++) {
        let cur = lists[i]
        while (cur.val !== undefined) {
            arr.push(lists[i].val)
            cur = lists[i].next
        }
    }
    arr = arr.sort((a, b) => a - b)
    let res = new ListNode(arr[0])
    let index = 1
    let cur = res
    while (index < arr.length) {
        cur.next = new ListNode(arr[index])
        cur = cur.next
        index ++
    }
    return res
};

mergeKLists()