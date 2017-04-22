import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { Card, Heading, Slider } from 'rebass';
import { Switch, Popover, Icon, Button } from 'antd';
import { compose } from 'recompose';
import { connectModule } from 'redux-modules';
import module from './module';
import flyd from 'flyd';
import { Observable } from 'rxjs';

import every from 'flyd/module/every';
import { throttleWhen } from '../../utils/flydHelpers';
import { ColorPicker, Color, HarmonyTypes } from 'react-colorizer';

const measureClient = () => ({
  width: window.innerWidth,
  height: window.innerHeight,
});

class Bulb extends React.Component {
  constructor(props) {
    super(props);
    this.slider$  = flyd.stream();
    this.throttled$ = throttleWhen(every(100), this.slider$);
    flyd.on(props.actions.setHue, this.throttled$);
  }

  componentDidMount() {
    const { actions: { setCoordinates } } = this.props;

    const mouseDown$ = Observable.fromEvent(this.element, 'mousedown');
    const mouseMove$ = Observable.fromEvent(document, 'mousemove').throttleTime(60);
    const mouseUp$ = Observable.fromEvent(document, 'mouseup');

    const mouseDrag$ = mouseDown$
    .flatMap(e => {
      e.preventDefault();
      console.log('Down event', e);
      return mouseMove$
      .map((e) => {
        const { clientX, clientY } = e;
        return { clientX, clientY };
      })
      .takeUntil(mouseUp$);
    })
    .subscribe(coords => {
      const { height, width } = measureClient();
      const hue = (coords.clientX / width) * 360;
      const lightness = ((coords.clientY/ height) * 10000) / 100
      setCoordinates({ ...coords, hue, lightness });
    });

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
      coordinates,
      power,
    } = this.props;

    let elementStyle = {};
    let buttonStyle = {};

    if (coordinates) {
      elementStyle = {
        position: 'absolute',
        left: coordinates.clientX,
        top: coordinates.clientY,
      };

      buttonStyle = {
        backgroundColor: power ? `hsl(${coordinates.hue}, 50%, ${coordinates.lightness}%` : 'black',
        color: !power ? 'red' : 'white',
      };

    }

    return (
      <div
        ref={el => this.element = findDOMNode(el)}
        style={elementStyle}
      >
        <Popover
          content={
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'space-around' }}>
              <label>{this.props.name}</label>
            </div>
          }
        >
          <Button
            icon={power ? "bulb" : "close"}
            shape="circle"
            onClick={() => setPower(!power)}
            style={buttonStyle}
          />
        </Popover>
      </div>
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
