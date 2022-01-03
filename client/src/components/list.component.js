import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios'
import Prod from './tab.component'
import Table from 'react-bootstrap/Table'
import C from '../resources/values'


export default class ProductList extends Component {

constructor(props){
    super(props);
this.deleteProduct = this.deleteProduct.bind(this)
    this.state = {products:[]};
}

componentDidMount(){
    axios.get(C.SERVER_CALL + '/product/')
    .then(res=>{
        let array = res.data;
        array.reverse()
        this.setState({products:array})
    }).catch((err)=>{
        console.log(err);
    })
    console.log(this.state.products)
}


deleteProduct(id,name) {
    console.log(id);
    if(window.confirm('Are you sure wants to delete ' + name)){
      axios.delete(C.SERVER_CALL + '/product/'+id)
      .then(response => { console.log(response.data)})
      .catch((err)=>{
          console.log(err);
      });

    this.setState({
      products: this.state.products.filter(el => el._id !== id)
    })
    }
   
  }

ProductList(){
    return this.state.products.map(currentproduct=>{
        return <Prod products={currentproduct} deleteProduct={this.deleteProduct} key={currentproduct._id}/>
    })
}

render(){

    return(
        <div>
        <h3 style={{textAlign:"center"}}>All Products</h3>
        <Table striped bordered hover className="table">
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
              <th>Date</th>
              <th> Expiry Date</th>
            </tr>
          </thead>
          <tbody>
            { this.ProductList() }
          </tbody>
        </Table>
      </div>
    )
}

}