import React, {Component} from 'react';
import ColorObject from './ColorObject';

var hexToHsl = require('hex-to-hsl');


class Monochrome extends Component {
    
    render(){
        let color = this.props.color;
        let baseSaturation = this.props.saturation;

        let hsl = hexToHsl(color);

        let generatedTints = [];
        let generatedShades = [];


        let createNewValues = ((tintsOrShades) =>{//tints=true shades=false
            for(let i=0 ; i<3 ; i++){
                let newColorValue = undefined;
                let newColor = undefined;
                let array = undefined;
                let keyId = undefined;
                if(tintsOrShades){
                    array = generatedTints;
                    newColorValue = hsl[2] +((i+1)*15);
                    newColor = `hsl(${hsl[0]},${baseSaturation}%,${newColorValue}%)`;
                    keyId="mono-tint";
                    }
                    else{
                    array = generatedShades;
                    newColorValue = hsl[2] -((i+1)*15);
                    newColor = `hsl(${hsl[0]},${baseSaturation}%,${newColorValue}%)`;
                    keyId="mono-shade";
                    }
                if(tintsOrShades){
                    array.unshift(
                        <ColorObject 
                        key={keyId + i + hsl[0]}
                        hue = {hsl[0]}
                        saturation = {baseSaturation}
                        value = {newColorValue}
                        />
                        )
                        
                }else{
                    array.push(<ColorObject 
                        key={keyId + i + hsl[0]}
                        hue = {hsl[0]}
                        saturation = {baseSaturation}
                        value = {newColorValue}
                        />)
                }
            }
        })
        
        createNewValues(true);
        createNewValues(false);

        return(
            <ul className="color-scheme">
                {
                    generatedTints.map((color)=>{
                        return color;
                    })
                }
                <ColorObject 
                        key={"mono-main"}
                        hue = {hsl[0]}
                        saturation = {baseSaturation}
                        value = {hsl[2]}
                        />
                {
                    generatedShades.map((color)=>{
                        return color;
                    })
                }
            </ul>
        )
    }
}

export default Monochrome;