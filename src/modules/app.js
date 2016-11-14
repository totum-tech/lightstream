import { createModule } from 'redux-modules';

export default createModule({
  name: 'app',
  initialState: {
    loggedIn: false,
    token: '',
    loading: false,
  },
  transformations: {
    login: state => ({ ...state, loading: true}),
    loginSuccess: {
      reducer: (state, {payload}) => ({
        ...state,
        token: payload,
        loading: false,
      }),
    },
    loginError: (state, {payload}) => ({
      errors: payload,
      loading: false,
    }),
  },
});
