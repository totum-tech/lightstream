import React from 'react';

const wrapLogin = Component => {
  class HueLogin extends React.Component {
    constructor(props) {
      super(props);
    }

    handleLogin = () => {
      this.props.onLogin('react-hue');
    }

    render() {
      return (
        <Component
          onLogin={this.handleLogin}
          {...this.props}
        />
      );
    }
  }
  return HueLogin;
};

export default wrapLogin;
