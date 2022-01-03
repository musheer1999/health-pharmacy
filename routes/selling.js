const router = require('express').Router();
let Sell = require('../models/selling.model');
let Stock = require('../models/stock.model');

router.route('/add').post((req, res) => {
 console.log("running sellng")
  const name = req.body.name;
  const  price = req.body.price;
  const qty = req.body.qty;
  const date = req.body.date;
  
  
  Stock.findOne({
    name: req.body.name
}, function(err, stock) {
    if (stock) {
      
        stock.qty =stock.qty - req.body.qty

        if(stock.qty>=0){
        const newSell = new Sell({name,price,date,qty});
        newSell.save()
          .then(() => res.json('Product Sold!'))
          .catch(err => res.status(400).json('Error: ' + err));
}else{
  res.json("no available stock");
}

    } else {
        res.json("no available stock");
    }
})
  
  

});


router.route('/').get((req,res)=>{
 
  Sell.find()
  .then(product=>res.json(product))
  .catch(err=>res.status(400).json('Error'+err));
})





module.exports = router;