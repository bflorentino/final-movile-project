import {createUserWithEmailAndPassword,
        updateProfile
    } from 'firebase/auth'

import { auth, db, storage } from './Firebase.config'

import { addDoc, 
    collection, 
    getDocs, 
    query, 
    where } from 'firebase/firestore';

import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import uuid from 'react-native-uuid' 
import { fileToBlob } from '../helpers/loadImage';

export const registerUser = async(userName, email, password, picUrl) => {

    const { user } = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(
        user, 
        {
           displayName: userName,
           photoURL: picUrl
       })
  
     return (
      {
         uid: user.uid,
         nombre: user.displayName,
         photoURL: user.photoURL
      }
     )
}

export const addLeftDataFromUser = async (user) => {

    const toAdd = {
          nombre: user.name,
          apellido: user.lastName,
          email: user.email,
          photoURL: user.url
    }
    
    try{
          await addDoc(collection(db, "users"), toAdd)
          return true
       }
       catch(e){
          console.log(e)
          return false
       }
}

export const addImage = async(image, path) =>{
    let url = null;

    if(image !== null){

        try{
            const imagesRef = ref(storage, `${path ? path : 'post-images'}/${uuid.v4()}`)
            const blob = await fileToBlob(image)
            await uploadBytes(imagesRef, blob)
            url = await getDownloadURL(imagesRef)
        }catch(e){
            console.log(e)
            return null
        }
    }
    return url
}