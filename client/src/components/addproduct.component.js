import React,{ Component} from 'react';
import Axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Suggestions from './Suggestions.component'
import axios from 'axios';
import { Container } from 'react-bootstrap';
import './styling/addProduct.css';
import C from '../resources/values'
export default class AddProduct extends Component {

constructor(props){
    super(props);
this.onchangedate = this.onchangedate.bind(this);
this.onchangeexpirydate = this.onchangeexpirydate.bind(this);
this.onchangename = this.onchangename.bind(this);
this.onchangesellername =this.onchangesellername.bind(this);
this.onchangecost = this.onchangecost.bind(this);
this.onchangebillno = this.onchangebillno.bind(this);
this.onchangemrp = this.onchangemrp.bind(this);
this.onchangeqty = this.onchangeqty.bind(this);
this.onchangegst = this.onchangegst.bind(this);

this.check = this.check.bind(this);
this.onSubmit = this.onSubmit.bind(this);


this.state={
        name:'',
        sellername:'',
        billno:'',
        MRP:null,
        Costprice:null,
        date: new Date(),
        expirydate: new Date(),
        gst:null,
        quantity:null,
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

// suggestion code start

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




// suggestion code end






onchangedate(date){
    console.log(date)
    console.log(this.state.date)
    this.setState({
        date:date
    })

}

onchangeexpirydate(date){
    this.setState({
        expirydate:date
    })

}





onchangesellername(seller){
    this.setState({
        sellername:seller.target.value
    })

}

onchangemrp(mrp){
    this.setState({
        MRP:mrp.target.value
    })

}
onchangeqty(qty){
    this.setState({
        quantity:qty.target.value
    })

}
onchangecost(cost){
    this.setState({
        Costprice:cost.target.value
    })

}
onchangebillno(bill){
    this.setState({
        billno:bill.target.value
    })
}

onchangegst(gst){
    this.setState({
        gst:gst.target.value
    })
}

check(e){
  
    this.setState({
        ch:e.target.value
    })
    console.log(this.state.ch)
}

onSubmit(e){
   
    e.preventDefault();
    const Product = {
        name : this.state.name.toUpperCase(),
        Sellername : this.state.sellername.toUpperCase(),
        MRP : this.state.MRP,
        costprice: this.state.Costprice,
        Billno: this.state.billno.toUpperCase(),
        expirydate : this.state.expirydate,
        date: this.state.date,
        GST:this.state.gst,
        QTY: this.state.quantity
    }

    const Stock = {
        name : this.state.name.toUpperCase(),
        qty: this.state.quantity
    }


    Axios.post(C.SERVER_CALL + '/product/add', Product)
    .then(res=> console.log(res.data))

    Axios.post(C.SERVER_CALL + '/stock/add',Stock)
    .then(res=>console.log(res.data));


    
    this.setState({
        name:'',
        MRP:0,
        Costprice:0,
        expirydate: new Date(),
        gst:0,
        quantity:0

    })
}

render(){
    return(
<div className="container">
    <h3 style={{textAlign:"center"}}>Add new Product</h3>
    <form onSubmit={this.onSubmit}>
    <div className="form-group">
    <label>SellerName</label>
    <input type="text" required className="form-control" value={this.state.sellername} onChange={this.onchangesellername} ></input>
</div>

<div className="form-group">
    <label>Bill-No</label>
    <input type="text" required className="form-control" value={this.state.billno} onChange={this.onchangebillno} ></input>
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
<br></br>
<br></br>
<br></br>
<div className="form-group">
  
    <label>Name</label>
    <div className="AutoCompleteText">
    <input  type="text" required className="form-control" value={this.state.name} onChange={this.onchangename} ></input>
    {this.renderSuggestions()}
    </div>
</div>
<div className="form-group">
    <label>Quantity</label>
    <input type="text" required className="form-control" value={this.state.quantity} onChange={this.onchangeqty} ></input>
</div>

<div className="form-group">
    <label>MRP</label>
    <input type="text" required className="form-control" value={this.state.MRP} onChange={this.onchangemrp} ></input>
</div>
<div className="form-group">
    <label>Rate</label>
    <input type="text" required className="form-control" value={this.state.Costprice} onChange={this.onchangecost} ></input>
</div>
<div className="form-group">
    <label>GST</label>
    <input type="text" required className="form-control" value={this.state.gst} onChange={this.onchangegst} ></input>
</div>

<div className="form-group">
    <label>Expiry Date</label>
    <div>
    <DatePicker
    required
 selected={this.state.expirydate}
onChange={this.onchangeexpirydate}
            />
    </div>
</div>
<div className="form-group">
<input type="submit" value="ADD" className="btn btn-primary"></input>
</div>
    </form>
</div>

    );
}

}


