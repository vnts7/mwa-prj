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

router.get('/',  (req, res) => {
    console.log(req.query.q);
     
    const API1 = 'https://api.nal.usda.gov/ndb/search?max=10&api_key=' + config.api_key  + '&q=' + req.query.q
    
    request(API1, function (error, response, body) {
        console.log('API1: ', API1);  
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
    
}) 

module.exports = router;