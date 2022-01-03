const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  Sellername:{
    type: String,
    required:true,

  },
  Billno:{
    type:String,
    required:true
  },
  costprice:{
    type:Number,
    required:true
  },
  MRP:{
    type:Number,
    required:true
  },
  GST:{
    type:Number,
    required:true
  },
  QTY:{
    type:Number,
    required:true
  },
  expirydate:{
    type:Date,
    required:true
  },  
  date:{
    type:Date,
    required:true
  }

}, {
  timestamps: true,
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;