const express = require('express');
const router = express.Router();

const request = require('request');
const config = require('../config/config');

// https://api.nal.usda.gov/ndb/search?q=butter&api_key=DEMO_KEY
// item": [
//     {
//         "offset": 0,
//         "group": "Branded Food Products Database",
//         "name": "BREYERS, BLASTS!, FROZEN DAIRY DESSERT, REESE'S PEANUT BUTTER CUPS CHOCOLATE FLAVOR WITH REESE'S PEANUT BUTTER SWIRL AND REESE'S PEANUT BUTTER CUP PIECES, UPC: 077567205186",
//         "ndbno": "45093459",
//         "ds": "LI",
//         "manu": "Good Humor-Breyers Ice Cream"
//     },
// Example Nutrient: https://api.nal.usda.gov/ndb/reports/?ndbno=01009&type=f&format=json&api_key=ANAQtthwi1ObZhaWWV8B4VA8eGsymK5NAbLqzu2a
 
router.get('/food',  search)
router.get('/nutrient',  searchNutrient)

function searchNutrient (req, res) {
    console.log(req.query.q);
      
    let API_NUTRIENT = 'https://api.nal.usda.gov/ndb/reports/?api_key=' + config.api_key  + '&ndbno=' + req.query.q
 
        console.log('API_NUTRIENT: ', API_NUTRIENT);  
        request(API_NUTRIENT, function (error, response, body) {
           
            try {
                if (!error && response.statusCode == 200  ) {
                    let food = convert2Json(JSON.parse(body).report.food);

                    res.json({ success: true, data : food }); 
                } else {
                    res.json({ success: false, data : [] }); 
                }
            } catch (err) {
                console.log('search JSON error', err);
                res.json({ success: false, data : [], error : {message : 'parse json error OR no result'} }); 
            }
        }) 
  

}
function search (req, res) {
    console.log(req.query.q);
     
    let API_FOOD = 'https://api.nal.usda.gov/ndb/search?max=10&api_key=' + config.api_key  + '&q=' + req.query.q
    
    request(API_FOOD, function (error, response, body) {
        console.log('API_FOOD: ', API_FOOD);  
        try {
            if (!error && response.statusCode == 200  ) {
                res.json({ success: true, data : JSON.parse(body).list.item });
            } else {
                res.json({ success: false, data : [] });
            }
        } catch (err) {
            console.log('search JSON error', err);
            res.json({ success: false, data : [], error : {message : 'parse json error OR no result'} });
        }
    }) 
    
}


function convert2Json(json) {
    let rs = {};
    rs.ndbno = json.ndbno;
    rs.name = json.name;
    let c = 0;
    for (let i = 0; i < json.nutrients.length; i++){
        let nutrient = json.nutrients[i]
        if (nutrient.nutrient_id=="208") {
            rs.calories = nutrient.value;
            c++
        }
        if (nutrient.nutrient_id=="269") {
            rs.sugar = nutrient.value;
            c++
        }
        if (nutrient.nutrient_id=="204") {
            rs.fat = nutrient.value;
            c++
        }
        if (nutrient.nutrient_id=="203") {
            rs.protein = nutrient.value;
            c++
        }
        if (nutrient.nutrient_id=="205") {
            rs.carbs = nutrient.value;
            c++
        }
        if (c==5) {
            break;
        }
    }
    return rs;
}

module.exports = router;