import React, { Component } from 'react';
var colorsys = require('colorsys');

class ColorObject extends Component {
    constructor(props){
        super(props);
        this.state = {
            locked:false,
            adjustedSat:undefined,
            adjustedHue:undefined,
            adjustedValue:this.props.value,
        }
    }

    handleLock = () =>{
        this.setState({adjustedHue:this.props.hue, locked:!this.state.locked, adjustedSat:this.props.saturation});
    }


    render(){
        let hue = this.state.locked?this.state.adjustedHue:this.props.hue;
        let saturation = this.state.adjustedSat===undefined?this.props.saturation:this.state.adjustedSat;
        let value = this.state.adjustedValue;

        let convertedColorValue = colorsys.hsvToHex(hue,saturation,value);

        let colorStyle =`hsl(${hue},${saturation}%,${value}%)`;

        return(
            <li className="color-object"
            >
            <div className="color-show" style={{background:colorStyle,padding:'1em'}} >
            </div>
            <div className="color-main">
                <div className="color-form">
                    <div>
                        <input 
                        type="range"  
                        name="indiv-saturation"
                        disabled={this.state.locked?true:false}
                        min="0" max="100" 
                        value={this.state.adjustedSat===undefined?saturation:this.state.adjustedSat}
                        onChange={(e)=>{this.setState({adjustedSat:e.target.value})}}/>
                        <label htmlFor="indiv-saturation">Saturation</label>
                    </div>
                    <div>
                        <input 
                        type="range"  
                        name="indiv-value"
                        disabled={this.state.locked?true:false}
                        min="0" max="100" 
                        value={value}
                        onChange={(e)=>{this.setState({adjustedValue:e.target.value})}}/>
                        <label htmlFor="indiv-saturation">Value</label>
                    </div>
                    <button 
                    onClick={this.handleLock} 
                    className={this.state.locked?"locked":""}
                    >{this.state.locked?"Unlock":"Lock"} this Color</button>
                </div>
                <p>{convertedColorValue}</p>
            </div>
                
            </li>
        )
    }

}

export default ColorObject;