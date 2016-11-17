import { createModule } from 'redux-modules';
import {
  loop,
  Effects,
  liftState,
} from 'redux-loop';

import * as hue from '../../services/hue';
import * as storage from '../../services/localStorage';

import bulbModule from '../Bulb/module';

const module = createModule({
  name: 'controller',
  initialState: {
    loggedIn: false,
    username: '',
    loading: false,
    errors: null,
    ipAddress: '',
    bulbs: {},
    loggedActions: [],
  },
  middleware: [
    action => {
      console.log(action.type, '::', action);
      return action;
    },
  ],
  selector: state => state.controller,
  composes: [liftState],
  transformations: {
    init: (state, { payload }) => loop(
      { ...state, ipAddress: payload.ipAddress },
      Effects.promise(
        k => storage.get(k).then(module.actions.setUser),
        'react-hue-user'
      )
    ),
    setUser: (state, { payload }) => ({ ...state, username: payload }),
    login: (state, { payload }) => loop(
      { ...state, loading: true },
      Effects.promise(
        hue.login({
          onSuccess: module.actions.loginSuccess,
          onError: module.actions.loginError,
        }),
        state.ipAddress,
        payload
      )
    ),
    loginSuccess: {
      reducer: (state, {payload: { username }}) => loop(
        { ...state, username: username, loading: false, errors: null },
        Effects.promise(
          (k, v) => storage.set(k, v).then(() => ({ type: 'NOOP' })),
          'react-hue-user',
          username
        )
      ),
    },
    loginError: (state, {payload}) => ({
      ...state,
      errors: payload,
      loading: false,
    }),
    fetchLights: state => loop(
      { ...state, loading: true },
      Effects.promise(
        hue.lights.list({
          onSuccess: module.actions.fetchLightsSuccess,
          onError: module.actions.fetchLightsError,
        }),
        state.ipAddress,
        state.username,
      )
    ),
    fetchLightsSuccess: {
      reducer: (state, { payload }) => ({
        ...state,
        bulbs: payload,
      }),
    },
    loginError: (state, { payload }) => ({
      ...state,
      errors: payload,
      loading: false,
    }),
    updateLight: (state, action) => {
      const { payload, meta } = action;
      const [
        nstate,
        neffects,
      ] = bulbModule.reducer(state.bulbs[meta.id], payload);
      const effects = [
        Effects.lift(
          neffects,
          a => module.actions.updateLight(a, {id: meta.id})
        ),
      ];
      if (!meta.replay) { effects.push(Effects.constant(module.actions.logAction(action)) )}
      return loop(
        { ...state, bulbs: { ...state.bulbs, [meta.id]: nstate } },
        Effects.batch(effects)
      );
    },
    logAction: (state, { payload }) => ({
      ...state,
      loggedActions: state.loggedActions.concat(payload),
    }),
    timetravel: {
      reducer: (state, { payload }) => {
        const playAction = state.loggedActions[payload];
        if (!playAction) { return state; }
        return loop(state, Effects.constant({...playAction, meta: { ...playAction.meta, replay: true }}));
      },
    },
  },
});

export default module;
