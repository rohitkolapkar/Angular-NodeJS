require('express-async-errors');
const winston=require('winston');


module.exports=function(){

    //for errors in sync code 
    winston.handleExceptions(
        new winston.transports.File({ filename:'uncaughtExceptions.log'}),

    )

    //for errors in async code
    process.on('unhandledRejection',(ex)=>{
        throw ex;
    });

    winston.add(winston.transports.File,{filename:'logfile.log'});


}