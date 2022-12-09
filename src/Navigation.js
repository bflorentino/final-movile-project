import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'

import Register from './Screens/Register';
import AddTransaction from './Screens/AddTransaction';
import Login from './Screens/Login';
import Home from './Screens/Home';
import ViewTransactions from './Screens/ViewTransactions';

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return(
        <NavigationContainer>
           <Tab.Navigator>
               <Tab.Screen name="Login" component={Login} />
               <Tab.Screen name="Registro" component={Register} />
               <Tab.Screen name="Home" component={Home} />
               <Tab.Screen name="Transaction" component={AddTransaction} />
               <Tab.Screen name="ViewTransactions" component={ViewTransactions} />
           </Tab.Navigator>
        </NavigationContainer>
    )
}

export default Tabs;