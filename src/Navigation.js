import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'

import Register from './Screens/Register';
import AddTransaction from './Screens/AddTransaction';

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return(
           <NavigationContainer>
           <Tab.Navigator>
               <Tab.Screen name="Home" component={Register} />
               <Tab.Screen name="New"  component={AddTransaction} />
           </Tab.Navigator>
         </NavigationContainer>
    )
}

export default Tabs;