var express = require('express');
var router = express.Router();
var curl = require('curl');

/* GET home page. */
router.get('/', function(req, res, next) {

  var SPREADSHEETS_API_KEY = 'AIzaSyALk_Si5ynAuYeAy85WA7kv7t6nMN_7O88';
  var ID = '11GNaVEWLgvyfRD-amNq3Nat6MbrGkoe7gv7EUdJl62U';
  var URL_CLASSEUR = "https://sheets.googleapis.com/v4/spreadsheets/"+ID+"?key="+SPREADSHEETS_API_KEY;
  
  var categories=["Paris_quartiers","93","94","92","77","78","91","95","Oise"];
  var dep = categories[0];
  if(typeof req.query.dep != "undefined"){
    if(categories.indexOf(req.query.dep) > -1){
        dep = req.query.dep;
    }
  }

  var URL_SHEET = 'https://sheets.googleapis.com/v4/spreadsheets/'+ID+'/values/'+dep+'!A1:Z1000?key='+SPREADSHEETS_API_KEY;
  console.log(URL_SHEET);
  
  curl.getJSON(URL_SHEET,{},function(err,resp, body){

    if(typeof req.query.dep != "undefined"){
      if(categories.indexOf(req.query.dep) > -1){
          dep = req.query.dep;
      }
    }


    
    var headers= body.values[0][0];
    body.values.shift();
    var donnees = body.values;
    console.log("MA DATA",);

    var nom_dep = "paris";

    
    switch (dep) {
        case 'Paris_quartiers':
            var dep = 75;
            var nom_dep="paris";
        break;
        case '93':
            var nom_dep="seine-saint-denis";
        break;
        case '94':
            var nom_dep="val-de-marne";
        break;
        case '92':
            var nom_dep="hauts-de-seine";
        break;
        case '77':
            var nom_dep="seine-et-marne";
        break;
        case '78':
            var nom_dep="yvelines";
        break;
        case '91':
            var nom_dep="essone";
        break;
        case '95':
            var nom_dep="vald'oise";
        break;
        case 'Oise':
            var dep = 60
            var nom_dep="oise";
        break;
    }
    console.log({ departement:dep, nom_dep:nom_dep,headers: headers,donnees: donnees });
    res.set("Content-Disposition", "attachment;filename="+nom_dep+".svg");
    res.set("Content-Type", "image/svg+xml");
    res.render('index', { departement:dep, nom_dep:nom_dep,headers: headers,donnees: donnees });
  })
  
});

module.exports = router;
