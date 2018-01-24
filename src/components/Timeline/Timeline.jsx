import React from 'react';
import styled from 'styled-components';
import { times } from 'ramda';
import Bulb from '../Bulb';

const Wrapper = styled.div`
  position: absolute;
  top: 15px;
  left: 0;
  right: 0;
  bottom: 0;
`

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`

const Column = styled.div`
  flex: ${({ width }) => width}
`

const Track = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  height: 15px;
  border-top: 1px solid grey;
  border-botom: 1px solid grey;
`

const exampleTrackData = [
  {
    time: 0,
    transitionTime: 10,
    power: true,
    coordinate: { pageX: 100, pageY: 100 }
  },
  {
    time: 20,
    power: false,
    coordinate: { pageX: 100, pageY: 100 }
  },
  {
    time: 30,
    power: true,
    coordinate: { pageX: 150, pageY: 100 }
  },
]

const play = (bulbs, dispatchUpdate) => {
  const run = (nodes) => {
    if (!nodes.length) { return true; }
    else {
      const [headNode, ...rest] = nodes
      console.log('playing', headNode)
      bulbs.map(bulb =>
        dispatchUpdate({
          type: 'bulb/applyPreset',
          payload: headNode,
        }, { id: bulb.id })
      )
      setTimeout(() => run(rest), (headNode.transitionTime || 10) * 100)
    }
  }
  run(exampleTrackData)
}

const Timeline = ({ bulbs, interval, scale, time, updateLight }) => (
  <Wrapper>
    <Container>
      <button onClick={() => play(bulbs, updateLight)}>
        PLAY
      </button>
      {bulbs.map(bulb => (
        <Track>
          <Bulb
            {...bulb}
            dispatch={action => updateLight(action, { id: bulb.id })}
          />
          {times(i => (
            <Column width={time/interval}>
              Interval {i}
            </Column>
          ), time/interval)}
        </Track>
      ))}
    </Container>
  </Wrapper>
)

Timeline.defaultProps = {
  interval: 10, //seconds
  time: 60,
}

export default Timeline
