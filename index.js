#! /usr/bin/env node

const fs = require("fs");
const path = require("path");
const { program } = require("commander");
const chalk = require("chalk");

const filter = require("./filter");
const regexStringToRegExp = require("./regex");
const writeToCsv = require("./csv");
const title = require("./title");
const replace = require("./replace");

program
    .option("-r, --regex <regex>", "Regex string to filter the text file (Not a literal, required)")
    .option("--flags [flags]", "Regex flags (e.g., 'i' for ignore case), 'g' is always used")
    .option("--header [header]", "Header of the CSV")
    .option("--getTitle [getTitle]", "Get a webpage title from the matches of the text filter")
    .option("--replaceTarget [replaceTarget]", "Target specific")
    .option("--replacement [replacement]", "Target specific")
    .option("-f, --file <file>", "File to filter into a CSV (required)")
    .option("-o, --output <output>", "Output CSV file filtered (required)")
    .action(async (options) => {
        if (!options.regex || !options.file || !options.output) {
            console.log(chalk.red.bold("Error: --regex, --file and --output options are required."));
            return;
        }

        const { regex, flags, header, getTitle, replaceTarget, replacement, file, output } = options;

        if (!header) {
            header = "matches";
        }

        if (replaceTarget && !replacement) {
            console.log(chalk.red.bold("You need to provide a replacement for replaceTarget"));
            return;
        }

        try {
            const fileContent = fs.readFileSync(file, "utf-8");
            const regexp = regexStringToRegExp(regex, flags);
            let filteredFile = filter(regexp, fileContent, header);

            if (replaceTarget) {
                filteredFile = replace(filteredFile, replaceTarget, replacement, header);
            }

            if (getTitle) {
                filteredFile = await title(filteredFile, header);
            }

            const csv = writeToCsv(filteredFile);

            const outputFilePath = path.join(__dirname, output);

            if (csv) {
                fs.writeFileSync(outputFilePath, csv, "utf-8");
                console.log(chalk.green.bold(`Successfully wrote CSV content to: ${outputFilePath}`));
            } else {
                console.log(chalk.red.bold("Data array was empty, no CSV file generated."));
            }
        } catch (err) {
            console.error(err);
        }
    });

program.parse();
