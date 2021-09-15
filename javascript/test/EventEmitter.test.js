/* eslint-disable no-undef */
import EventEmitter from "./EventEmitter";

describe("eventEmitter", () => {
    it("on-off", () => {
        const e = new EventEmitter();
        function f() {}
        e.on("v", f);
        expect(e.map["v"].length).toBe(1);
        e.off("v", f);
        expect(e.map["v"].length).toBe(0);
    });
    it("on-off-all", () => {
        const e = new EventEmitter();
        function f() {}
        e.on("v", f);
        e.on("v", f);
        e.on("v", f);
        expect(e.map["v"].length).toBe(3);
        e.off("v");
        expect(e.map["v"]).toBe(null);
    });
    it("once-emit", () => {
        const e = new EventEmitter();
        function f(v) {
            // console.log(v);
        }
        e.once("v", f);
        e.once("v", f);
        e.once("v", f);
        expect(e.map["v"].length).toBe(3);
        e.emit("v", "emit事件");
        expect(e.map["v"].length).toBe(0);
    });
});
