/* eslint-disable no-undef */
import debounce from "./debounce";

describe("To", () => {
    jest.useFakeTimers();
    it("runs timers as expected", async() => {
        const test = jest.fn();
        const debounced = debounce(test, 1000);

        debounced();
        debounced();
        debounced();

        jest.runAllTimers();

        expect(test).toHaveBeenCalledTimes(1);
    });
    it("runs timers canceled", async() => {
        const test = jest.fn();
        const debounced = debounce(test, 1000);

        debounced();
        debounced();
        debounced();
        debounced.cancel();

        jest.runAllTimers();

        expect(test).not.toHaveBeenCalled();
    });
    it("runs timers immediate", async() => {
        const test = jest.fn();
        const debounced = debounce(test, 100, true);

        debounced();
        expect(test).toHaveBeenCalled();
        debounced();
        debounced();

        jest.runAllTimers();

        expect(test).toHaveBeenCalledTimes(1);
    });
});

