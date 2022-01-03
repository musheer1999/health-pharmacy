import React,{ Component} from 'react';
import {Link} from 'react-router-dom';
import C from '../resources/values'
const Prod = props=>(
 
    <tr>
        <td>
        <Link to={"/analyse/"+props.products.name}>  {props.products.name}</Link>
        </td>
        <td>
        <Link to={"/sellerlist/"+props.products.Sellername}>       {props.products.Sellername}</Link>
        </td>
        <td>
        <Link to={"/bill/"+props.products.Billno}>           {props.products.Billno}</Link>
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
        <td>
        {props.products.date.substring(0,10)}
        </td>
        <td>
        {props.products.expirydate.substring(0,10)}
        </td>
        <td>
        <Link to={"/edit/"+props.products._id}>edit</Link> | <a href="#" onClick={() => { props.deleteProduct(props.products._id,props.products.name) }}>delete</a>
    </td>
    
        
    </tr>
)

export default Prod