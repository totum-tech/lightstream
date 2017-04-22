import React, { PropTypes } from 'react';
import { Card, Input, Button } from 'rebass';
import { createModule } from 'redux-modules';
import localModule from '../../utils/localModule';

const module = createModule({
  name: 'newFormation',
  initialState: { name: '' },
  transformations: {
    setName: (state, { payload }) => ({ ...state, name: payload }),
  },
});

const NewFormation = ({ onCreate, actions, newFormation, lights }) => (
  <Card>
    <Input
      placeholder="Enter a formation name"
      onChange={({target}) => actions.setName(target.value)}
    />
    <Button onClick={() => onCreate(newFormation)}>
      Save Current Formation
    </Button>
  </Card>
);

export default localModule(module)(NewFormation);
