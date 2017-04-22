import React from 'react';
import Formation from '../Formation';
import { Input, Card, Heading, Button } from 'antd';
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
  <div style={{ display: 'flex', flexDirection: 'row', width: '100%', padding: '30px' }}>
    {(formations || []).map(formation =>
      <div style={{ marginLeft: '30px' }}>
        <Formation {...formation} onSelect={setFormation} />
      </div>
    )}
    <Card style={{ width: '250px', marginLeft: '30px' }}>
      <label>New Formation</label>
      <Input onChange={({ target }) => actions.setName(target.value)}/>
      <Button onClick={() => onCreate(newFormation)}>Save Current Formation</Button>
    </Card>
  </div>

);

export default localModule(module)(FormationList);
