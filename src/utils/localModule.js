import { connectModule } from 'redux-modules';
import { withReducer, compose } from 'recompose';

const connectLocalModule = module => Component =>
  compose(
    withReducer(
      module.name,
      'dispatch',
      module.reducer,
      module.reducer(undefined, {})
    ),
    connectModule(module)
  )(Component);

export default connectLocalModule;
