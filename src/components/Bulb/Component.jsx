import React, { PropTypes } from 'react';
import { Card, Heading, Button } from 'rebass';
import { compose } from 'recompose';
import { connectModule } from 'redux-modules';
import debugMode from '../../utils/debugMode';
import module from './module';

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
        <Button onClick={() => this.props.actions.setPower(true)}>
          On
        </Button>
        <Button onClick={() => this.props.actions.setPower(false)}>
          Off
        </Button>
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

export default compose(
  connectModule(module)
)(Bulb);
