const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SellSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
 qty:{
     type: Number,
     required:true,
 },
 price:{
    type: Number,
    required:true,
 },
 date:{
     type:Date,
     required:true,
 }

}, {
  timestamps: true,
});

const Sell = mongoose.model('Sell', SellSchema);

module.exports = Sell;