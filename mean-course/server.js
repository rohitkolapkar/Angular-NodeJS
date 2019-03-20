const winston=require('winston');
const express=require('express');
const app=express();

process.env['NODE_CONFIG_DIR'] ='./backend/config';

require('./backend/startup/logging')();
require('./backend/startup/routes')(app);
require('./backend/startup/db')();
require('./backend/startup/config')();
require('./backend/startup/prod')(app);


const port=process.env.PORT || 3000;
const server = app.listen(port,()=>winston.info(`Server is listening on port: ${port}`));
module.exports = server;