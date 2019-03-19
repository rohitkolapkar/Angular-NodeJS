const error=require('../middleware/error');
const home=require('../routes/home');
const express=require('express');



module.exports = function(app){
    
    app.use(express.json());

    app.use('/',home);
    app.use(error);

}