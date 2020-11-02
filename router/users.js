const express = require('express');
const fs =require('fs');
const path= require('path');
const router = express.Router();
const inLoggedIn = require('../util/authMiddelware');
// const usersDb = fs.readFileSync('./db/readFile.json','utf8');
const usersDb = require('../db/readFile.json');


router.get('/sign-in',(req,res) => {
    res.render('auth/sign-in',{title:'Sign In Page'});
    
});


router.post('/sign-in',(req,res) => {
    const {email, password} = req.body;
    
    const foundUser = usersDb.find(user => user.email ==email && user.password == password);

    if(foundUser){
        req.session.admin = true;
        req.session.user = foundUser.email;
        req.session.user = foundUser.name;
        req.session.user = foundUser.famliy;
        res.render('index',{admin:true, title:'Success page',})
    } else {
        res.send('Uzur bunady foydlanuchi yuq')
    }
});

router.get('/sign-up',(req,res) => {
    const {email, password,age} = req.body;
    const myjson = JSON.stringify(email,password,age);
    console.log(myjson)
    res.render('auth/sign-up',{title:'Sign-up In Page'});
});

router.get('/profile', inLoggedIn, (req,res) => {
    res.render('profile',{email:req.session.user,name:''} );
});

router.get('/create', (req,res) => {
    usersDb.push(req.body)
    res.render('create',{email:req.session.user})
})


router.post('/sign-up',(req,res) => {
    // const {admin,password,age}= (req.body);
    usersDb.push(req.body);
    fs.writeFile(path.join(__dirname,'db/readFile.json'), JSON.stringify(usersDb),(err) =>console.log(err,'error message'));
    req.session.admin =true;
    req.session.user =req.body.email;
    res.redirect('/sign-in');
});

router.get('/log-out',(req,res) => {
req.session.admin =false;
req.session.user =null;
res.redirect('/');
});

module.exports = router;