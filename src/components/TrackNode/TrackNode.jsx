import React from 'react';
import { Slider } from 'antd';
import module from '../Track/module';

const TrackNode = ({ brightness, transitionTime, time, totalTime, color, updateTrack, index }) => (
  <div style={{
    height: '100%',
    flex: ((transitionTime + time) / totalTime) * 100,
    backgroundColor: color,
    borderRight: '1px solid white',
  }}>
    <Slider
      min={1}
      max={254}
      value={brightness}
      onChange={val =>
        updateTrack(module().actions.setBrightness({ brightness: val, index }))
      }
    />
    <p>brightness: {brightness}</p>
    <p>transitionTime: {transitionTime}</p>
    <p>time: {time}</p>
    <p>totalTime: {totalTime}</p>
    <p>color: {color}</p>
  </div>
);

export default TrackNode;
