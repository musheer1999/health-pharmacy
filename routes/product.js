const router = require('express').Router();
let Product = require('../models/product.model');

// router.route('/').get((req, res) => {
//   Product.find()
//     .then(Products => res.json(Products))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

router.route('/add').post((req, res) => {
 
  const name = req.body.name;
  const Sellername = req.body.Sellername;
  const  Billno = req.body. Billno;
  const costprice = req.body.costprice;
  const MRP = req.body.MRP;
  const GST = req.body.GST;
  const expirydate  = req.body.expirydate;
  const QTY = req.body.QTY;
  const date = req.body.date;
  const newProduct = new Product({name,Sellername,Billno,costprice,MRP,GST,expirydate,date,QTY});

  newProduct.save()
    .then(() => res.json('Product added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/').get((req,res)=>{
 
  Product.find()
  .then(product=>res.json(product))
  .catch(err=>res.status(400).json('Error'+err));
})

router.route('/:id').delete((req,res)=>{
  Product.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/:id').get((req,res)=>{
  console.log(req.params.id)
  Product.findById(req.params.id)
    .then((product) => res.json(product))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/update/:id').post((req,res)=>{
  console.log(req.body)
  Product.findById(req.params.id)
  .then(product=>{
    product.name = req.body.name;
    product.Sellername = req.body.Sellername;
    product.Billno = req.body. Billno;
    product.costprice = req.body.costprice;
    product.MRP = req.body.MRP;
    product.GST = req.body.GST;
    product.expirydate  = req.body.expirydate;
    product.QTY = req.body.QTY;
    product.date = req.body.date;
  
  
    product.save()
    .then(()=>res.json('Product Update'))
    .catch(err=>res.status(400).json('Error '+err))
  })
})



module.exports = router;