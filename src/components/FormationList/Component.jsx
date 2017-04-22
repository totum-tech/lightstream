import React from 'react';
import Formation from '../Formation';
import { Input, Card, Heading } from 'rebass';
import { createModule } from 'redux-modules';
import localModule from '../../utils/localModule';

const module = createModule({
  name: 'newFormation',
  initialState: { name: '' },
  transformations: {
    setName: (state, { payload }) => ({ ...state, name: payload }),
  },
});

// TODO: This should hold the list module for the bulbs module
const FormationList = ({ onCreate, actions, formations, setFormation, newFormation }) => (
  <div style={{ display: 'flex', flexDirection: 'row', width: '100%', }}>
    {(formations || []).map(formation =>
      <Formation {...formation} onSelect={setFormation} />
    )}
    <div>
      <label>New Formation</label>
      <input onChange={({ target }) => actions.setName(target.value)}/>
      <button onClick={() => onCreate(newFormation)}>Save Current Formation</button>
    </div>
  </div>

);

export default localModule(module)(FormationList);
