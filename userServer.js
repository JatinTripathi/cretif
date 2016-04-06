var express=require('express');
var path=require('path');
var session=require('express-session');
var cookieParser=require('cookie-parser');


var userApp=express();
userApp.use(cookieParser());
userApp.set('views',path.join(__dirname,'views'));
userApp.set('view engine','jade');
userApp.use(session({
  
}));


userApp.get('/',function(req,res){
  res.render('userLogin');
});

userApp.get('/home',function(req,res){
  res.render('userHome',{});
});

userApp.post('/login',function(req,res){
  
})