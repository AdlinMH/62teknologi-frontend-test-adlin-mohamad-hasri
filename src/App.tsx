import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PersistGate } from 'redux-persist/lib/integration/react';

import ToastCustom from '@/components/ToastCustom'

import { store, persistor } from './store';
import ApplicationNavigator from './navigators/Application';
import { enableLatestRenderer } from 'react-native-maps';

import './translations';

enableLatestRenderer()

const App = () => {
  // setup sentry and reactotron config
  useEffect(() => {
    if (__DEV__) {
      import('@/config/reactotronConfig').then(async ({ default: test }) => {
        const testResult = await test()
        return testResult
      })
    }
  }, [])

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        {/**
         * PersistGate delays the rendering of the app's UI until the persisted state has been retrieved
         * and saved to redux.
         * The `loading` prop can be `null` or any react instance to show during loading (e.g. a splash screen),
         * for example `loading={<SplashScreen />}`.
         * @see https://github.com/rt2zz/redux-persist/blob/master/docs/PersistGate.md
         */}
        <PersistGate loading={null} persistor={persistor}>
          <ApplicationNavigator />
        </PersistGate>

        <ToastCustom />
      </SafeAreaProvider>
    </Provider>
  )
}

export default App;
