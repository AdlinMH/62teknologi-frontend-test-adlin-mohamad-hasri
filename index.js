/**
 * @format
 */

import { AppRegistry, LogBox } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';

const IGNORED_LOGS = [
  'The native module for Flipper seems unavailable. Please verify that',
]

LogBox.ignoreLogs(IGNORED_LOGS)

AppRegistry.registerComponent(appName, () => App);
