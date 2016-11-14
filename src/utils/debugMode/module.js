import { createModule } from 'redux-modules';

export default createModule({
  name: 'hovering',
  initialState: { active: false },
  transformations: {
    setActive: state => ({ ...state, active: true }),
    setInactive: state => ({ ...state, active: false }),
  },
});
