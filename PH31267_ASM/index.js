/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Welcome from './screens/Welcome';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Menu from './screens/Menu'
import ShoesDetail from './screens/details/ShoesDetail'

AppRegistry.registerComponent(appName, () => App);
