import Navigation from './src/Navigation';
import { useReducer } from 'react';
import { authContext } from './Context/authContext';
import { authentication} from './Context/authReducer';


export default function App() {

  const [ auth, dispatch] = useReducer(authentication, {});

  return (
    <authContext.Provider value={{auth, dispatch}}>
      <Navigation />
    </authContext.Provider>
  
  );
}
