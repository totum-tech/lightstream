import React, { PropTypes } from 'react';
import { Card, Heading, Button, Slider } from 'rebass';
import { compose } from 'recompose';
import { connectModule } from 'redux-modules';
import module from './module';
import flyd from 'flyd';
import every from 'flyd/module/every';
import { throttleWhen } from '../../utils/flydHelpers';
import { ColorPicker, Color, HarmonyTypes } from 'react-colorizer';

class Bulb extends React.Component {
  constructor(props) {
    super(props);
    this.slider$  = flyd.stream();
    this.throttled$ = throttleWhen(every(100), this.slider$);
    flyd.on(props.actions.setHue, this.throttled$);
  }

  render() {
    const {
      actions: {
        setPower,
        setSaturation,
        setXY,
        setHex,
        setBrightness,
        setTransitionTime,
      },
    } = this.props;
    return (
      <Card
        rounded
        width={256}
        style={{ margin: '5px' }}
      >
        <Slider
          name="Transition Time"
          label={`Transition Time: ${this.props.transitionTime}`}
          min={0}
          max={10}
          value={this.props.transitionTime}
          onChange={({target}) => setTransitionTime(target.value)}
        />

        <Slider
          name="Hue"
          label={`Hue: ${this.props.hue}`}
          min={0}
          max={65535}
          value={this.props.hue}
          onChange={({target}) => this.slider$(target.value)}
        />

        <input
          type="color"
          onChange={({target}) => setHex(target.value)}
        />

        <Slider
          name="Saturation"
          label={`Saturation: ${this.props.saturation}`}
          min={0}
          max={254}
          value={this.props.saturation}
          onChange={({target}) => setSaturation(target.value)}
        />

        <Slider
          name="Brightness"
          label={`Brightness: ${this.props.brightness}`}
          min={1}
          max={254}
          value={this.props.brightness}
          onChange={({target}) => setBrightness(target.value)}
        />
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'space-around' }}>
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
          </div>
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
