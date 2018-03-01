const dataFolder = './data/';
const fs = require('fs');
var ws = fs.createWriteStream('./out.tsv');
fs.readdirSync(dataFolder).forEach(file => {
  console.log(file);
  var results = require("./data/"+file);
  console.log(results);
  if(results){
    results.forEach(function(r){
      console.log(r.company+' : '+r.jobtitle+' : '+r.date)
      ws.write(r.company+'\t'+r.jobtitle+'\t'+r.date+'\n');
    });
  }
})