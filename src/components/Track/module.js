import { createModule } from 'redux-modules';

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
  {
    time: 5,
    transitionTime: 5,
    brightness: 200,
    color: '#3E2F5B'
  },
  {
    time: 5,
    transitionTime: 5,
    brightness: 50,
    color: '#3E2F5B'
  },
  {
    time: 5,
    transitionTime: 5,
    brightness: 200,
    color: '#3E2F5B'
  },
]
const module = createModule({
  name: 'track',
  initialState: {
    nodes: exampleTrackData,
    currentIndex: 0,
  },
  transformations: {

  },
});

export default module;
