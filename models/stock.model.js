const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StockSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
 qty:{
     type: Number,
     required:true,
 }

}, {
  timestamps: true,
});

const Stock = mongoose.model('Stock', StockSchema);

module.exports = Stock;