# Text File to CSV Filter

This is a wonky command-line program that filters a text file using a regular expression and outputs the results to a CSV file. It was made to solve a specific problem, works for me so right now I don't have interest in making it better. It's built with Node.js and uses `commander` for command-line options and `chalk` for colorful console output.

-----

## How it Works

The program reads the content of a specified text file, applies a regular expression to find all matches, and then writes these matches to a new CSV file. You can also perform additional actions like replacing specific text within the matches or getting the titles of web pages found in the text file.

-----

## Usage

To use the program, you need to run it from your terminal and provide the required options.

```bash
node index.js [options]
```

### Required Options

  * `-r, --regex <regex>`: The regular expression string used to filter the file.
  * `-f, --file <file>`: The path to the text file you want to filter.
  * `-o, --output <output>`: The name of the output CSV file.

### Optional Options

  * `--flags [flags]`: Regex flags (e.g., `i` for case-insensitive matching). The `g` flag (global) is always used by default.
  * `--header [header]`: Specifies the header for the CSV column. The default is `matches`.
  * `--replaceTarget [replaceTarget]`: A specific string to be replaced within the filtered matches.
  * `--replacement [replacement]`: The string to replace the `replaceTarget` with. You must use this option if you use `--replaceTarget`.
  * `--getTitle [getTitle]`: If your matches are URLs, this will attempt to get the HTML title of the web page and add it as a new column in the CSV.

-----

## Examples

### Basic Filtering

This example finds all instances of the word "error" (case-insensitive) in `log.txt` and saves the results to `errors.csv`.

```bash
node index.js -r "error" --flags "i" -f "log.txt" -o "errors.csv"
```

### Filtering and Replacing

This example finds all phone numbers in `contacts.txt` and replaces the dashes with spaces before saving them to `phone_numbers.csv`.

```bash
node index.js -r "\d{3}-\d{3}-\d{4}" -f "contacts.txt" -o "phone_numbers.csv" --replaceTarget "-" --replacement " "
```

### Filtering URLs and Getting Titles

This example finds all URLs in `web_links.txt` and gets the title of each webpage before saving the results to `titles.csv`.

```bash
node index.js -r "(http|https):\/\/[^ ]+" -f "web_links.txt" -o "titles.csv" --getTitle
```
