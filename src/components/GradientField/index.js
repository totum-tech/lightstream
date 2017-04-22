import React from 'react';
import { Observable } from 'rxjs';

class GradientField extends React.Component {
  componentDidMount() {
    const colorContext = this.gradientField.getContext('2d');

    this.buildGradient(colorContext);
    Observable.fromEvent(document, 'mousemove')
      .map((event) => {
        debugger;
        return {
          colorEventX: event.pageX - colorContext.offset.left,
          colorEventY: event.pageY - colorContext.offset.top,
        }
      })
      .subscribe((event) => console.log('MOVING', event))
  }

  buildGradient = (colorContext) => {
    const colorGradient = colorContext.createLinearGradient(0, 0, this.gradientField.width, 0);

    // Create color gradient
    colorGradient.addColorStop(0,    "rgb(255,   0,   0)");
    colorGradient.addColorStop(0.15, "rgb(255,   0, 255)");
    colorGradient.addColorStop(0.33, "rgb(0,     0, 255)");
    colorGradient.addColorStop(0.49, "rgb(0,   255, 255)");
    colorGradient.addColorStop(0.67, "rgb(0,   255,   0)");
    colorGradient.addColorStop(0.84, "rgb(255, 255,   0)");
    colorGradient.addColorStop(1,    "rgb(255,   0,   0)");

    // Apply gradient to canvas
    colorContext.fillStyle = colorGradient;
    colorContext.fillRect(0, 0, colorContext.canvas.width, colorContext.canvas.height);

    // // Create semi transparent gradient (white -> trans. -> black)
    // const bwGradient = colorContext.createLinearGradient(0, 0, 0, this.gradientField.height);
    // bwGradient.addColorStop(0,   "rgba(255, 255, 255, 1)");
    // bwGradient.addColorStop(0.5, "rgba(255, 255, 255, 0)");
    // bwGradient.addColorStop(0.5, "rgba(0,     0,   0, 0)");
    // bwGradient.addColorStop(1,   "rgba(0,     0,   0, 1)");
    //
    // // Apply gradient to canvas
    // colorContext.fillStyle = bwGradient;
    // colorContext.fillRect(0, 0, colorContext.canvas.width, colorContext.canvas.height);

  }

  render() {
    const { style } = this.props;
    return (
      <canvas
        ref={node => this.gradientField = node}
        style={style}
      />
    );
  }
}

export default GradientField;
