import React from 'react';
import { Provider, defaultTheme } from '@adobe/react-spectrum';
import SimpleTodoApp from './SimpleTodoApp';

function SimpleApp() {
  return (
    <Provider theme={defaultTheme}>
      <SimpleTodoApp />
    </Provider>
  );
}

export default SimpleApp;
