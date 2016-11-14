import React, { PropTypes } from 'react';
import debugMode from '../../utils/debugMode';

class Bulb extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        Bulb
      </div>
    );
  }
}

Bulb.propTypes = {
  selected: PropTypes.bool,
  on: PropTypes.bool,
  effect: PropTypes.oneOf(['none', 'colorloop']),
  brightness: PropTypes.number,
  hue: PropTypes.number,
  saturation: PropTypes.number,
  temperature: PropTypes.number,
  transitionTime: PropTypes.number,
};

export default debugMode()(Bulb);
