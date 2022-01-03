const router = require('express').Router();
let Stock = require('../models/stock.model');


router.route('/').get((req,res)=>{

    Stock.find()
    .then(stock=>res.json(stock))
    .catch(err=>res.json(400).json('Error : '+err))
})

router.route('/add').post((req, res) => {
    console.log("running")
    const name = req.body.name;
    const qty = req.body.qty;

    Stock.findOne({
        name: req.body.name
    }, function(err, stock) {
        if (stock) {
            stock.qty =parseInt(stock.qty) + parseInt(req.body.qty)
            stock.save()
                .then(() => res.json("stock updated"))
                .catch(err => res.json(400).json('Error : ' + err));

        } else {
            const newStock = new Stock({
                name,
                qty
            });
            newStock.save()
                .then(() => res.json(' new Stock added'))
                .catch(err => res.status(400).json('Error: ' + err));

        }
    })


})

router.route('/sell').post((req, res) => {
    console.log("running")
    const name = req.body.name;
    const qty = req.body.qty;

    Stock.findOne({
        name: req.body.name
    }, function(err, stock) {
        if (stock) {
            stock.qty =stock.qty - req.body.qty
            if(stock.qty===0){
                  stock.remove();
            }else if(stock.qty<0){
                console.log("no available running")
                res.json("no available stock");

            }else{

            stock.save()
                .then(() => res.json("stock updated"))
                .catch(err => res.json(400).json('Error : ' + err));
            }

        } else {
            console.log("no available22 running")
            res.json("no available stock");
        }
    })


})




module.exports = router;