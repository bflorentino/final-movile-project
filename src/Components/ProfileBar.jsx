import React, { useContext } from 'react'
import { Image, Text, TouchableHighlight, View } from 'react-native'
import { authContext } from '../../Context/authContext'
import user from '../../assets/user.png'
import { logoutFirebase } from '../firebase/Firebase-auth'
import { types } from '../../Context/authReducer'

const ProfileBar = () => {

    const { auth, dispatch } = useContext(authContext)

    const onLogout = () => {
        logoutFirebase()
        .then(res => {
            dispatch({type: types.LOGOUT})
        })
        .catch(e => {
            console.log(e)
        })
    }

    return (
    <View style={{display:'flex', height:55 ,flexDirection:'row', justifyContent:'flex-end', alignItems:'center', paddingRight:10, paddingVertical:10, backgroundColor:'#159' }}>
        
        {
            auth.uid &&
            <>
                <Text style={{color:'#fff'}}>{auth.user}</Text>
                <Image source={auth.photoURL || user } style={{width:40, height:40, borderRadius:15,marginLeft:5}} />
        
                <TouchableHighlight onPress={onLogout} style={{marginLeft: 20}} >
                    <Text style={{color:'#fff'}}>
                        Logout
                    </Text>
                </TouchableHighlight>
            </>
        }
        
    </View>
  )
}

export default ProfileBar