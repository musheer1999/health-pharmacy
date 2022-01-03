import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";
import Developer from "./components/developer.component"
import Navbar from "./components/navbar.component"
import AddProduct from  "./components/addproduct.component"
import ProductList from  "./components/list.component"
import Sell from  "./components/sell.component"
import Selling from  "./components/totalsell.component"
import Edit from "./components/productedit.component"
import Analyse from "./components/analyse.component"
import SellerList from "./components/sellerlist.component"
import Stock from  "./components/stock.component"
import Bill_list from "./components/bill_list.component"
import Demand from './components/demand.component';
function App() {
  return (
    <Router>
    <div >
        <Navbar />
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        

    <Route path="/" exact component={ ProductList }></Route>
    <Route path="/add" component={ AddProduct }></Route>
    <Route path="/analyse/:name" component={Analyse}></Route>
    <Route path="/sellerlist/:name" component={SellerList}></Route>
    <Route path="/bill/:bill" component={Bill_list}></Route>
    <Route path="/edit/:id" component={ Edit }></Route>
    <Route path = "/sell" component={Sell}></Route>
    <Route path = '/stock' component={Stock}></Route>
    <Route path = '/selling' component={Selling}></Route>
    <Route path = '/demand' component={Demand}></Route>
    <Route path='/developer' component={Developer}></Route>
      </div>
      </Router>
  );
}

export default App;
