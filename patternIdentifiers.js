const isBullish = ({ open, close }) => {
  return close - open > 0;
};
const isBearish = ({ open, close }) => {
  return close - open < 0;
};
//   check if a candlestick is a Marubozu
const isMarubozu = ({ open, low, high, close }) => {
  const bodySize = Math.abs(open - close);
  const upperShadow = high - Math.max(open, close);
  const lowerShadow = Math.min(open, close) - low;

  return (
    bodySize > (high - low) * 0.8 &&
    upperShadow < (high - low) * 0.05 &&
    lowerShadow < (high - low) * 0.05
  );
};

//   check if a candlestick is a Doji
const isDoji = ({ open, low, high, close }) => {
  const bodySize = Math.abs(open - close);
  const totalSize = high - low;

  return bodySize / totalSize < 0.1;
};

//   check if a candlestick is a Spinning Top
const isSpinningTop = ({ open, low, high, close }) => {
  const bodySize = Math.abs(open - close);
  const totalSize = high - low;

  return bodySize / totalSize >= 0.1 && bodySize / totalSize < 0.3;
};

//   check if a candlestick is a Hammer
const isHammer = ({ open, low, high, close }) => {
  const bodySize = Math.abs(open - close);
  const upperShadow = high - Math.max(open, close);
  const lowerShadow = Math.min(open, close) - low;

  return (
    bodySize / (high - low) >= 0.6 &&
    upperShadow < (high - low) * 0.05 &&
    lowerShadow / (high - low) >= 0.1
  );
};

//   check if a candlestick is a Hanging Man
const isHangingMan = ({ open, low, high, close }) => {
  const bodySize = Math.abs(open - close);
  const upperShadow = high - Math.max(open, close);
  const lowerShadow = Math.min(open, close) - low;

  return (
    bodySize / (high - low) >= 0.6 &&
    upperShadow / (high - low) >= 0.1 &&
    lowerShadow < (high - low) * 0.05
  );
};

//   check if a candlestick is a Shooting Star
const isShootingStar = ({ open, low, high, close }) => {
  const bodySize = Math.abs(open - close);
  const upperShadow = high - Math.max(open, close);
  const lowerShadow = Math.min(open, close) - low;

  return (
    bodySize / (high - low) >= 0.6 &&
    upperShadow < (high - low) * 0.05 &&
    lowerShadow / (high - low) >= 0.1
  );
};

module.exports = singlePatterns = [
  isBullish,
  isBearish,
  isMarubozu,
  isDoji,
  isSpinningTop,
  isHammer,
  isHangingMan,
  isShootingStar,
];
