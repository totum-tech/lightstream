import React, { PropTypes } from 'react';
import debugMode from '../../utils/debugMode';
import { Heading } from 'rebass';
import { Card, Button } from 'antd';

class Formation extends React.Component {
  render() {
    const { name, bulbs, onSelect } = this.props;
    return (
      <Card title={name}>
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
