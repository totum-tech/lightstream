import React from 'react';
import Bulb from '../Bulb';
import { Button } from 'rebass';

const AvailableLights = ({ lights, fetchLights, updateLight }) => (
  <div>
    <Button onClick={fetchLights}>
      Fetch Lights
    </Button>
    {Object
      .keys(lights)
      .map(key =>
        <Bulb
          debug
          dispatch={a => updateLight(a, { id: lights[key].id })}
          {...lights[key]}
        />
      )
    }
  </div>
);

export default AvailableLights;
