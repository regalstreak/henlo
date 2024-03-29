import React from 'react';
import { View } from 'react-native';

import Main from './screens/main/Main.js';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import main from './library/store/reducers';

const store = createStore(main);

const App = () => {
  return (
    <Provider store={store}>
      <View>
        <Main />
      </View>
    </Provider>
  );
};

export default App;

/*
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});
*/
