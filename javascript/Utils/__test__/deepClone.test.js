/* eslint-disable no-undef */
import deepClone from "../deepClone.js"

describe("deepClone", () => {
    it("deepClone", () => {
        const test = {
            name: "fvrege",
            age: 1,
            date: new Date(),
            reg: new RegExp(),
            reg2: /^2$/,
            err: new Error("err"),
            fn: () => {}
        }
        const obj2 = deepClone(test)
        expect(obj2 === test).toBe(false)
        expect(JSON.stringify(obj2) === JSON.stringify(test)).toBe(true)
    })
})

