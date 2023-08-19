const fs = require("fs");
const csvParser = require("csv-parser");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const Candle = require("./candleSticks.js");
const singlePatterns = require("./patternIdentifiers");

const inputFilePath =
  "/Users/sagarsaluja/Documents/NSE data 2000 to 2021/archive/ASIANPAINT.csv";
const outputFilePath =
  "/Users/sagarsaluja/Documents/NSE data 2000 to 2021/ASIANPAINT Candles.csv";
const columnsToWrite = [
  { id: "date", title: "date" },
  { id: "prev_Close", title: "prev_Close" },
  { id: "open", title: "open" },
  { id: "high", title: "high" },
  { id: "low", title: "low" },
  { id: "close", title: "close" },
  { id: "vWAP", title: "vWAP" },
  { id: "volume", title: "volume" },
];

singlePatterns.forEach((e) => {
  columnsToWrite.push({ id: e.name, title: e.name });
});
const csvWriter = createCsvWriter({
  path: outputFilePath,
  header: columnsToWrite,
});

// Create an empty array to store the parsed CSV data
const data = [];
// Use the fs module to read the CSV file
fs.createReadStream(inputFilePath)
  .pipe(csvParser())
  .on("data", (row) => {
    // This callback will be called for each row in the CSV file
    const candle = new Candle(row);
    candle.checkSingleCandleStickPattern();
    data.push(candle);
  })
  .on("end", () => {
    // This callback will be called when the CSV parsing is done
    // console.table(data);
    csvWriter
      .writeRecords(data)
      .then(() => {
        console.log("CSV file has been written successfully");
      })
      .catch((error) => {
        console.error("Error writing CSV file:", error);
      });
  })
  .on("error", (error) => {
    // Handle any errors that might occur during the reading/parsing process
    console.error("Error:", error.message);
  });
