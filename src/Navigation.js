import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'

import Register from './Screens/Register';
import AddTransaction from './Screens/AddTransaction';
import Login from './Screens/Login';
import Home from './Screens/Home';
import ViewTransactions from './Screens/ViewTransactions';
import { useContext } from 'react';
import { authContext } from '../Context/authContext';
import { TouchableHighlight } from 'react-native';
import { logoutFirebase } from './firebase/Firebase-auth';
import { types } from '../Context/authReducer';
import ProfileBar from './Components/profileBar';
import { StatusBar } from 'expo-status-bar';

const Tab = createBottomTabNavigator();

const Tabs = () => {

    const { auth, dispatch } = useContext(authContext)

    const onLogout = () => {
        logoutFirebase()
        .then(
            dispatch({type: types.LOGOUT})
        )
    }

    return(
        <NavigationContainer>

            {
                auth.uid 
                ?
                <>

                    <Tab.Navigator screenOptions={{ headerShown: false }} >                    
                        <Tab.Screen name="Transaction" component={AddTransaction} />
                        <Tab.Screen name="ViewTransactions" component={ViewTransactions} />
                    </Tab.Navigator>
                </>
                :
                    <Tab.Navigator screenOptions={{ headerShown: false }}>
                        <Tab.Screen name="Login" component={Login} />
                        <Tab.Screen name="Registro" component={Register} />
                    </Tab.Navigator>
            }
            
        </NavigationContainer>
    )
}

export default Tabs;