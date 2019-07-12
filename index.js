function uintToBase36(n) {
    n = Number(n);
    if (isNaN(n)) throw new Error("input is NaN");
    if (Math.floor(n) !== n) throw new Error("input must be an integer");
    if (n < 0) throw new Error("input must be positive");
    let result = "";
    do {
        const x = n % 36;
        result = (x < 10 ? x.toString() : String.fromCharCode(55 + x)) + result;
        n = Math.floor(n / 36);
    } while (n > 0);
    return result;
}

function uintFromBase36(s) {
    if (typeof s !== "string") {
        throw new Error("input must be a string");
    }
    s = s.toUpperCase();
    let result = 0;
    for (let i = 0, len = s.length; i < len; i++) {
        const c = s.charCodeAt(i);
        const x = c < 65 ? c - 48 : c - 55;
        result += Math.pow(36, len - i - 1) * x;
        if (result > Number.MAX_SAFE_INTEGER) {
            throw new RangeError("Can't decode string, exceeds Number.MAX_SAFE_INTEGER");
        }
    }
    return result;
}

function uintArrayToBase36(uints) {
    if (uints instanceof Array === false) throw new Error("input needs to be an array of uints");
    let result = "";
    for (let i = 0; i<uints.length; i++) {
        result += uintToBase36(uints[i]);
    }
    return result;
}

function uintArrayFromBase36(s, len) {
    if (typeof s !== "string") throw new Error("input needs to be string");
    if (typeof len !== "number" || isNaN(len) || len < 2) throw new Error("len needs to be number greater than 1");
    let result = [];
    for (let i=0; i<s.length; i += len) {
        result.push(uintFromBase36(s.substr(i, len)));
    }
    return result;
}

module.exports = { 
    uintToBase36,
    uintFromBase36,
    uintArrayToBase36,
    uintArrayFromBase36
};