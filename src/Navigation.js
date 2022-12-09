import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'

import Register from './Screens/Register';
import AddTransaction from './Screens/AddTransaction';
import Login from './Screens/Login';
import ViewTransactions from './Screens/ViewTransactions';
import { useContext } from 'react';
import { authContext } from '../Context/authContext';
import { logoutFirebase } from './firebase/Firebase-auth';
import { types } from '../Context/authReducer';

import registroTrans from '../assets/registroTrans.png'
import TransView from '../assets/TransView.png'

import { Image } from 'react-native';

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
                        <Tab.Screen 
                            name="Transaction" 
                            component={AddTransaction} 
                            options={{title:"Nueva Transacción", tabBarIcon:({}) =>(
                                <Image source={registroTrans} style={{height:25, width:25}} />
                            )}}    
                        />
                        <Tab.Screen 
                            name="ViewTransactions" 
                            component={ViewTransactions}
                            options={{title:"Tus Transacciónes", tabBarIcon:({}) => (
                                <Image source={TransView} style={{height:25, width:25}}  />
                            )}}
                         />
                    </Tab.Navigator>
                </>
                :
                    <Tab.Navigator screenOptions={{ headerShown: false }}>
                        <Tab.Screen  
                            name="Login" 
                            component={Login} 
                            options={{title:"Iniciar Sesión"}}
                        />
                        <Tab.Screen 
                            name="Registro" 
                            component={Register}
                            options={{title:"Nueva Cuenta"}}
                        />
                    </Tab.Navigator>
            }
            
        </NavigationContainer>
    )
}

export default Tabs;