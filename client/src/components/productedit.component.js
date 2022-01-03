import React,{ Component} from 'react';
import Axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
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
this.onSubmit = this.onSubmit.bind(this);


this.state={
        name:'',
        sellername:'',
        billno:'',
        MRP:0,
        Costprice:0,
        date: new Date(),
        expirydate: new Date(),
        gst:0,
        quantity:0
    }

}


componentDidMount(){


    console.log("rerendered");
axios.get(C.SERVER_CALL + '/product/'+this.props.match.params.id)
.then(response=>{
    console.log(response.data);
    this.setState({
        name:response.data.name,
        sellername:response.data.Sellername,
        billno:response.data.Billno,
        MRP:response.data.MRP,
        Costprice:response.data.costprice,
        gst:response.data.GST,
        quantity:response.data.QTY,
       date: new Date(response.data.date),
       expirydate: new Date(response.data.expirydate)
    })
})
}


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

onchangename(name){
    this.setState({
       name:name.target.value
    })
console.log(this.state.name)
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
    console.log(Product)

    Axios.post(C.SERVER_CALL + '/product/update/'+this.props.match.params.id, Product)
    .then(res=> console.log(res.data))

    window.location.href = 'https://healthcare-pharmacy.herokuapp.com/';
}

render(){
    return(
<div className="container">
    <h3>Add new Product</h3>
    <form onSubmit={this.onSubmit}>
<div className="form-group">
    <label>Name</label>
    <input  type="text" required className="form-control" value={this.state.name} onChange={this.onchangename} ></input>
</div>
<div className="form-group">
    <label>SellerName</label>
    <input type="text" required className="form-control" value={this.state.sellername} onChange={this.onchangesellername} ></input>
</div>
<div className="form-group">
    <label>Bill-No</label>
    <input type="text" required className="form-control" value={this.state.billno} onChange={this.onchangebillno} ></input>
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
    <label>Quantity</label>
    <input type="text" required className="form-control" value={this.state.quantity} onChange={this.onchangeqty} ></input>
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
<input type="submit" value="EDIT" className="btn btn-primary"></input>
</div>
    </form>
</div>

    );
}

}


