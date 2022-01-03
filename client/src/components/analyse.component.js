import React,{ Component} from 'react';
import Axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import C from '../resources/values'


const Prod = props=>(
 
    <tr>
        <td>
         {props.products.name}
                 </td>
        <td>
            {props.products.Sellername}
        </td>
        <td>
            {props.products.Billno}
        </td>
        <td>
            {props.products.MRP}
        </td>
        <td>
            {props.products.costprice}
        </td>
        <td>
            {props.products.GST}
        </td>
        <td>
        {props.products.QTY}
        </td>
        <td>
        {(props.products.QTY*props.products.costprice*props.products.GST)/100+props.products.QTY*props.products.costprice}
        </td>
       
        
    </tr>
)




export default class AddProduct extends Component {

constructor(props){
    super(props);





this.state={
     data:[],
     max:"",
     name:""
    }

}


componentDidMount(){
console.log(this.props.match.params.name)


this.setState({
    name:this.props.match.params.name
})

Axios.get(C.SERVER_CALL + '/product/')
.then(response=>{
    var temp = []
    response.data.map(el=>{

        if(el.name==this.props.match.params.name){
            temp.push(el)
        }

    })

    this.setState({
        data:temp,
    })
    var temp2=temp[0].costprice;
 
    let name=temp[0].Sellername;
    for(let i=0;i<temp.length;i=i+1)
    {
      if(temp2>temp[i].costprice){
          temp2=temp[i].costprice
          name=temp[i].Sellername
          console.log(name)
      }
    }

    this.setState({
        max:name
    })
    console.log(this.state.max)

    console.log(this.state.data)
})

}


Medicine(){
    return this.state.data.map(currentproduct=>{
        return <Prod products={currentproduct} key={currentproduct._id} />
    })
}




render(){
    return(
<div className="container">
    
    <h3 style={{float:"center"}}>{this.state.name}</h3>
    <br/><br/>
    <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>Seller Name</th>
              <th>Bill no</th>
              <th>MRP</th>
              <th>Rate</th>
              <th>GST</th>
              <th>Quantity</th>
              <th>Net Price</th>
            </tr>
          </thead>
          <tbody>
              {this.Medicine()}
          </tbody>
        </table>
        <div>

            the best seller is  : {this.state.max}
        </div>
</div>

    );
}

}


