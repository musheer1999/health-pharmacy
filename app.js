const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
const port  = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

if(process.env.NODE_ENV==="production"){
  app.use(express.static("client/build"))
}


app.listen(port,()=>{
    console.log(`server is running on port : ${port}`)
})


const productRouter = require('./routes/product');
const stockRouter = require('./routes/stock');
const sellingRoutes = require('./routes/selling')
const demandRoutes = require('./routes/demand')
 app.use('/api/product', productRouter);
app.use('/api/stock',stockRouter);
app.use('/api/selling',sellingRoutes)
app.use('/api/demand',demandRoutes);