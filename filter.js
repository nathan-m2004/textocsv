module.exports = function filter(regex, file, header) {
    let results = [];
    let array;
    while ((array = regex.exec(file)) !== null) {
        const match = {
            [header]: array[0],
        };
        results.push(match);
    }
    return results;
};
