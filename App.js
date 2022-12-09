import Navigation from './src/Navigation';
import { useReducer } from 'react';
import { authContext } from './Context/authContext';
import { authentication} from './Context/authReducer';

import {  View, Text } from 'react-native';

import { StatusBar } from 'expo-status-bar';
import ProfileBar from './src/Components/profileBar';

export default function App() {

  const [ auth, dispatch] = useReducer(authentication, {});

  return (
  <authContext.Provider value={{auth, dispatch}}>

      <ProfileBar />
      <StatusBar  />
      <Navigation />
    </authContext.Provider>
  
  );
}
