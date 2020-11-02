const express = require('express');
const fs =require('fs');
const path= require('path');
const router = express.Router();
const carsdb = require('../db/carsdb.json')
const inLoggedIn = require('../util/authMiddelware');


router.get('/',(req, res) =>{
    res.render('cars/index',{cars:carsdb});
});
router.get('/new',(req, res) =>{
    res.render('cars/new')
});

router.get('/new',(req, res) =>{
    res.render('/cars')
});

module.exports = router;