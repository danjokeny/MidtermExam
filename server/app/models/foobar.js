//Database require
var mongoose = require('mongoose');


//Database Schema
var Schema = mongoose.Schema;
var FooBarSchema = new Schema({
  Foo: { type: String, require:true },
  Woo: {type:StriNumber },
  DateDue: { type: Date, default: Date.now }
});


//Database Connection
module.exports =
  mongoose.model('FooBar', FooBarSchema);