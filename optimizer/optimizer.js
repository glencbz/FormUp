"use strict"

const Baby = require('babyparse');
const Fs = require('fs');

const aumStr = Fs.readFileSync('data/SH_Fund_Aums.csv', "utf8");
const detailsStr = Fs.readFileSync('data/SH_Fund_Details.csv', "utf8");
const returnsStr = Fs.readFileSync('data/SH_Fund_Returns.csv', "utf8");

const fileStr = [aumStr, detailsStr, returnsStr];

var mapped = fileStr.map(function(){
  var parseResult;
  Baby.parse(aumStr, {
    complete: function(results){
      parseResult = results;
    },
    skipEmptyLines: true,
  });
  return parseResult.data;
});

var aum = mapped[0],
    details = mapped[1],
    returns = mapped[2];

console.log(returns);