
export default (promise, ext = {}) => {
    return promise
        .then((res) => {
            if (res && typeof res === "object") {
                return {
                    err: null,
                    res,
                    ...res,
                    ...ext
                };
            }
            return {
                err: null,
                res,
                ...ext
            };
        })
        .catch((err) => {
            return {
                err,
                ...ext
            };
        });
};
