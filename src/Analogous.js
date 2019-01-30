import React, {Component} from 'react';
import ColorObject from './ColorObject';
var hexToHsl = require('hex-to-hsl');

class Analogous extends Component {

    render (){
        let color = this.props.color;
        let baseSaturation = this.props.saturation;
        let hsl = hexToHsl(color);

        let generatedWarm = [];
        let generatedCold = [];

        let createNewValues = ((warmOrCold) =>{//tints=true shades=false
            for(let i=0 ; i<2 ; i++){
                let newColorValue = undefined;
                let newColor = undefined;
                let array = undefined;
                let keyId = undefined;
                if(warmOrCold){
                    array = generatedWarm;
                    newColorValue = hsl[0] + ((i+1)*30);
                    newColor = `hsl(${newColorValue},${baseSaturation}%,${hsl[2]}%)`;
                    keyId="analogous-warm";
                    }
                    else{
                    array = generatedCold;
                    newColorValue = hsl[0] - ((i+1)*30);
                    newColor = `hsl(${newColorValue},${baseSaturation}%,${hsl[2]}%)`;
                    keyId="analogous-cold";
                    }
                if(warmOrCold){
                    array.unshift(<ColorObject 
                        key={keyId + i + hsl[0]}
                        hue = {newColorValue}
                        saturation = {baseSaturation}
                        value = {hsl[2]}
                        />)
                }else{
                    array.push(<ColorObject 
                        key={keyId + i + hsl[0]}
                        hue = {newColorValue}
                        saturation = {baseSaturation}
                        value = {hsl[2]}
                        />)
                }
            }
        })
        
        createNewValues(true);
        createNewValues(false);

        return (
            <ul className="color-scheme">
                {
                    generatedWarm.map((color)=>{
                        return color;
                    })
                }
                    <ColorObject 
                        id={"mono-main" + hsl[0]}
                        hue = {hsl[0]}
                        saturation = {baseSaturation}
                        value = {hsl[2]}
                    />                
                    {
                    generatedCold.map((color)=>{
                        return color;
                    })
                }
            </ul>
        )
    }
}

export default Analogous;