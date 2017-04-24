import React, { PropTypes } from 'react';
import debugMode from '../../utils/debugMode';
import { Heading } from 'rebass';
import { Card, Button, Icon, Popover, Input } from 'antd';
import { Observable } from 'rxjs';

class Formation extends React.Component {
  componentDidMount() {
    this.setupKeyListener();
  }

  setupKeyListener = () => {
    const { onSelect, name, bulbs, hotkey } = this.props;
    const keyUp$ = Observable.fromEvent(document, 'keyup').throttleTime(60);

    keyUp$
    .map(({ keyCode }) => keyCode)
    .subscribe(currentKey => {
      console.log('Checking', hotkey, 'against', currentKey);
      if (currentKey === hotkey) {
        console.log('ACTIVTING', name);
        onSelect({ name, bulbs });
      }
    });
  }

  render() {
    const { name, bulbs, onSelect, onDelete, keyCode, active } = this.props;
    return (
      <Popover
        content={
          <div>
            Current Hotkey: {keyCode}
            <Input />
          </div>
        }
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            borderLeft: '1px solid black',
            borderRight: '1px solid black',
            padding: '10px',
            borderRadius: '5px',
            color: active && 'orange',
          }}
          onClick={() => onSelect({ name, bulbs })}
        >
          <div style={{ paddingRight: '10px' }}>
            <label>
              {name}
            </label>
          </div>
          <Icon
            type="close"
            onClick={e => {
              e.stopPropagation();
              onDelete(name);
            }}
          />
        </div>
      </Popover>
    );
  }
}

Formation.propTypes = {

};

export default debugMode()(Formation);
