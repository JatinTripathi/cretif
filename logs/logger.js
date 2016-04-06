var winston=require('winston');
winston.emitErrs=true;

var logger=new (winston.Logger)({
    transports:[
        new (winston.transports.Console)({
            timestamp:true,
            level:'info',
            handleExceptions:true,
            colorize:true

        }),
        new (winston.transports.File)({
            timestamp:true,
            level:'info',
            handleExceptions:true,
            colorize:true,
            filename:'./logs/logfiles.log'
        })],
    exitonErrors:false
    });

module.exports=logger;
module.exports.stream={
    write:function(message,encoding){
        logger.info(message);
    }
};