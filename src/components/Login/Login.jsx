import React from 'react';
import { Button } from 'rebass';
import loginInterface from './interface';

const Login = () => (
  <div style={{ height: '100px' }}>
    Login
    <Button>
      Login
    </Button>
  </div>
);

export default loginInterface(Login);
