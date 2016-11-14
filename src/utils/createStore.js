import { createStore,  } from 'redux';
import { install } from 'redux-loop';

const generateStore = () => {
  return createStore(state => state, {}, install());
};

export default generateStore;
