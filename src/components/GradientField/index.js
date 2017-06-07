import React from 'react';
import { Observable, DOM } from 'rxjs';

const s = 50;

class GradientField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      maxX: window.innerWidth,
      maxY: window.innerHeight,
    }
  }

  componentDidMount() {
    const { maxX, maxY } = this.state;

    Observable
    .fromEvent(document, 'mousemove')
    .subscribe(({ pageX, pageY }) => {
      const horizontal = (pageX / maxX) * 360;
      const vertical = ((pageY / maxY) * 10000) / 100;

      this.setState({ horizontal, vertical });
    });

    Observable
    .fromEvent(window, 'resize')
    .subscribe(() => {
      this.setState({
        maxX: window.innerWidth,
        maxY: window.innerHeight,
      });
    });
  }

  componentDidUpdate() {
    const { horizontal, vertical } = this.state;

    const body = document.querySelector('body');
    body.style.backgroundColor = `hsl(${horizontal}, ${s}%, ${vertical}%)`;
  }

  render() {
    const { style } = this.props;
    return (
      <div>
      </div>
    );
  }
}

export default GradientField;
