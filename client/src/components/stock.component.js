import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios'
import Table from 'react-bootstrap/Table'

import C from '../resources/values'

const Prod = props=>(
 
    <tr style={{backgroundColor:props.stock.qty<5?"lightpink":props.stock.qty>30?"lightgreen":"#fdfd96"}}>
    
        <td >
            {props.stock.name}
        </td>
        <td>
        {props.stock.qty}
        </td>
       
        
    </tr>
)


export default class ProductList extends Component {

constructor(props){
    super(props);

    this.state = {stock:[]};
}

componentDidMount(){
    axios.get(C.SERVER_CALL + '/stock/')
    .then(res=>{

        let array  = res.data;
        array.sort((a,b)=>{
            return a.qty- b.qty
        })
        this.setState({stock:array})
    }).catch((err)=>{
        console.log(err);
    })
    console.log(this.state.products)
}




StockList(){
    return this.state.stock.map(currentstock=>{
        return <Prod stock={currentstock}  key={currentstock._id}/>
    })
}

render(){

    return(
        <div>
        <h3 style={{textAlign:"center"}}>Stock</h3>
        <Table striped bordered hover className="table">
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>Qty</th>
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