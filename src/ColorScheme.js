import React, {Component} from 'react';
import Monochrome from './Monochrome';
import Complimentary from './Complimentary';
import Analogous from './Analogous';

class ColorScheme extends Component {

    render (){
        
        let componentList = [
            <Monochrome color={this.props.color} saturation={this.props.saturation}/>,
            <Complimentary color={this.props.color} saturation={this.props.saturation}/>,
            <Analogous color={this.props.color} saturation={this.props.saturation}/>,
        ]

        return (
            <div className="color-scheme-container">
                <h2>{this.props.name}</h2>
                {componentList[this.props.component]}
            </div>
        )
    }
}

export default ColorScheme;