const fs = require("fs");
var Parser = require('tsv').Parser;
var tsv = new Parser("\t",{header: false})
tsv.header = false;
var infile = "out.tsv";
var txt = fs.readFileSync(infile, 'utf8');
//console.log(txt);
var parsed = tsv.parse(txt);
console.log("Total # Items  : : "+parsed.length)

parsed = parsed.map(function(item){
  var newItem = {'company':item[0],'job':item[1]};
  return newItem;
});
// console.log(parsed);
// function uniq(a) {
//    return Array.from(new Set(a));
// }
function comparator(item){

}
function arrayToSet(a) {
    var seen = [];
    var out = [];
    var len = a.length;
    var j = 0;
    for(var i = 0; i < len; i++) {
         var item = a[i];
         if(!seen.find(function(d){if(d.company == item.company && d.job == item.job){return true}else{return false}})) {
               seen.push(item);
               out[j++] = item;
         }
    }
    return out;
}
parsed = arrayToSet(parsed);
console.log("# Unique Items  : : "+parsed.length)

console.log(parsed.slice(0,5));
outTsv = tsv.stringify(parsed);
var fd = fs.open('./outUniq.tsv', "w", function(){})
fs.writeFile('./outUniq.tsv',outTsv ,function(){})
function removeDups(){
}

