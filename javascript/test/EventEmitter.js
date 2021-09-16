export default class EventEmitter {
    constructor() {
        this.map = {};
    }
    on(eventName, fn, isOnce = false) {
        const list = this.map[eventName];
        if (list) {
            list.push({
                fn,
                isOnce
            });
        } else {
            this.map[eventName] = [{
                fn,
                isOnce
            }];
        }
    }
    emit(eventName, ...args) {
        const list = this.map[eventName];
        if (!list) {
            return;
        }
        let toDelete = [];
        list.map((ele, index) => {
            try {
                ele.fn(...args);
                if (ele.isOnce) {
                    toDelete.push(index);
                }
            } catch (e) {
                console.error("❌ 执行错误");
            }
        });
        toDelete.reverse().map(index => list.splice(index, 1));
        toDelete = null;
    }
    off(eventName, fn) {
        const list = this.map[eventName];
        if (!Array.isArray(list)) {
            console.warn(`不存在${eventName}事件`);
            return;
        }
        if (fn === undefined) {
            // console.info(`${eventName}注销全部事件`);
            this.map[eventName] = null;
            return;
        }
        if (!list.find(ele => ele.fn === fn)) {
            console.warn(`注销未知函数`, fn, list);
            return;
        }
        const index = list?.findIndex(ele => ele === fn);
        list.splice(index, 1);
    }
    once(eventName, fn) {
        this.on(eventName, fn, true);
    }
}
