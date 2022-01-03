import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios'
import DatePicker from 'react-datepicker';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button'
import './styling/addProduct.css';
import C from '../resources/values'
export default class Sell extends Component{
constructor(props){
super(props);


this.onchangedate = this.onchangedate.bind(this);
this.onchangename = this.onchangename.bind(this);
this.onchangeqty = this.onchangeqty.bind(this);
this.onchangeprice = this.onchangeprice.bind(this);
this.onSubmit = this.onSubmit.bind(this);

this.state={
    name:'',
    qty:'',
    price:null,
    date: new Date(),
    alert:'none',
    sucess:'none',
    data:[],
    suggestions:[],
}
}

componentDidMount(){
    axios.get(C.SERVER_CALL + '/product/')
    .then(res=>{
       let array=[];

       for(let i=0;i<res.data.length;i=i+1)
       {
           array[i]= res.data[i].name
       }

        this.setState({data:array})
        console.log(this.state.data)

    }).catch((err)=>{
        console.log(err);
    })
}



//suggestion start
onchangename(name){
    const value = name.target.value;
    let item = this.state.data;
    let items = [...new Set(item)];
    let suggestions = [];
    if(value.length>0){
        const regex = new RegExp(`^${value}`,'i');
        suggestions = items.sort().filter(v=>regex.test(v));
       
    }

    this.setState({
       name:name.target.value,
       suggestions,
    })
console.log(this.state.name)
}


suggestionSelected(value){
  
    this.setState(()=>({
        name:value,
        suggestions:[],
    }))
}

renderSuggestions(){
    const {suggestions} =this.state;

    if(suggestions.length===0){
        return null;
    }

    return(
        <ul>
            {suggestions.map((item)=><li onClick={()=>this.suggestionSelected(item)}>{item}</li>)}
        </ul>
    )

}


//suggestion end

onchangeqty(qty){
    this.setState({
        qty:qty.target.value
    })

}

onchangedate(date){
    console.log(date)
    console.log(this.state.date)
    this.setState({
        date:date
    })

}

onchangeprice(price){
    this.setState({
        price:price.target.value
    })

}





onSubmit(e)
{
    e.preventDefault();
    const Sell = {
        name:this.state.name.toUpperCase(),
        qty:this.state.qty,
        price:this.state.price,
        date:this.state.date
    }
    console.log(Sell);
axios.post(C.SERVER_CALL +'/selling/add',Sell)
.then(res=>console.log(res.data));

axios.post(C.SERVER_CALL + '/stock/sell',Sell)
.then(res=>{
    if(res.data==='no available stock'){
        this.setState({
            alert:'block'
        })

        setTimeout(()=>{
            this.setState({
               alert:'none' 
            })
            },4000)
    }else{
        this.setState({
            sucess:'block'
        })

        setTimeout(()=>{
            this.setState({
                sucess:'none' 
            })
            },4000)
    }

    this.setState({
        name:'',
        qty:'',
        price:0,
    })
    console.log(this.state.price)
});
axios.post(C.SERVER_CALL + "/demand/add",Sell)

}

    render(){
        return(
          <div className="container">
              <h3 style={{textAlign:"center"}}>Sell Your Product</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <div className="AutoCompleteText">
                        <input value={this.state.name} type="text"  onChange={this.onchangename} required className="form-control"></input>
                        {this.renderSuggestions()}
                </div>
                    </div>
             
                    <div className="form-group">
                        <label>Quantity</label>
                        <input value={this.state.qty} type="text"  onChange={this.onchangeqty}  required className="form-control"></input>
                    </div>

                    <div className="form-group">
                        <label>Price</label>
                        <input value={this.state.price} type="text"  onChange={this.onchangeprice} required className="form-control"></input>
                    </div>
                    <div className="form-group">
    <label>Date</label>
    <div>
    <DatePicker
           required
           selected={this.state.date}
           onChange={this.onchangedate}
            />
    </div>
</div>
<div className="form-group">
<input type="submit" value="Sell" className="btn btn-primary"></input>
</div>
                </form>
                
         {       [

  'danger',
].map((variant, idx) => (
   
  <Alert style={{display:this.state.alert,textAlign:"center",marginTop:"50px"}} key={idx} variant={variant}>
   The product is not available in required quantity
  </Alert>
))}
  {       [

'success',
].map((variant, idx) => (
 
<Alert style={{display:this.state.sucess,textAlign:"center",marginTop:"50px"}} key={idx} variant={variant}>
 Product Sold
</Alert>
))}
          </div>
        );
    }



}