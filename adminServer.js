var express=require('express');
var path=require('path');
var session=require('express-session');
var cookieParser=require('cookie-parser');
var bodyParser=require('body-parser');
var mongoSession=require('connect-mongo')(session);
var mongo=require('mongoose');
var passport=require('passport');
var logger=require('morgan');
var flash=require('connect-flash');
var winston=require('./logs/logger');


/*APPLICATION CONFIGURATIONS AND MIDDLEWARES*/
var adminApp=express();

adminApp.use(cookieParser());

adminApp.use(bodyParser.urlencoded({extended:false}));
adminApp.use(bodyParser.json());

adminApp.use(express.static(path.join(__dirname,'public')));
adminApp.set('views',path.join(__dirname,'adminViews'));
adminApp.set('view engine','jade');

/*adminApp.use(session({
    secret:'authentication',
    saveUninitialized:true,
    resave:true,
    store:new mongoSession({
        mongooseConnection:mongo.connection,
        db:'cretif',
        collection:'sessions',
        autoRemove:'disabled',
    })
}));
*/
adminApp.use(logger(':method :url :status :response-time ms - :res[content-length]',{'stream':winston.stream}));
adminApp.use(flash());

var passportInit=require('./passport/passportInit');
adminApp.use(passport.initialize());
adminApp.use(passport.session());
passportInit(passport,logger);


/*APPLICATION ROUTING*/
adminApp.get('/',function(req,res){
  res.render('adminHome');
});

adminApp.post('/adminLogin',passport.authenticate('adminLogin',{
  successRedirect:'/home',
  failureRedirect:'/',
  failurFlash:true}));

adminApp.get('/home',function(req,res){
  res.render('adminHome',{message:req.flash('message')});
});

adminApp.post('/newSchool',passport.authenticate('newSchool',{
  successRedirect: '/info',
  failureRedirect:'/newSchool',
  failureFlash:true}));

adminApp.get('/info',function(req,res){
    res.render('schoolInfo');
});

adminApp.get('/schoolList',function(req,res){
    res.render('schoolList');
});



module.exports = adminApp;