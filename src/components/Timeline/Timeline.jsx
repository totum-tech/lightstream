import React from 'react';
import { connectModule } from 'redux-modules';
import styled from 'styled-components';
import { mapProps, compose, lifecycle } from 'recompose';
import { times } from 'ramda';
import Bulb from '../Bulb';
import bulbModule from '../Bulb/module';
import module from './module';
import TrackNode from '../TrackNode';

let numberOfPlays = 0;

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

const Timeline = ({ play, tracks, bulbs, interval, scale, updateLight, totalTime, actions }) => (
  <Wrapper>
    <Container>
      <button onClick={() => play()}>
        PLAY
      </button>
      {bulbs.map((bulb, index) => (
        <Track>
          <Bulb
            {...bulb}
            dispatch={action => updateLight(action, { id: bulb.id })}
          />
          {tracks[`${index}`].nodes.map((node, i) => (
            <TrackNode
              transitionTime={node.transitionTime}
              time={node.time}
              totalTime={totalTime}
              color={node.color}
              brightness={node.brightness}
              index={i}
              updateTrack={action =>
                actions.updateTrack(action, { id: index })
              }
            />
          ))}
        </Track>
      ))}
    </Container>
  </Wrapper>
)

Timeline.defaultProps = {
  interval: 10, //seconds
  time: 60,
}

export default compose(
  connectModule(module),
  mapProps(props => ({
    ...props,
    totalTime: Object.keys(props.tracks).reduce((totalTime, key) => {
      return props.tracks[key].nodes
        .reduce((time, node) =>
          time += node.time + node.transitionTime,
          totalTime
        )
    }, 0)
  })),
  lifecycle({
    componentWillMount() {
      console.log(this.props);
    },
  }),
  mapProps(props => ({
    ...props,
    play: () => {
      const play = (bulb, dispatchUpdate, trackData) => {
        const run = (nodes, transitionTime) => {
          if (!nodes.length) { numberOfPlays = false }
          else {
            const [headNode, ...rest] = nodes
            if (transitionTime) {
              dispatchUpdate(bulbModule.actions.setTransitionTime(headNode.transitionTime), { id: bulb.id })
            }
            console.log('playing', headNode)
            dispatchUpdate(bulbModule.actions.applyPreset(headNode), { id: bulb.id })
            setTimeout(() => run(rest, rest[0].transitionTime), headNode.time * 100)
          }
        }
        run(trackData)
      }

      props.bulbs.map((bulb, i) => {
        play(bulb, props.updateLight, props.tracks[i].nodes)
      })
    }
  }))
)(Timeline)
