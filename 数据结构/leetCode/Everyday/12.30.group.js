/**
 * @param {number[]} hand
 * @param {number} groupSize
 * @return {boolean}
 */
 var isNStraightHand = function(hand, groupSize) {
    const len = hand.length
    if (hand.length % groupSize !== 0) return false
    const tmp = hand.sort((a, b) => a - b)
    let map = new Map()
    tmp.forEach(ele => {
        if (map.get(ele)) {
            map.set(ele, map.get(ele) + 1)
        } else {
            map.set(ele, 1)
        }
    })
    for (let i = 0; i < len / groupSize; i ++) {
        let r = []
        let index = 0
        for (let k of map.keys()) {
            if (index === groupSize) {
                break
            }
            if (map.get(k) >= 0) {
                r.push(k)
                map.set(k, map.get(k) - 1)
            }
            if (map.get(k) === 0) {
                map.delete(k)
            }
            if (r[r.length - 1] - r[r.length - 2] !== 1 && r.length >= 2) {
                return false
            }
            
            index = index + 1
        }
    }
    return map.size === 0
};

isNStraightHand([1,2,3,6,2,3,4,7,8, 9, 10,11], 3)