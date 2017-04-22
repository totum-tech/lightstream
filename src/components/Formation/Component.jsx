import React, { PropTypes } from 'react';
import debugMode from '../../utils/debugMode';
import { Card, Heading, Button } from 'rebass';

class Formation extends React.Component {
  render() {
    const { name, bulbs, onSelect } = this.props;
    return (
      <Card
        rounded
        width={256}
      >
        <Heading level={2} size={2}>
          {name}
        </Heading>
        <Button onClick={() => onSelect({ name, bulbs })}>
          Activate!
        </Button>
      </Card>
    );
  }
}

Formation.propTypes = {

};

export default debugMode()(Formation);
