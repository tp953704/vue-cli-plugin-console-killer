const path = require('path');
const Traverse = require('./traverse/index');
const fnTransform = require('./transfrom/index');
module.exports = () => {
  console.log("一起殺光這些像蟑螂一樣的console.log巴")
  Traverse(path.resolve('./')+'/src',fnTransform)
}