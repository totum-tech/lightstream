import React, { PropTypes } from 'react';
import JSONViewer from 'react-json-viewer';

export default class Bulb extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        Bulb
        <JSONViewer json={this.props} />
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
