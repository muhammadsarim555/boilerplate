import React from 'react';

// FILES
import {Provider} from 'react-redux';
import {store} from './src/store';
import Login from './src/containers/Login';

const App = () => {
  console.disableYellowBox = true;
  return (
    <Provider store={store}>
      <Login />
    </Provider>
  );
};
export default App;
