import React from 'react';

const TrackNode = ({ brightness, transitionTime, time, totalTime, color, updateTrack }) => (
  <div style={{
    height: '100%',
    flex: ((transitionTime + time) / totalTime) * 100,
    backgroundColor: color,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRight: '1px solid white',
  }}>
    <p>brightness: {brightness}</p>
    <p>transitionTime: {transitionTime}</p>
    <p>time: {time}</p>
    <p>totalTime: {totalTime}</p>
    <p>color: {color}</p>
  </div>
);

export default TrackNode;
