import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import { Alert } from 'react-native'

export const loadImageFromGallery = async(array) => {
    const response = { status: false, image:null}

    const resultPermissions = await Permissions.askAsync(Permissions.CAMERA)

    if(resultPermissions.status === "denied"){
        Alert.alert("Debes de dar permiso para acceder a tu galeria")
        return response
    }

    const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect:array
    })
    if(result.canceled){
        return response
    }

    response.status = true
    response.image = result.assets[0]
    return response
}

export const fileToBlob = async(path)=>{

    const file = await fetch(path)

    const blob = await file.blob()

    return blob

}