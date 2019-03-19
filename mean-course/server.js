const winston=require('winston');
const express=require('express');
const app=express();

require('./backend/startup/logging')();
require('./backend/startup/routes')(app);
require('./backend/startup/prod')(app);

const port=process.env.PORT || 3000;
const server = app.listen(port,()=>winston.info(`Server is listening on port: ${port}`));
module.exports = server;