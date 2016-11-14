import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Bulb from './components/Bulb';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>react-hue</h2>
        </div>
        <p className="App-intro">
          <Bulb
            selected={true}
            on={true}
            effect={/* none - colorloop */ 'none'}
            brightness={/* 1 - 254 */ 125}
            hue={/* 0 - 65535 */ 65535}
            saturation={/* 0-254 */ 254}
            temperature={/* 153-500 */ 400}
            transitionTime={/* n, n=100ms */ 1}
          />
        </p>
      </div>
    );
  }
}

export default App;
