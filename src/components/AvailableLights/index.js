import React from 'react';
import Bulb from '../Bulb';
import { Button } from 'rebass';
import { ColorPicker, Color, HarmonyTypes } from 'react-colorizer';
// TODO: This should hold the list module for the bulbs module
const AvailableLights = ({ lights, fetchLights, updateLight }) => (
  <div style={{ width: '100%', position: 'relative' }}>
    <div style={{ display: 'flex', flexDirection: 'row', padding: '10px' }}>
      {Object
        .keys(lights)
        .filter(key => lights[key].power)
        .map(key =>
          <Bulb
            debug
            key={lights[key].id}
            dispatch={a => updateLight(a, { id: lights[key].id })}
            {...lights[key]}
          />
        )
      }
    </div>
    <div style={{ display: 'flex', flexDirection: 'row', padding: '10px' }}>
      {Object
        .keys(lights)
        .filter(key => !lights[key].power)
        .map(key =>
          <Bulb
            debug
            key={lights[key].id}
            dispatch={a => updateLight(a, { id: lights[key].id })}
            {...lights[key]}
          />
        )
      }
    </div>
  </div>
);

export default AvailableLights;
