import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'

import Register from './Screens/Register';

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return(
           <NavigationContainer>
           <Tab.Navigator>
               <Tab.Screen name="Home" component={Register} />
           </Tab.Navigator>
         </NavigationContainer>
    )
}

export default Tabs;