import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios'
import Table from 'react-bootstrap/Table'
import C from '../resources/values'

const Prod = props=>(
 
    <tr>
    
        <td >
            {props.stock.name}
        </td>
        <td>
        {props.stock.qty}
        </td>
        <td>
        {props.stock.price}
        </td>
        <td>
        {props.stock.date.substring(0,10)}
        </td>
        
    </tr>
)


export default class ProductList extends Component {

constructor(props){
    super(props);

    this.state = {sell:[]};
}

componentDidMount(){
    axios.get(C.SERVER_CALL + '/selling/')
    .then(res=>{

       let data = res.data;
       data.reverse()
     
        this.setState({sell:res.data})
    }).catch((err)=>{
        console.log(err);
    })

}




StockList(){
    return this.state.sell.map(currentstock=>{
        return <Prod stock={currentstock}  key={currentstock._id}/>
    })
}

render(){

    return(
        <div>
        <h3 style={{textAlign:"center"}}>Total Sell</h3>
        <Table striped bordered hover className="table">
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            { this.StockList() }
          </tbody>
        </Table>
      </div>
    )
}

}