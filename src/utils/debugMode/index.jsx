import React from 'react';
import JSONViewer from 'react-json-viewer';
import Tether from 'react-tether';
import { compose } from 'recompose';
import localModule from '../localModule';
import debugModule from './module';

const sanitize = ({children: _, ... restProps }) => restProps;

const addDebugMode = () => Component => {
  const TetheredComponent = ({
    wrapper = 'div',
    hovering: { active },
    actions: { setActive, setInactive },
    ...props
  }) => (
    // include some conditional here that checks if we're in DEV mode
    <Tether
      renderElementTag={wrapper}
      attachment="top center"
      constraints={[
        {
          to: 'window',
          attachment: 'together',
          pin: true,
        },
      ]}
    >
      <span onMouseOver={setActive} onMouseOut={setInactive}>
        <Component
          {...props}
        />
      </span>
      {active &&
        <div style={{ backgroundColor: 'white', width: 'auto' }}>
          <JSONViewer json={sanitize(props)} />
        </div>
      }
    </Tether>
  );

  // return TetheredComponent;
  return localModule(debugModule)(TetheredComponent);
  };

  export default addDebugMode;
