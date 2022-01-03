import React,{Component} from 'react'
import './AutoComplete.css'
import C from '../resources/values'
class AutoCompleteText extends Component{
    constructor(props){
    super(props);
    console.log(this.props.data)
    this.items= this.props.data
this.state = {
    suggestions:[],
text:''
};

}


onTextChange = (e)=>{
const value = e.target.value;
console.log(value)
let suggestions = [];
if(value.length>0){
    const regex = new RegExp(`^${value}`,'i');
    suggestions = this.items.sort().filter(v=>regex.test(v));
   
}
this.setState(()=>({
    suggestions,
    text:value
}))

}

suggestionSelected(value){
  
    this.setState(()=>({
        text:value,
        suggestions:[],
    }))

   this.props.set({
       ch:value
   })
   console.log(this.props.st)
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
    render(){
        const {text} = this.state
        return(
            <div className="AutoCompleteText">
                <input value={text} onChange={this.onTextChange} type="text"></input>
               {this.renderSuggestions()}
            </div>
        )
    }
}

export default  AutoCompleteText 