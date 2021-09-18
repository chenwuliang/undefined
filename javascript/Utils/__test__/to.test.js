/* eslint-disable no-undef */
import to from "../to";

describe("To", () => {
    // 1.正常promise如果reject或者有代码错误会有异常抛出，await后面代码不会执行。
    // 2.也无法处理区分正常和异常情况，需要手动try catch。
    it("catch common promise error", async() => {
        const createPromise = () => {
            return new Promise((resolve, reject) => {
                reject("执行错误");
            });
        };
        let res;
        let err;
        try {
            res = await createPromise();
            console.log("此行代码不会执行", frenjni);
        } catch (e) {
            err = e;
        }
        expect(err === "执行错误").toBeTruthy();
        expect(res).toBe(undefined);
    });
    it("filter promise success", async() => {
        const createPromise = () => {
            return new Promise((resolve, reject) => {
                resolve("完成，正常执行");
            });
        };
        const {err, res} = await to(createPromise());
        expect(err).toBe(null);
        expect(res).toBe("完成，正常执行");
    });
    it("filter promise failed", async() => {
        const createPromise = () => {
            return new Promise((resolve, reject) => {
                reject("执行失败");
            });
        };
        const {err, res} = await to(createPromise());
        expect(err).toBe("执行失败");
        expect(res).toBe(undefined);
    });
    it("filter promise catch", async() => {
        const createPromise = () => {
            return new Promise((resolve, reject) => {
                throw new Error("new Error");
            });
        };
        const {err, res} = await to(createPromise());
        expect(err instanceof Error).toBeTruthy();
        expect(res).toBe(undefined);
    });
});
