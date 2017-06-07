import React from 'react';
import Formation from '../Formation';
import { Input, Card, Heading, Button, Popover } from 'antd';
import { createModule } from 'redux-modules';
import localModule from '../../utils/localModule';

const module = createModule({
  name: 'newFormation',
  initialState: { name: '' },
  transformations: {
    setName: (state, { payload }) => ({ ...state, name: payload }),
    setKeyCode: (state, { payload }) => ({ ...state, keyCode: payload }),
  },
});

// TODO: This should hold the list module for the bulbs module
const FormationList = ({
  onCreate,
  actions,
  formations,
  setFormation,
  deleteFormation,
  newFormation,
  activeFormation,
  onDelete,
}) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      padding: '5px',
      position: 'relative',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      color: 'white',
      height: '45px'
    }}
  >
    {(formations || []).map((formation, index) =>
      <div style={{ marginLeft: '30px' }}>
        <Formation
          {...formation}
          active={formation.name === activeFormation}
          hotkey={49 + index}
          onSelect={setFormation}
          onDelete={deleteFormation}
        />
      </div>
    )}
    <div style={{ position: 'absolute', right: 10 }}>
      <Popover
        placement="leftTop"
        content={
          <div>
            <label>New Formation</label>
            <Input
              placeholder="Name"
              onChange={({ target }) => actions.setName(target.value)}
            />
            <Input
              placeholder="Hotkey"
              onChange={({ target }) => actions.setKeyCode(target.value)}
            />
            <Button onClick={() => onCreate(newFormation)}>Save Current Formation</Button>
          </div>
        }
        >
          <Button icon="plus" />
        </Popover>
    </div>
  </div>

);

export default localModule(module)(FormationList);
