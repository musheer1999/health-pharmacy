const router = require('express').Router();
let Demand = require('../models/demand.model');



router.route('/add').post((req, res) => {

 const name = req.body.name;
 Demand.findOne({
     name:req.body.name
 },function(err,product){
    console.log("running sellng")
     if(product){
product.demand = parseInt(product.demand) + 1;
product.save()
.then(()=>res.json("demand updated"))
.catch(err=>res.json(400).json('Error : '+err))
     }else{
         console.log("not found demand")
         let d=1;
const newDemand = new Demand({name,d});
newDemand.save()
.then(() => res.json(' new Demand added'))
                .catch(err => res.status(400).json('Error: ' + err));

     }
 })

});


router.route('/').get((req,res)=>{
 
  Demand.find()
  .then(product=>res.json(product))
  .catch(err=>res.status(400).json('Error'+err));
})





module.exports = router;