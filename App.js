import React from 'react';

// FILES
import {Provider} from 'react-redux';
import {store} from './src/store';
import Login from './src/containers/Login';
import Navigation from './src/navigation/stackNav';

const App = () => {
  console.disableYellowBox = true;
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};
export default App;
