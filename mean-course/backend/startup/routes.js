const express=require('express');
const error=require('../middleware/error');
const home=require('../routes/home');
const posts=require('../routes/posts');
const allowHeader=require('../middleware/access-control-allow-origin-header');




module.exports = function(app){
    
    app.use(express.json());

    app.use(allowHeader);
    
    app.use('/',home);
    app.use('/api/posts',posts);


    app.use(error);

}