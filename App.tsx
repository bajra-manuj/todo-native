/* eslint-disable react/react-in-jsx-scope */
import {Provider} from 'react-redux';
import persistStore from 'redux-persist/es/persistStore';
import {PersistGate} from 'redux-persist/integration/react';
import Home from './Screens/Home';
import Store from './store/store';

let persistor = persistStore(Store);
function App(): JSX.Element {
  return (
    <>
      <Provider store={Store}>
        <PersistGate persistor={persistor}>
          <Home />
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
