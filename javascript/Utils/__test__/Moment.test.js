/* eslint-disable no-undef */
import Moment, {weeks} from "../Moment.js"
describe("Moment", () => {
    const moment = new Moment()
    const random = (v = 59) => Math.floor(Math.random(0, 1) * v) + 1
    const v = 1000
    const second = v
    const minute = second * 60
    const hour = minute * 60
    const day = hour * 24
    it("new Moment", () => {
        expect(moment.date instanceof Date).toBe(true)
    })
    it("diff second", () => {
        const s = random() * second
        expect(moment.diff(s)).toBe(s / v + " 秒")
        expect(parseInt(moment.diff(second))).toBe(1)
    })
    it("diff minute", () => {
        const s = random() * second
        const m = random() * minute
        expect(moment.diff(m + s)).toBe(`${m / minute} 分钟 ${s / v} 秒`)
    })
    it("diff hour", () => {
        const s = random() * second
        const m = random() * minute
        const h = random(23) * hour
        expect(moment.diff(h + m + s)).toBe(`${h / hour} 小时 ${m / minute} 分钟 ${s / v} 秒`)
    })
    it("diff day", () => {
        const s = random() * second
        const m = random() * minute
        const h = (random(23)) * hour
        const d = random() * day
        expect(moment.diff(d + h + m + s)).toBe(`${d / day} 天 ${h / hour > 0 ? h / hour + " 小时" : ""} ${m / minute} 分钟 ${s / v} 秒`)
    })
    it("unix", () => {
        const date = new Date()
        expect(new Moment(date).unix() === Math.round(date.getTime() / 1000)).toBe(true)
    })
    it("format", () => {
        function format(date, formatStr) {
            const year = date.getFullYear()
            const month = date.getMonth() + 1
            const day = date.getDate()
            const week = date.getDay()
            const hour = date.getHours()
            const minute = date.getMinutes()
            const second = date.getSeconds()
            return formatStr.replace(/Y{2,4}|M{1,2}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|m{1,2}|s{1,2}/g, (match) => {
                switch (match) {
                    case "YY":
                        return String(year).slice(-2)
                    case "YYY":
                    case "YYYY":
                        return String(year)
                    case "M":
                        return String(month)
                    case "MM":
                        return String(month).padStart(2, "0")
                    case "D":
                        return String(day)
                    case "DD":
                        return String(day).padStart(2, "0")
                    case "d":
                        return String(week)
                    case "dd":
                        return weeks[week]
                    case "ddd":
                        return "周" + weeks[week]
                    case "dddd":
                        return "星期" + weeks[week]
                    case "H":
                        return String(hour)
                    case "HH":
                        return String(hour).padStart(2, "0")
                    case "hh":
                        return String(hour - 12).padStart(2, "0")
                    case "m":
                        return String(minute)
                    case "mm":
                        return String(minute).padStart(2, "0")
                    case "s":
                        return String(second)
                    case "ss":
                        return String(second).padStart(2, "0")
                    default:
                        return match
                }
            })
        }
        const date = new Date()
        const test = [
            "YYYY",
            "YY",
            "MM",
            "M",
            "DD",
            "D",
            "dddd",
            "ddd",
            "dd",
            "d",
            "HH",
            "H",
            "hh",
            "mm",
            "m",
            "ss",
            "s",
            "match"
        ]
        test.map(item => {
            expect(new Moment(date).format(item) === format(date, item)).toBeTruthy()
        })
    })
})
