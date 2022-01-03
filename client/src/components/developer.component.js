import React,{Component} from 'react'
import C from '../resources/values'
import Logo from './styling/self.jpg';
import './styling/developer.css'
export default class Developer extends Component{



    render(){

        return(
            <div className="developers" >
                
                <img  src={Logo} ></img>
                     <h1 style={{alignItems:"center"}}>Musheer Ahmad</h1>
                    <h3 style={{color:"grey"}}>Full Stack Developer</h3>
            </div>
       
        )
    }



}