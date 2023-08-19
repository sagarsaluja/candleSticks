const singlePatterns = require("./patternIdentifiers");
const columnsToRead = new Set();
const columnsToBeRead = [
  "Date",
  "Prev Close",
  "Open",
  "High",
  "Low",
  "Close",
  "VWAP",
  "Volume",
];
columnsToBeRead.forEach((e) => {
  columnsToRead.add(e);
});

class Candle {
  constructor(candle) {
    for (const column in candle) {
      let propName = column.replace(/[^a-zA-Z0-9_]/g, "_"); //replace space with underscore
      propName = propName.charAt(0).toLowerCase() + propName.slice(1);
      if (columnsToRead.has(column)) this[propName] = candle[column];
    }
  }
  checkSingleCandleStickPattern() {
    singlePatterns.forEach((callback) => {
      const candle = callback(this);
      if (candle) {
        this[callback.name] = callback.name;
      }
    });
  }
}

module.exports = Candle;
