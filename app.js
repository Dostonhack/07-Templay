const express = require('express');
const app = express();
var path = require('path');
const userRouter = require('./router/users');
const carsRouter =require('./router/cars')
const session = require('express-session');
const port = 3000;

app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views'));

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret:';lkjfaskdfjpqekjfnpiwuenfdvnudnfvwe',
    resave:false,
    saveUninitialized:true,
}));
app.use((req,res,next) =>{
    res.locals.admin =req.session.admin || false
    res.locals.user =req.session.user || ''
    res.locals.doston= 'Eliboyev'
    res.locals.title =req.url.slice(1).toLocaleUpperCase() || ''
    next()
})
app.use(userRouter);
app.use('/cars',carsRouter);

app.get('/', (req, res) => {
    const isLoggerIn = req.session.admin;
    res.render('index',{title:'Home Page', admin:isLoggerIn, data: [{id:1,name:'Bobo'}] });
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
module.exports =app;
