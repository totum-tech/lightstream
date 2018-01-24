import React from 'react';
import styled from 'styled-components';
import { times } from 'ramda';
import Bulb from '../Bulb';
import bulbModule from '../Bulb/module';
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
    brightness: 100,
    power: true,
    color: '#FFB86F'
  },
  {
    time: 20,
    transitionTime: 20,
    brightness: 10,
    color: '#FFB86F'
  },
  {
    time: 30,
    transitionTime: 30,
    brightness: 150,
    power: true,
    color: '#BA5C12'
  },
  {
    time: 30,
    transitionTime: 40,
    brightness: 200,
    color: '#3E2F5B'
  },
  {
    time: 30,
    transitionTime: 10,
    brightness: 20,
    color: '#261132'
  },
]

const play = (bulbs, dispatchUpdate) => {
  const run = (nodes) => {
    if (!nodes.length) { return true; }
    else {
      const [headNode, ...rest] = nodes
      console.log('playing', headNode)
      bulbs.map(bulb =>
        dispatchUpdate(bulbModule.actions.applyPreset(headNode), { id: bulb.id })
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
