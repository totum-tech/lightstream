import React, { Component } from 'react';
import { ModuleProvider } from 'redux-modules';
import { createStore } from 'redux';
import logo from './logo.svg';
import './App.css';

import Bulb from './components/Bulb';
import Group from './components/Group';
import Controller from './components/Controller';

class App extends Component {
  render() {
    return (
      <ModuleProvider store={createStore(state => state)}>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>react-hue</h2>
          </div>
          <Controller ipAddress="192.168.1.71">
            <Group name="Living Room" on={true}>
              <Bulb
                debug
                name="Left Patio Bloom"
                selected={true}
                on={true}
                effect={/* none - colorloop */ 'none'}
                brightness={/* 1 - 254 */ 125}
                hue={/* 0 - 65535 */ 65535}
                saturation={/* 0-254 */ 254}
                temperature={/* 153-500 */ 400}
                transitionTime={/* n, n=100ms */ 1}
              />
              <Bulb
                debug
                name="Right Patio Bloom"
                selected={true}
                on={true}
                effect={/* none - colorloop */ 'none'}
                brightness={/* 1 - 254 */ 125}
                hue={/* 0 - 65535 */ 65535}
                saturation={/* 0-254 */ 254}
                temperature={/* 153-500 */ 400}
                transitionTime={/* n, n=100ms */ 1}
              />
              <Bulb
                debug
                name="Master Hallway Bulb"
                selected={true}
                on={true}
                effect={/* none - colorloop */ 'none'}
                brightness={/* 1 - 254 */ 125}
                hue={/* 0 - 65535 */ 65535}
                saturation={/* 0-254 */ 254}
                temperature={/* 153-500 */ 400}
                transitionTime={/* n, n=100ms */ 1}
              />
            </Group>
          </Controller>
        </div>
      </ModuleProvider>
    );
  }
}

export default App;
