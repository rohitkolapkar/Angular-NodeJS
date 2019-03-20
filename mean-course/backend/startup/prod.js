const helmet = require('helmet');
const compression=require('compression');
//const bodyParser=require('body-parser');

module.exports=function(app){
    app.use(helmet());
    app.use(compression());
    //parsing body of post request
    //app.use(bodyParser.json());
}