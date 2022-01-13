/**
 * @param {string} s
 * @return {string}
 */
 var modifyString = function(s) {
    let str = ''
    for (let i = 0; i < s.length; i ++) {
        if (s[i] === '?') {
            const r = change(s, i)
            str += r
        }
        else str += s[i]
    }
    return str
};

function random() {
    return Math.floor(Math.random(0, 1) * 25 + 97)
}
function change(s, i) {
    let pre, next
    if (i > 0 && i < s.length) {
        pre = s[i - 1].charCodeAt()
        next = s[i + 1].charCodeAt()
        let code = random()
        while (code === pre || code === next) {
            code = random()
        }
        return String.fromCharCode(code)
    }
    if (i === 0) {
        next = s[i + 1].charCodeAt()
        let code = random()
        while (code === next) {
            code = random()
        }
        return String.fromCharCode(code)
    }
    if (i === s.length - 1) {
        pre = s[i + 1].charCodeAt()
        let code = random()
        while (code === pre) {
            code = random()
        }
        return String.fromCharCode(code)
    }
}
let r = modifyString('?ab')
console.log(r)