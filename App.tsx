/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {Provider} from 'react-redux';
import Home from './Screens/Home';
import Store from './store/store';

function App(): JSX.Element {
  return (
    <>
      <Provider store={Store}>
        <Home />
      </Provider>
    </>
  );
}

export default App;
