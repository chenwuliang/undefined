const delay = function(func, wait, ...args) {
    return setTimeout(function() {
        return func.apply(null, args)
    }, wait)
}

const debounce = function(func, wait, immediate) {
    var timeout, result

    var later = function(context, args) {
        timeout = null

        // 判断arg是为了下面运行timeout = setTimeout(later, wait);这句话时func不会被执行
        if (args) result = func.apply(context, args)
    }

    var debounced = function(...args) {
        if (timeout) clearTimeout(timeout)

        if (immediate) {
            var callNow = !timeout

            timeout = setTimeout(later, wait)

            if (callNow) result = func.apply(this, args)
        } else {
            timeout = delay(later, wait, this, args)
        }
        return result
    }

    debounced.cancel = function() {
        clearTimeout(timeout)
        timeout = null
    }

    return debounced
}

export default debounce
