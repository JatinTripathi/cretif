var schools=require('../models/schoolSchema');
var adminStrategy=require('./adminLogin');
var schoolStrategy=require('./newSchool');


module.exports=function(passport,logger){
    passport.serializeUser(function(school,done){
        done(null,school._id);
    });

    passport.deserializeUser(function(id,done){
        schools.findById(id,function(err,school){
            if(err) throw err;
            done(err,school);
        });
    });
    
    adminStrategy(passport,logger);
    schoolStrategy(passport,logger);
};