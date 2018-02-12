import { createModule } from 'redux-modules';
import { Effects } from 'redux-loop';
const randomHex = () => '#'+(Math.random()*0xFFFFFF<<0).toString(16);

const exampleTrackData = () => [
  {
    time: 0,
    transitionTime: 10,
    brightness: 254,
    power: true,
    color: randomHex()
  },
  {
    time: 20,
    transitionTime: 20,
    brightness: 10,
    color: randomHex()
  },
  {
    time: 30,
    transitionTime: 30,
    brightness: 254,
    power: true,
    color: randomHex()
  },
  {
    time: 30,
    transitionTime: 40,
    brightness: 254,
    color: randomHex()
  },
  {
    time: 30,
    transitionTime: 10,
    brightness: 20,
    color: randomHex()
  },
  {
    time: 5,
    transitionTime: 5,
    brightness: 254,
    color: randomHex()
  },
  {
    time: 5,
    transitionTime: 5,
    brightness: 50,
    color: randomHex()
  },
  {
    time: 5,
    transitionTime: 5,
    brightness: 254,
    color: randomHex()
  },
]

const module = () => createModule({
  name: 'track',
  initialState: {
    nodes: exampleTrackData(),
    currentIndex: 0,
  },
  transformations: {
    setColor: (state, { payload: { index, color } }) => [{
      ... state,
      nodes: state.nodes.map((node, i) => {
        if (i === index) {
          return { ...node, color }
        }
        return node;
      })
    }, Effects.none()],
    setBrightness: (state, { payload: { index, brightness } }) => [{
      ... state,
      nodes: state.nodes.map((node, i) => {
        if (i === index) {
          return { ...node, brightness }
        }
        return node;
      })
    }, Effects.none()],
    setTime: (state, { payload: { index, time } }) => [{
      ... state,
      nodes: state.nodes.map((node, i) => {
        if (i === index) {
          return { ...node, time }
        }
        return node;
      })
    }, Effects.none()],
    setTransitionTime: (state, { payload: { index, transitionTime } }) => [{
      ... state,
      nodes: state.nodes.map((node, i) => {
        if (i === index) {
          return { ...node, transitionTime }
        }
        return node;
      })
    }, Effects.none()],
  },
});

export default module;
