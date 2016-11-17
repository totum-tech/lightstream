import { createModule } from 'redux-modules';
import { liftState, Effects, loop } from 'redux-loop';
import { light } from '../../services/hue';

const set = key => (state, { payload }) => ({ ...state, [key]: payload });

const module = createModule({
  name: 'bulb',
  initialState: {
    name: '',
    power: true,
    effect: 'none',
    brightness: 125,
    hue: 65535,
    saturation: 254,
    temperature: 400,
    transitionTime: 1,
    meta: {
      'type': '',
      'name': '',
      'modelid': '',
      'manufacturername': '',
      'uniqueid': '',
      'swversion': '',
    },
    links: {
      updateState: '',
    },
  },
  composes: [liftState],
  transformations: {
    setSuccess: state =>
      ({ ...state, loading: false }),

    setError: (state, {payload}) =>
      ({ ...state, loading: false, errors: payload }),

    setPower: (state, action) => loop(
      set('power')(state, action),
      Effects.promise(
        light.set({
          onSuccess: module.actions.setSuccess,
          onError: module.actions.setError,
        }),
        state.links.updateState,
        { on: action.payload }
      )
    ),

    setBrightness: (state, action) => loop(
      set('brightness')(state, action),
      Effects.promise(
        light.set({
          onSuccess: module.actions.setSuccess,
          onError: module.actions.setError,
        }),
        state.links.updateState,
        { bri: action.payload }
      )
    ),

    setHue: (state, action) => loop(
      set('hue')(state, action),
      Effects.promise(
        light.set({
          onSuccess: module.actions.setSuccess,
          onError: module.actions.setError,
        }),
        state.links.updateState,
        { hue: Number(action.payload) }
      )
    ),

    setSaturation: (state, action) => loop(
      set('hue')(state, action),
      Effects.promise(
        light.set({
          onSuccess: module.actions.setSuccess,
          onError: module.actions.setError,
        }),
        state.links.updateState,
        { sat: action.payload }
      )
    ),
  },
});

export default module;
