const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');

module.exports = function() {
  const db = config.get('db')
  mongoose.connect(db)
    .then(() => winston.info(`Connected to ${db}...`));

}

//mongodb+srv://rohitkolapkar:<PASSWORD>@cluster0-aifzw.mongodb.net/angular-nodejs?retryWrites=true



