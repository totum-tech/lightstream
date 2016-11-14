import { createModule } from 'redux-modules';
import {
  loop,
  Effects,
  liftState,
} from 'redux-loop';

import * as hue from '../../services/hue';

const module = createModule({
  name: 'controller',
  initialState: {
    loggedIn: false,
    username: '',
    loading: false,
    errors: [],
    ipAddress: '',
  },
  middleware: [
    action => {
      console.log(action.type, '::', action);
      return action;
    },
  ],
  selector: state => state.controller[0],
  composes: [liftState],
  transformations: {
    init: (state, { payload }) => ({
      ...state,
      ipAddress: payload.ipAddress,
    }),
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
      reducer: (state, {payload: { username }}) => ({
        ...state,
        username: username,
        loading: false,
      }),
    },
    loginError: (state, {payload}) => ({
      errors: payload,
      loading: false,
    }),
  },
});

export default module;
