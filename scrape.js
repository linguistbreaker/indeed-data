var fs = require('fs');
var $ = require('jquery');
var cheerio = require('cheerio');
complist = fs.readFileSync('company-list.txt','utf8');
var comps = complist.split('\n');
var Indeed = require('./indeed.js');
var indeed_client = new Indeed("6814933489326501");
// for(comp in comps){
  // var company = comps[comp];

var addResults = function(response, results, company){
  if(!response){
    indeed_client.search({
        q: 'company:'+company,
        l: 'new york, NY',
        userip: '1.2.3.4',
        start:0,
        limit: 50,
        useragent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2)',
    },function(r){addResults(r,results,company)});
  }else{
    //add results from response to results argument
    results = results.concat(response.results);
    console.log(results);
    if(response.totalResults != response.end){
      console.log('$##$$#$ '+company+' #$#$#$#  Need another request    ::  '+results.length);
      indeed_client.search({
          q: 'company:'+company,
          l: 'new york, NY',
          userip: '1.2.3.4',
          start:response.end,
          limit: 50,
          useragent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2)',
      }, function(newResponse){
        addResults(newResponse,results,company);
      });
    }else{
      console.log(results.length+" RESULTS FOR : "+company);
      writeToFile(company,results);
      return results;
    }
  }
}
var writeToFile = function(company,results){
  var d = new Date();
  var dstring = d.toISOString();
  var filename = "data/"+company+dstring+".json"
  var file = fs.writeFileSync(filename,JSON.stringify(results));
  return true;
}
for(comp in comps){
    var company = comps[comp]
    console.log(company);
    addResults(null,[],comps[comp]);
}
