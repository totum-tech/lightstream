import React from 'react';
import Formation from '../Formation';
import { Input, Card, Heading } from 'rebass';

// TODO: This should hold the list module for the bulbs module
const FormationList = ({ formations, setFormation }) => (
  <div style={{flexDirection: 'row'}}>
    {formations.map(formation =>
      <Formation {...formation} onSelect={setFormation} />
    )}
  </div>

);

export default FormationList;
