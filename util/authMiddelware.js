module.exports = (req,res,next) =>{
    const {admin, user}= req.session;
    console.log(req.session);
    
    if(admin && user){
        next()
    }else{
    res.render('sign-in')
    }

}