import React, { PropTypes } from 'react';
import { Card, Heading, Button, Input, Slider } from 'rebass';
import { compose } from 'recompose';
import { connectModule } from 'redux-modules';
import debugMode from '../../utils/debugMode';
import module from './module';
import flyd from 'flyd';
import every from 'flyd/module/every';
import { batchWhen } from '../../utils/batchWhen';

class Bulb extends React.Component {
  constructor(props) {
    super(props);
    this.slider$  = flyd.stream();
    this.throttled$ = batchWhen(every(10), this.slider$);
    flyd.on(props.actions.setHue, this.slider$);
    flyd.on(x => console.log('throttled', x), this.throttled$);
  }

  render() {
    const { actions: { setPower, setHue } } = this.props;
    return (
      <Card
        rounded
        width={256}
      >
        <Heading level={2} size={2}>
          {this.props.name}
        </Heading>
        {this.props.power ?
          <Button onClick={() => setPower(false)}>
            Off
          </Button>
          :
          <Button onClick={() => setPower(true)}>
            On
          </Button>
        }
        <Heading level={4} size={4}>
          {this.props.hue}
          <Slider
            label="Hue"
            min={0}
            max={65535}
            value={this.props.hue}
            onChange={({target}) => this.slider$(target.value)}
          />
        </Heading>

      </Card>
    );
  }
}

Bulb.propTypes = {
  name: PropTypes.string,
  selected: PropTypes.bool,
  power: PropTypes.bool,
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
