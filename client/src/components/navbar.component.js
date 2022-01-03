import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './styling/nav.css';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Offcanvas from 'react-bootstrap/Offcanvas'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import C from '../resources/values'
export default class Navbars extends Component {

  render() {
    return (
      <Navbar fixed="top" className="nav" expand="sm"  bg="light" expand={false}>
      <Container fluid>
        <Navbar.Brand style={{color:"white"}} href="/">Health Care Pharmacy</Navbar.Brand>
       <Nav className="me-auto">
       <Button> <Link to="/sell" ><div>Sell</div></Link></Button> 
       </Nav>
        <Navbar.Toggle aria-controls="offcanvasNavbar" />
        <Navbar.Offcanvas  className="off"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
        >
          <Offcanvas.Header  closeButton>
            <Offcanvas.Title style={{color:"white"}} id="offcanvasNavbarLabel">Health Care Pharmacy</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body >
            <Nav className="justify-content-end flex-grow-1 pe-3" >
            <Link  to="/" className="nav-link">All Medicine</Link>
            <Link to="/add" className="nav-link">Add New Product</Link>
            <Link to="/sell" className="nav-link">Sell</Link>
            <Link to="/stock" className="nav-link">Stock</Link>
            <Link to="/selling" className="nav-link">Total Sale</Link>
            <Link to="/demand" className="nav-link">Demand</Link>
          
            </Nav>
            <div className="developer"> <Link to="/developer"> Developed By</Link></div>
           
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
    );
  }
}