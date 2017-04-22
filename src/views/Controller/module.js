import { createModule } from 'redux-modules';
import {
  loop,
  Effects,
  liftState,
} from 'redux-loop';

import * as hue from '../../services/hue';
import * as storage from '../../services/localStorage';
import bulbModule from '../../components/Bulb/module';

const FORMATIONS_STORAGE = 'react-hue/savedFormations';
const USER_STORAGE = 'react-hue-user';

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
    formations: [],
    activeFormation: null,
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
      Effects.batch([
        Effects.promise(
          () =>
            storage
            .get(USER_STORAGE)
            .then(module.actions.setUserAndFetch),
        ),
        Effects.promise(
          () =>
            storage
              .get(FORMATIONS_STORAGE)
              .then(module.actions.setFormations),
        ),
      ])
    ),

    setUserAndFetch: (state, { payload }) => loop(
      ({ ...state, username: payload }),
      Effects.constant(module.actions.fetchLights())
    ),

    setFormations: (state, { payload }) => ({ ...state, formations: payload || [] }),

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

      return loop(
        { ...state, bulbs: { ...state.bulbs, [meta.id]: nstate } },
        Effects.lift(
          neffects,
          a => module.actions.updateLight(a, {id: meta.id})
        ),
      );
    },

    saveFormation: (state, { payload: { name } }) => loop(
      { ...state, formations: state.formations.concat({ name, bulbs: state.bulbs }) },
      Effects.promise(
        v => storage.set(FORMATIONS_STORAGE, v).then(module.actions.saveSuccess),
        state.formations.concat({ name, bulbs: state.bulbs })
      )
    ),

    saveSuccess: state => state,

    setActiveFormation: (state, { payload: formation }) => {
      const [ bulbs, nestedEffects ] = Object
        .keys(formation.bulbs)
        .reduce((acc, key) => {
          const [ bulb, effect ] = bulbModule.reducer(
            formation.bulbs[key],
            bulbModule.actions.applyPreset(formation.bulbs[key])
          );
          return [
            { ...acc[0], [key]: bulb },
            acc[1].concat({ id: key, effect }),
          ];
        }, [{}, []]);

      return loop(
        { ...state, bulbs, activeFormation: formation.name },
        Effects.batch(
          nestedEffects.map(({id, effect}, index) =>
            Effects.lift(
              effect,
              a => module.actions.updateLight(a, {id: id })
            )
          )
        )
      );
    },
  },
});

export default module;
