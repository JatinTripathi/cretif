var mongo=require('mongoose');

module.exports=mongo.model('schools',{
    email:'string',
    password:'string',
    schoolName:'string',
    address:'string',
    pinCode:'string',
    phoneNo:'string',
    buses:'string',
    students:'string'
});