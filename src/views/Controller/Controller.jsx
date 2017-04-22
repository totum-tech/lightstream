import React from 'react';
import { connectModule } from 'redux-modules';
import { Container, Slider, Heading } from 'rebass';
import { compose, lifecycle } from 'recompose';
import debugMode from '../../utils/debugMode';
import Login from '../../components/Login';
import AvailableLights from '../../components/AvailableLights';
import FormationList from '../../components/FormationList';
import NewFormation from '../../components/NewFormation';
import module from './module';
import GradientField from '../../components/GradientField';

const Controller = ({
  children,
  errors,
  username,
  actions,
  bulbs,
  loggedActions,
  formations,
}) => (
  <div style={{ width: '100vw', height: '100vh' }}>
    <div
      style={{
      position: 'static',
      display: 'flex',
      justifyContent: 'space-around',
      width: '100%',
      top: 0, left: 0, right: 0,
    }}>
      {errors &&
        <div>
          <h2>Error!</h2>
          {errors.description}
        </div>
      }
    </div>
    <div style={{display: 'flex', flexDirection: 'row', position: 'relative' }}>
      <AvailableLights
        updateLight={actions.updateLight}
        lights={bulbs}
        fetchLights={actions.fetchLights}
      />
      <GradientField
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
        }}
      />
    </div>
    <Login onLogin={actions.login} activeProfile={username} />
  </div>
);

export default compose(
  connectModule(module),
  // debugMode(),
  lifecycle({
    componentDidMount() {
      this.props.actions.init({ ipAddress: this.props.ipAddress });
    },
  })
)(Controller);
