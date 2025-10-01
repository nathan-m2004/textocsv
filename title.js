const { JSDOM } = require("jsdom");

module.exports = async function title(filteredFile, header) {
    for (let i = 0; i < filteredFile.length; i++) {
        const link = filteredFile[i][header];
        try {
            const response = await fetch(link);
            const html = await response.text();

            const dom = new JSDOM(html);
            const doc = dom.window.document;

            const title = doc.querySelector("title").textContent;
            filteredFile[i].title = title;
        } catch (error) {
            console.error(`Error fetching or parsing for video at index ${index}:`, error);
            filteredFile[i].title = "Title not found";
        }
    }
    return filteredFile;
};
