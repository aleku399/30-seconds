var fs = require('fs');
var csv = require('fast-csv');
const R = require('ramda');

var result = [];
var stream = fs.createReadStream("30-seconds.csv");

csv
  .fromStream(stream)
  .on("data", function (data) {
    result.push(data);
  })
  .on("end", function (data) {
    console.log("done", result[1]);
    var flat = flatten(result);
    var random = randomize(flat);
    console.log(unique(random))
  });

flatten = arr => {
  return  R.flatten(arr).filter(function (word){
    if (word) return word;
  })
}
randomize = (arr) => {
  arr.map((name, index) => {
    var randomIndex = Math.floor(Math.random() * (arr.length));
    var itemAtIndex = arr[randomIndex];
    arr[randomIndex] = arr[arr.length - 1];
    arr[arr.length - 1] = itemAtIndex;
  })
  return arr
}
unique = (arr) => {
return  R.uniq(arr).reduce((acc, curr, index)=> {
    var size = 5;
    if ((index % size) !== 0) { 
      acc.push(arr.slice(index, index + size));
    }
    return acc;
  }, [])
}