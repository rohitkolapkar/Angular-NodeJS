require('express-async-errors');
const winston=require('winston');
//require('winston-mongodb');

module.exports=function(){

    //for errors in sync code 
    winston.handleExceptions(
        new winston.transports.File({ filename:'uncaughtExceptions.log'}),
        // new winston.transports.MongoDB({
        //     db:'mongodb://localhost/vidly',
        //     level:'debug'
        // })
    )

    //for errors in async code
    process.on('unhandledRejection',(ex)=>{
        throw ex;
    });

    winston.add(winston.transports.File,{filename:'logfile.log'});
    // winston.add(winston.transports.MongoDB,{
    //     db:'mongodb://localhost/vidly',
    //     level:'debug'
    //     //error
    //     //warn
    //     //info
    //     //verbose
    //     //silly
    // });

}