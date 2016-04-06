var localStrategy=require('passport-local').Strategy;
var schools=require('../models/schoolSchema');
var bCrypt=require('bcrypt-nodejs');


module.exports=function(passport,logger){

    passport.use('newSchool',new localStrategy({usernameField:'email',passwordField:'password',passReqToCallback:true},function(req,email,password,done){
        
        var findOrCreateUser=function(){
            schools.findOne({'email':email},function(err,school){
                if(err) throw err;
                if(school){
                    logger.info('Repeated Email ID');
                    return done(null,false,req.flash('message','User already exist'));
                }
                else{
                    var newSchool=new schools();
                    newSchool.email=email;
                    newSchool.password=createHash(password);
                    newSchool.firstName=req.body.firstName;
                    newSchool.lastName=req.body.lastName;
                       
                    newSchool.save(function(err){
                        if(err) throw err;
                        logger.info('New Signup');
                        return done(null,newSchool);
                    });
                }
            });
        };
     
        process.nextTick(findOrCreateUser);

    }));

/*PASSWORD ENCRYPTION*/
    var createHash=function(password){
        return bCrypt.hashSync(password,bCrypt.genSaltSync(10),null);
    };

};