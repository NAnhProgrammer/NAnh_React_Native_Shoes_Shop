import React, { createContext, useContext } from "react";
import LocalData from "../../LocalData";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext()

export const MyTheme: React.FC = ({ children }) => {
    const [theme, setTheme] = React.useState<String>('light')


    const getTheme = async () => {
        const value = await AsyncStorage.getItem('theme')

        if (value !== null) {
            LocalData.load({
                key: 'theme',
                autoSync: true,
                syncInBackground: true,
                syncParams: {
                    extraFetchOptions: {
                        // blahblah
                    },
                    someFlag: true
                }
            }).then(ret => {
                // found data go to then()
                setTheme(ret.themeSetting)
            }).catch(err => {
                // any exception including data not found
                // goes to catch()
                console.warn(err.message);

            });
        }
    }

    React.useEffect(() => {
        getTheme()
    }, [])

    const changeTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
        LocalData.save({
            key: 'theme',
            data: {
                themeSetting: theme === 'light' ? 'dark' : 'light'
            },
        });
    }

    return (
        <ThemeContext.Provider value={{ theme, changeTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    return useContext(ThemeContext)
}