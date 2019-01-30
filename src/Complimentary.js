import React, {Component} from 'react';
import ColorObject from './ColorObject';

var hexToHsl = require('hex-to-hsl');

class Complimentary extends Component {

    render (){

        //create 1 shade, 1 tint of main and complimentary color.

        //main color shade and tint
        let color = this.props.color;
        let baseSaturation = this.props.saturation;
        let hsl = hexToHsl(color);

        let createMainValues = ((tintsOrShades,hsl) =>{//tints=true shades=false
            let array = [];

            for(let i=0 ; i<2 ; i++){
                let newColorValue = undefined;
                let newColor = undefined;
                let keyId = undefined;
                if(tintsOrShades){
                    newColorValue = hsl[2] +((i+1)*15);
                    newColor = `hsl(${hsl[0]},${baseSaturation}%,${newColorValue}%)`;
                    keyId="mono-tint";
                    }
                    else{
                    newColorValue = hsl[2] -((i+1)*15);
                    newColor = `hsl(${hsl[0]},${baseSaturation}%,${newColorValue}%)`;
                    keyId="mono-shade";
                    }
                if(tintsOrShades){
                    array.unshift(<ColorObject 
                        key={keyId + i + hsl[0]}
                        hue = {hsl[0]}
                        saturation = {baseSaturation}
                        value = {newColorValue}
                        />)
                }else{
                    array.push(<ColorObject 
                        key={keyId + i + hsl[0]}
                        hue = {hsl[0]}
                        saturation = {baseSaturation}
                        value = {newColorValue}
                        />)
                }
            }
            return array;
        })

        let generatedTints = createMainValues(true,hsl);
        let generatedShades = createMainValues(false,hsl);

        //Find compliment of current color.

        let findCompliment = () =>{
            let hue = hsl[0];
            if(hue > 180){
                hue -= 180;
            }
            else{
                hue += 180;
            }
            if(hue === 360){
                hue = 0;
            }
            return [hue,baseSaturation,hsl[2]];
        }

        let complimentaryValue = findCompliment();

        let complimentaryTints = createMainValues(true,complimentaryValue);
        let complimentaryShades = createMainValues(false,complimentaryValue);
        
        return (
            <ul className="color-scheme">
                {
                    generatedTints.map((color)=>{
                        return color;
                    })
                }
                {
                    generatedShades.map((color)=>{
                        return color;
                    })
                }
                    <ColorObject 
                        id={"mono-main" + hsl[0]}
                        hue = {hsl[0]}
                        saturation = {baseSaturation}
                        value = {hsl[2]}
                    />
                    <ColorObject 
                        id={"mono-main" + complimentaryValue[0]}
                        hue = {complimentaryValue[0]}
                        saturation = {baseSaturation}
                        value = {complimentaryValue[2]}
                    />            
                {
                    complimentaryShades.map((color)=>{
                        return color;
                    })
                }
                {
                    complimentaryTints.map((color)=>{
                        return color;
                    })
                }

            </ul>
        )
    }
}

export default Complimentary;