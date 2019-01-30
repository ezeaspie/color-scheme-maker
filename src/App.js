import React, { Component } from 'react';
import './App.css';
import CircularColor from 'react-circular-color';
import ColorScheme from './ColorScheme';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedColor : undefined,
      selectedSaturation:100,
    }
    this.handleColorChange = this.handleColorChange.bind(this);
  }

  handleColorChange(color) {
    this.setState({selectedColor:color});
  }
 
  render() {

    let schemeInfoFactory = (name, component) => {
      return {name, component}
    }

    let schemeInfo = [
        schemeInfoFactory("Monochromatic"),
        schemeInfoFactory("Complimentary"),
        schemeInfoFactory("Analogous"),
    ] 
    
    return (
      <div>
      <CircularColor centerRect={true} size={200} onChange={this.handleColorChange} />
      <div>
        <input 
        type="range" 
        id="start" 
        name="saturation"
        disabled={this.state.selectedColor===undefined?true:false}
        className={this.state.selectedColor===undefined?"disabled":""}
        min="0" max="100" 
        value={this.state.selectedSaturation}
        onChange={(e)=>{this.setState({selectedSaturation:e.target.value})}}/>
        <label htmlFor="saturation" className="main-sat">Saturation</label>
      </div>
      {
        this.state.selectedColor === undefined?
        <h2>Please select a color to generate your color schemes!</h2>:
        <div className="scheme-list">
          {
            schemeInfo.map((scheme,i)=>{
              return(
                <ColorScheme 
                className="color-wheel"
                name={scheme.name} 
                component={i}
                key={scheme.name + "scheme"}
                saturation={this.state.selectedSaturation}
                color={this.state.selectedColor} />
              )
            })
          }
        </div>
      }
      </div>
    );
  }
}

export default App;
