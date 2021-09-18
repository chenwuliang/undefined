export default class Emitter {
    constructor() {
        this.listeners = {}
    }
    addEventListener (name, fn) {
        this.on(name, fn)
    }
    on(name, fn) {
        if (name in this.listeners) {
            this.listeners[name].push(fn)
        } else {
            this.listeners[name] = [fn]
        }
    }
    emit(name, ...args) {
        const events = this.listeners[name]
        for (let i = 0;i < events.length;i++) {
            events[i](args)
        }
    }
    removeListener(name, fn) {
        const events = this.listeners[name] || []
        const i = events.indexOf(fn)
        if (~i) {
            events.splice(i, 1)
        }
    }
    once(name, listener) {
        const self = this
        const fn = function () {
            const args = Array.prototype.slice.call(arguments)
            listener.apply(null, args)
            self.removeListener(name, fn)
        }
        this.on(name, fn)
    }
}
