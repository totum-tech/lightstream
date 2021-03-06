import { createModule } from 'redux-modules';
import { liftState, Effects, loop } from 'redux-loop';
import { light } from '../../services/hue';
import { compose } from 'ramda';
import { hexToRgb, rgbToHue, hslToRgb } from './utils';

const set = key => value => state => ({ ...state, [key]: value });

const module = createModule({
  name: 'bulb',
  initialState: {
    name: '',
    power: true,
    effect: 'none',
    brightness: 100,
    transitionTime: 1,
    coordinate: { pageX: 100, pageY: 100 },
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
      set('power')(action.payload)(state),
      Effects.promise(
        light.set({
          onSuccess: module.actions.setSuccess,
          onError: module.actions.setError,
        }),
        state.links.updateState,
        { on: action.payload }
      )
    ),

    applyPreset: (state, { payload }) => loop(
      compose(
        set('brightness')(payload.brightness),
        set('coordinates')(payload.coordinates),
        set('power')(payload.power),
        // set('transitionTime')(payload.transitionTime),
      )(state),
      Effects.promise(
        light.set({
          onSucess: module.actions.setSuccess,
          onError: module.actions.setError,
        }),
        state.links.updateState,
        {
          on: payload.power,
          xy: payload.xy.map(coord => Number(coord)),
          transitiontime: Number(10),
        }
      )
    ),

    setBrightness: (state, action) => loop(
      set('brightness')(action.payload)(state),
      Effects.promise(
        light.set({
          onSuccess: module.actions.setSuccess,
          onError: module.actions.setError,
        }),
        state.links.updateState,
        { bri: Number(action.payload) }
      )
    ),


    setTransitionTime: (state, action) => loop(
      set('transitionTime')(action.payload)(state),
      Effects.promise(
        light.set({
          onSuccess: module.actions.setSuccess,
          onError: module.actions.setError,
        }),
        state.links.updateState,
        { transitiontime: Number(action.payload) }
      )
    ),

    setHue: (state, action) => loop(
      set('hue')(action.payload)(state),
      Effects.promise(
        light.set({
          onSuccess: module.actions.setSuccess,
          onError: module.actions.setError,
        }),
        state.links.updateState,
        { hue: Number(action.payload) }
      )
    ),

    setHex: (state, action) => loop(
      set('hex')(action.payload)(state),
      Effects.promise(
        light.set({
          onSuccess: module.actions.setSuccess,
          onError: module.actions.setError,
        }),
        state.links.updateState,
        { xy: rgbToHue(hexToRgb(action.payload)).map(coord => Number(coord)) }
      )
    ),

    setSaturation: (state, action) => loop(
      set('saturation')(action.payload)(state),
      Effects.promise(
        light.set({
          onSuccess: module.actions.setSuccess,
          onError: module.actions.setError,
        }),
        state.links.updateState,
        { sat: Number(action.payload) }
      )
    ),

    setXY: (state, action) => loop(
      set('xy')(action.payload)(state),
      Effects.promise(
        light.set({
          onSuccess: module.actions.setSuccess,
          onError: module.actions.setError,
        }),
        state.links.updateState,
        { xy: action.payload.map(coord => Number(coord)) }
      )
    ),

    setCoordinates: (state, action) => {
      const xy = rgbToHue(hslToRgb(action.payload.hue / 360, .5, action.payload.lightness / 100));
      return loop(
        compose(
          set('coordinates')(action.payload),
          set('xy')(xy)
        )(state),
        Effects.promise(
          light.set({
            onSuccess: module.actions.setSuccess,
            onError: module.actions.setError,
          }),
          state.links.updateState,
          { xy: xy.map(coord => Number(coord)) }
        )
      );
    },
  },
});

export default module;
