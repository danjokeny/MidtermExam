//config.js module

var path = require('path'),    
       rootPath = path.normalize(__dirname + '/..'),    
       env = process.env.NODE_ENV || 'development';

var config = {  
       development: {    
                   root: rootPath,    
                   app: {      name: 'FooBar'    },    
                   port: 3300,  
                   db: 'mongodb://127.0.0.1/FooBar'

         }};

module.exports = config[env];