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
            if (list.length > 20) {
                console.log(`${eventName} 注册事件数量超过20❌ `, ` 当前数量 ${list.length}, 请及时清除！`);
            }
        } else {
            this.map[eventName] = [{
                fn,
                isOnce
            }];
        }
        // console.info(`${eventName}注册成功`, this.map);
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
        // console.info(`开始注销`, fn);
        const list = this.map[eventName];
        if (!Array.isArray(list)) {
            console.warn(`不存在${eventName}事件`);
            return;
        }
        /**
         * e.off("test")
         */
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
        // console.info(`注销成功`, fn);
    }
    once(eventName, fn) {
        this.on(eventName, fn, true);
    }
}
