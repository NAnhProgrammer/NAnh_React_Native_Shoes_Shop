import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { createBottomTabNavigator, BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import Home from './homeBottomTabs/Home';
import Favorite from './homeBottomTabs/Favorite';
import Cart from './homeBottomTabs/Cart';
import Account from './homeBottomTabs/Account';

import AntDesign from 'react-native-vector-icons/AntDesign';

import { useTheme } from '../components/Theme/MyTheme'

import LocalData from '../LocalData'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useDispatch, useSelector } from 'react-redux';
import { getFavorite } from '../redux/actions/FavoriteAction';
import { getCart } from '../redux/actions/CartAction';
import { RootState } from '../redux/store';


type MenuParamList = {
    Menu: { account: string };
    Home: undefined;
    Favorite: undefined;
    Cart: undefined;
    Account: undefined;
};

type MenuProps = BottomTabScreenProps<MenuParamList, 'Menu'>;

const Tab = createBottomTabNavigator();

const Menu: React.FC<MenuProps> = ({ route }) => {
    const { theme, changeTheme } = useTheme()
    const [account, setAccount] = React.useState<Object | null>(null)
    const [isLoading, setIsLoading] = React.useState(true)

    const dispatch = useDispatch()

    const checkAccountData = async () => {
        try {
            const valueAccount = await AsyncStorage.getItem('accountData')
            if (valueAccount !== null) {
                const ret = await LocalData.load({
                    key: 'accountData',
                    autoSync: true,
                    syncInBackground: true,
                    syncParams: {
                        extraFetchOptions: {
                            // blahblah
                        },
                        someFlag: true
                    }
                });
                setAccount(ret.account)
                console.log('accc id: ', ret.account.id)
            } else {
                setAccount(route.params.account)
            }
        } catch (error) {
            console.warn(error.message);
        } finally {
            setIsLoading(false); // Kết thúc quá trình tải dữ liệu
        }
    };

    React.useEffect(() => {
        checkAccountData();
    }, []);

    if (isLoading) {
        // Hiển thị nội dung tải lên khi dữ liệu đang được tải
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
                <ActivityIndicator size="large" color={theme === 'light' ? "#000000" : '#fafafa'} />
            </View>
        );
    }

    if (!account) {
        return null; // Trả về null nếu không có tài khoản
    }

    dispatch(getFavorite({ idUser: account.id }))
    dispatch(getCart({ idUser: account.id }))

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: '#0097fb',
                tabBarInactiveTintColor: theme === 'light' ? '#838383' : '#fff',
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: theme === 'light' ? '#ffffff' : '#1e1e1e',
                    position: 'absolute'
                },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = 'home';
                    } else if (route.name === 'Favorite') {
                        iconName = 'hearto';
                    } else if (route.name === 'Cart') {
                        iconName = 'shoppingcart';
                    } else if (route.name === 'Account') {
                        iconName = 'user';
                    }

                    return <AntDesign name={iconName} size={size} color={color} />;
                }
            })}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                initialParams={{ account }}
                options={{ headerShown: false }}
            />
            <Tab.Screen
                name="Favorite"
                component={Favorite}
                initialParams={{ account }}
                options={{ headerShown: false }}
            />
            <Tab.Screen
                name="Cart"
                component={Cart}
                initialParams={{ account }}
                options={{ headerShown: false }}
            />
            <Tab.Screen
                name="Account"
                component={Account}
                initialParams={{ account }}
                options={{ headerShown: false }}
            />
        </Tab.Navigator>
    );
}

export default Menu;
