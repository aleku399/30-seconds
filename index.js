const fs = require('fs');
const csv = require('fast-csv');
const R = require('ramda');

const result = [];
const stream = fs.createReadStream("30-seconds.csv");

csv
  .fromStream(stream)
  .on("data", function (data) {
    result.push(data);
  })
  .on("end", function (data) {
    console.log("done", result[1]);
    const flat = flatten(result);
    const random = randomize(flat);
    console.log(unique(random))
  });

const flatten = arr => {
  return  R.flatten(arr).filter(function (word){
    if (word) return word;
  })
}
const randomize = (arr) => {
  arr.forEach((name, index) => {
    var randomIndex = Math.floor(Math.random() * (arr.length));
    var itemAtIndex = arr[randomIndex];
    arr[randomIndex] = arr[arr.length - 1];
    arr[arr.length - 1] = itemAtIndex;
  })
  return arr
}
const unique = (arr) => {
return  R.uniq(arr).reduce((acc, curr, index)=> {
    const size = 5;
    if ((index % size) !== 0) { 
      acc.push(arr.slice(index, index + size));
    }
    return acc;
  }, [])
}