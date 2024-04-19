import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Welcome from './screens/Welcome';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Menu from './screens/Menu';
import MyProfile from './screens/homeBottomTabs/account/MyProfile';
import Setting from './screens/homeBottomTabs/account/Setting';
import DeviceInFormation from './screens/homeBottomTabs/account/DeviceInFormation';

import ShoesDetail from './screens/details/ShoesDetail'
import ThemeSetting from './screens/homeBottomTabs/account/setting/ThemeSetting';

import { MyTheme, useTheme } from './components/Theme/MyTheme'

import { Provider, useDispatch } from "react-redux";

const Stack = createNativeStackNavigator()

import LocalData from './LocalData'
import AsyncStorage from '@react-native-async-storage/async-storage';
import store from './redux/store';
import { getShoes } from './redux/actions/ShoesAction';
import { getTrademark } from './redux/actions/TrademarkAction';

const App = () => {
  return(
    <Provider store={store}>
      <Body/>
    </Provider>
  )
}

const Body = () => {
  const [initialRoute, setInitialRoute] = useState('Welcome');
  const [isLoading, setIsLoading] = useState(true)

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getShoes())
    dispatch(getTrademark())
  },[dispatch])

  const checkLoginStatus = async () => {
    try {
      const valueStatus = await AsyncStorage.getItem('loginStatus')
      if (valueStatus !== null) {
        const ret = await LocalData.load({
          key: 'loginStatus',
          autoSync: true,
          syncInBackground: true,
          syncParams: {
            extraFetchOptions: {
              // blahblah
            },
            someFlag: true
          }
        });
        if (ret.loginStatus == true) {
          setInitialRoute('Menu')
        } else {
          setInitialRoute('Login')
        }
      }else{
        LocalData.save({
          key: 'loginStatus',
          data: {
            loginStatus: false
          },
        });
      }
    } catch (error) {
      console.warn(error.message);
    } finally {
      setIsLoading(false); // Kết thúc quá trình tải dữ liệu
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  if (isLoading) {
    // Hiển thị nội dung tải lên khi dữ liệu đang được tải
    return null
  }

  return (
    <MyTheme>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={initialRoute}
          screenOptions={{
            headerShown: false,
            cardStyleInterpolator: ({ current, layouts }) => ({
              cardStyle: {
                opacity: current.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.5, 1], // Giảm độ trong suốt từ 0.5 đến 1
                }),
                transform: [
                  {
                    scale: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.8, 1], // Thu phóng từ 0.8 đến 1
                    }),
                  },
                ],
              },
            }),
          }}
        >
          <Stack.Screen name='Welcome' component={Welcome} options={{ headerShown: false }} />
          <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
          <Stack.Screen name='Signup' component={Signup} options={{ headerShown: false }} />
          <Stack.Screen name="Menu" component={Menu} options={{ headerShown: false }} />
          <Stack.Screen name="ShoesDetail" component={ShoesDetail} options={{ headerShown: false }} />
          <Stack.Screen name="MyProfile" component={MyProfile} options={{ headerShown: false }} />
          <Stack.Screen name="Setting" component={Setting} options={{ headerShown: false }} />
          <Stack.Screen name="DeviceInFormation" component={DeviceInFormation} options={{ headerShown: false }} />
          <Stack.Screen name="ThemeSetting" component={ThemeSetting} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </MyTheme>
  )
}

export default App