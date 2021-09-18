var hasProperty = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key)

export default function deepClone (obj) {
    if (obj === null) return null
    if (typeof obj !== "object") return obj
    if (obj instanceof RegExp) return new RegExp(obj)
    if (obj instanceof Date) return new Date(obj)
    else {
        const newObj = new obj.constructor()
        for (const key in obj) {
            if (hasProperty(obj, key)) {
                newObj[key] = deepClone(obj[key])
            }
        }
        return newObj
    }
}
