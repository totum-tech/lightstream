import React, { PropTypes } from 'react';
import debugMode from '../../utils/debugMode';
import { Card, Heading } from 'rebass';

class Bulb extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card
        rounded
        width={256}
      >
        <Heading level={2} size={2}>
          {this.props.name}
        </Heading>
      </Card>
    );
  }
}

Bulb.propTypes = {
  name: PropTypes.string,
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
