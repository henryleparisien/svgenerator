var express = require('express');
var router = express.Router();
var curl = require('curl');

/* GET home page. */


router.get('/salaires', function(req, res, next) {

    var SPREADSHEETS_API_KEY = 'AIzaSyALk_Si5ynAuYeAy85WA7kv7t6nMN_7O88';
    var ID = '10K_UVBFHUfpyO-W25rc0eUY_oPTaq0Hkl0dMPzSefoA';
    var URL_SHEET = "https://sheets.googleapis.com/v4/spreadsheets/"+ID+"/values/A1:Z1000?key="+SPREADSHEETS_API_KEY;

    curl.getJSON(URL_SHEET,{},function(err,resp, body){

        var headers= body.values[0][0];
        body.values.shift();
        var donnees = body.values;

        var fonction ="UTILISATEURS";
        var donnees_out = [];
        for (let i = 0; i < donnees.length; i++) {
            const ligne = donnees[i];
            if(ligne[1]==fonction){
                donnees_out.push(ligne);
            }
        }
        res.set("Content-Disposition", "attachment;filename="+fonction+".svg");
        res.set("Content-Type", "image/svg+xml");
        res.render('index_salaires', {headers: headers,fonction:fonction,donnees: donnees_out });
    });
    
});


router.get('/immo/ancien', function(req, res, next) {

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
    console.log("MA DATA");

    var nom_dep = "paris";

    
    switch (dep) {
        case 'Paris_quartiers':
            var dep = 75;
            var nom_dep="Paris";
        break;
        case '93':
            var nom_dep="Seine-Saint-Denis";
        break;
        case '94':
            var nom_dep="Val-de-Marne";
        break;
        case '92':
            var nom_dep="Hauts-de-Seine";
        break;
        case '77':
            var nom_dep="Seine-et-Marne";
        break;
        case '78':
            var nom_dep="Yvelines";
        break;
        case '91':
            var nom_dep="Essone";
        break;
        case '95':
            var nom_dep="Val d'Oise";
        break;
        case 'Oise':
            var dep = 60
            var nom_dep="Oise";
        break;
    }
    console.log({ departement:dep, nom_dep:nom_dep,headers: headers,donnees: donnees });
    res.set("Content-Disposition", "attachment;filename="+nom_dep+".svg");
    res.set("Content-Type", "image/svg+xml");
    res.render('index', { departement:dep, nom_dep:nom_dep,headers: headers,donnees: donnees });
  })
  
});

module.exports = router;
