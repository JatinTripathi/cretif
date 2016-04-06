var localStrategy=require('passport-local').Strategy;
var admins=require('../models/adminSchema');
var bcrypt=require('bcrypt-nodejs');

module.exports=function(passport,logger){
passport.use('adminLogin',
    new localStrategy({passReqToCallback:true,
            usernameField:'email',
            passwordField:'password'},
        function(req,email,password,done){
            admins.findOne({'email':email},function(err,admin){
                
               if(err) logger.debug('Some error in surfing IDs');
               
               if(!admin){
                  logger.error('Wrong ID punched');
                  return done(null,false,req.flash(('message','Invalid ID')));
                }
               if(!isValidPassword(admin,password)){
                  logger.error('Invalid Password');
                  return done(null,false,req.flash('message','Invalid Password'));
                }
               return done(null,admin);
               }
            );
        }));
         
         
        var isValidPassword=function(admin,password){
            logger.info('Encrypting Password');
        return bcrypt.compareSync(password,admin.password);
    };
};