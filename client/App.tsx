import React from 'react';
import {Provider} from 'react-redux';
import AppRoute from './navigations/navigator';
import {store} from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <AppRoute />
    </Provider>
  );
};

export default App;
