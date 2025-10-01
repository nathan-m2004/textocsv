module.exports = function regexStringToRegExp(regexString, flags) {
    let regexpFlags = "g";
    if (flags) {
        regexpFlags += flags;
    }

    try {
        return new RegExp(regexString, regexpFlags);
    } catch (err) {
        console.error(err);
    }
};
