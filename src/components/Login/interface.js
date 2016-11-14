import React from 'react';

const wrapLogin = Component => {
  class HueLogin extends React.Component {
    render() {
      return (
        <Component {...this.props} />
      );
    }
  }
  return HueLogin;
};

export default wrapLogin;
