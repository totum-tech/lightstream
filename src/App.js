import React, { Component } from 'react';
import { combineReducers } from 'redux-loop';
import { ModuleProvider } from 'redux-modules';
import logo from './logo.svg';
import './App.css';

import createStore from './utils/createStore';

import Bulb from './components/Bulb';
import Group from './components/Group';
import Controller from './components/Controller';
import AvailableLights from './components/AvailableLights';

class App extends Component {
  render() {
    return (
      <ModuleProvider store={createStore()} combineReducers={combineReducers}>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>react-hue</h2>
          </div>
          <Controller ipAddress="192.168.1.71">
          </Controller>
        </div>
      </ModuleProvider>
    );
  }
}

export default App;
