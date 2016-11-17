import React from 'react';
import { Button, Input } from 'rebass';
import loginInterface from './interface';

const Login = ({ onLogin, activeProfile }) => (
  <div style={{ height: '100px' }}>
    {!activeProfile &&
      <Button onClick={onLogin}>
        Login
      </Button>
    }
    {activeProfile && <i>{activeProfile}</i>}
  </div>
);

export default loginInterface(Login);
