const express = require('express');
const app = express();
const morgan = require('morgan');
const axios = require('axios');
const cache = {};

app.use(morgan('dev'));
// When making calls to the OMDB API make sure to append the '&apikey=8730e0e' parameter
app.get('/', (req, res) => {
    if (req.query.i) {
        if (cache.hasOwnProperty(req.query.i)) {
            res.json(cache[req.query.i]);
        } else {
        axios.get(`http://www.omdbapi.com/?apikey=8730e0e&i=${req.query.i}`)
            .then(response => {
                cache[req.query.i] = response.data; 
                res.json(cache[req.query.i]);
            })
            .catch(error => {
                res.status(200).json(cache[req.query.i]);
                console.log(req.query.i);
                console.log(error.response.data);
                console.log(error.response.status);
            }); 
        }
    } else if (encodeURIComponent(req.query.t)) {
        if (cache.hasOwnProperty(encodeURIComponent(req.query.t))) {
            res.json(cache[encodeURIComponent(req.query.t)]);
        } else {
            axios.get(`http://www.omdbapi.com/?apikey=8730e0e&t=${encodeURIComponent(req.query.t)}`)
            .then(response => {
                cache[encodeURIComponent(req.query.t)] = response.data;
                res.json(cache[encodeURIComponent(req.query.t)]);
            })
            .catch(error => {
                res.status(200).json(cache[encodeURIComponent(req.query.t)]);
                console.log(encodeURIComponent(req.query.t));
                console.log(error.response.data);
                console.log(error.response.status);
            }); 
        }
    }
});

module.exports = app;