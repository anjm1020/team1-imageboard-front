export default (res) => {
    return {
        exceptionType: {
            code: res.status,
            msg: res.statusText
        },
        detail: res.body
    }
};