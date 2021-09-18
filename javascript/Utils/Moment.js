export const weeks = ["日", "一", "二", "三", "四", "五", "六"]

export default class Moment {
    constructor(date = new Date().getTime()) {
        this.date = new Date(date)
    }
    unix() {
        return Math.round(this.date.getTime() / 1000)
    }
    format(formatStr) {
        const date = this.date
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
    /**
     * 获取时间差
     * 倒计时用, 后端返回的需要✖️1000
     * @param {Number} diff 时间差 好描述
     * @returns {String}
     */
    diff(diff) {
        const days = Math.floor(diff / (24 * 3600 * 1000))

        // 计算出小时数
        const leave1 = diff % (24 * 3600 * 1000) // 计算天数后剩余的毫秒数
        const hours = Math.floor(leave1 / (3600 * 1000))

        // 计算相差分钟数
        const leave2 = leave1 % (3600 * 1000) // 计算小时数后剩余的毫秒数
        const minutes = Math.floor(leave2 / (60 * 1000))

        // 计算相差秒数
        const leave3 = leave2 % (60 * 1000)
        const seconds = Math.round(leave3 / 1000)
        let returnStr = ""
        if (days > 0) {
            returnStr = days + " 天 "
        }
        if (hours > 0) {
            returnStr += hours + " 小时 "
        }
        if (minutes > 0) {
            returnStr += minutes + " 分钟 "
        }
        if (seconds > 0) {
            returnStr += seconds + " 秒"
        }
        return returnStr
    }
}
