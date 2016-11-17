import React from 'react';
import { connectModule } from 'redux-modules';
import { Container } from 'rebass';
import { compose, lifecycle } from 'recompose';

import debugMode from '../../utils/debugMode';
import Login from '../Login';
import module from './module';

const Controller = ({ children, errors }) => (
  <Container>
    Controller
    <Login />
    {errors &&
      <div>
        <h2>Error!</h2>
        {errors.description}
      </div>
    }
    {children}
  </Container>
);

export default compose(
  connectModule(module),
  // debugMode(),
  lifecycle({
    componentDidMount() {
      this.props.actions.init({ ipAddress: this.props.ipAddress });
      this.props.actions.login('react-hue');
    },
  })
)(Controller);
