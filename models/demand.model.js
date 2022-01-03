const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DemandSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
 demand:{
     type: Number,
     required:true,
     default:1
 }

}, {
  timestamps: true,
});

const Demand = mongoose.model('Demand',DemandSchema);

module.exports = Demand;