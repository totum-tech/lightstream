import React from 'react';
import { connectModule } from 'redux-modules';
import { Container } from 'rebass';
import { compose } from 'recompose';

import debugMode from '../../utils/debugMode';
import Login from '../Login';
import module from './module';

const Controller = ({ children }) => (
  <Container>
    Controller
    <Login />
    {children}
  </Container>
);

export default compose(
  connectModule(module),
  debugMode()
)(Controller);
