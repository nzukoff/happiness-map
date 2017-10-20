import React, { Component } from 'react';
import Map from './components/Map/Map'

class App extends Component {
  render() {
    const margin = {top: 50,bottom: 50,left: 50,right: 50}
    const width = 1200 - margin.left - margin.right 
    const height = 600 - margin.top - margin.bottom
    return (
      <div className="App">
        <svg width="1100" height="500">
          <Map width={width} height={height} margin={margin}/>
        </svg>        
      </div>
    );
  }
}

export default App;
