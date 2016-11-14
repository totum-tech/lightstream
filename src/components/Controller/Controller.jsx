import React from 'react';
import { Button } from 'rebass';
import Login from '../Login';

const Controller = ({ children }) => (
  <div style={{ height: '100px' }}>
    Controller
    <Login />
    {children}
  </div>
);

export default Controller;
