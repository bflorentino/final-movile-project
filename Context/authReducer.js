export const types =  {
    LOGIN: 'authentication-login',
    LOGOUT: 'authentication-logout',
}

export const authentication = (state = {}, action) => {

    switch(action.type){
        
        case (types.LOGIN):
            return {
                    uid: action.payload.uid,
                    user: action.payload.user,
                    email: action.payload.email,
                    photoURL: action.payload.photoURL
            };

        case (types.LOGOUT):
            return {}

        default:
            return state 
    }
}