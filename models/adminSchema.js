var mongo=require('mongoose');

module.exports=mongo.model('admins',{
    email:'string',
    password:'string'
});