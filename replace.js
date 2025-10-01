module.exports = function replace(filteredFile, replaceTarget, replacement, header) {
    const regexp = new RegExp(replaceTarget);
    for (let i = 0; i < filteredFile.length; i++) {
        filteredFile[i][header] = filteredFile[i][header].replace(regexp, replacement);
    }
    return filteredFile;
};
