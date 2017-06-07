import React, { Component } from 'react';
import { combineReducers } from 'redux-loop';
import { ModuleProvider } from 'redux-modules';
import logo from './logo.svg';
import './App.css';

import createStore from './utils/createStore';
import Controller from './views/Controller';

class App extends Component {
  render() {
    return (
      <ModuleProvider store={createStore()} combineReducers={combineReducers}>
        <div className="App">
          <Controller ipAddress="192.168.1.71" />
        </div>
      </ModuleProvider>
    );
  }
}

export default App;
