import Navigation from './src/Navigation';
import { useReducer } from 'react';
import { authContext } from './Context/authContext';
import { authentication} from './context/authReducer';


export default function App() {

  const [ auth, dispatch] = useReducer(authentication, {});

  return (
    <authContext.Provider value={{auth, dispatch}}>
      <Navigation />
    </authContext.Provider>
  
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
