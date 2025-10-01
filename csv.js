function escapeValue(value) {
    if (value === null || value === undefined) {
        return "";
    }

    let string = new String(value);

    if (string.includes(",") || string.includes('"' || string.includes("\n"))) {
        string = string.replace(/"/g, '""');
        return `"${string}"`;
    }

    return string;
}

module.exports = function writeToCsv(filteredFile) {
    if (!filteredFile || filteredFile.length === 0) {
        return "";
    }

    const headers = Object.keys(filteredFile[0]);

    const headerRow = headers.map(escapeValue).join(",");

    const dataRows = filteredFile.map((object) => {
        return headers.map((header) => escapeValue(object[header])).join(",");
    });

    return [headerRow, ...dataRows].join("\n");
};
