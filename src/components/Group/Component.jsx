import React, { PropTypes } from 'react';
import debugMode from '../../utils/debugMode';
import { Card, Heading, Container } from 'rebass';

class Group extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card style={{
         width: '300px'
       }}>
        <Container>
          <Heading>
            {this.props.name}
          </Heading>
          {this.props.children}
        </Container>
      </Card>
    );
  }
}

Group.propTypes = {
  name: PropTypes.string,
  selected: PropTypes.bool,
  on: PropTypes.bool,
  effect: PropTypes.oneOf(['none', 'colorloop']),
  brightness: PropTypes.number,
  hue: PropTypes.number,
  saturation: PropTypes.number,
  temperature: PropTypes.number,
  transitionTime: PropTypes.number,
};

export default debugMode()(Group);
