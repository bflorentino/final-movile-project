import { useState } from "react"

export const useForm = (initialState = {}) => {

    const [formValues, setFormValues] = useState(initialState)
    
    const handleInputChanges = (name, value) =>{
        setFormValues({
            ...formValues,
            [ name ]: value
        })
    }

    const handleCheckChanges = (name, checked)=>{
        
        setFormValues({
            ...formValues,
            [ name ]: checked
        })
    }
    
    const reset = () => {
        setFormValues(initialState)
    }
    
    return [formValues, handleInputChanges, handleCheckChanges, reset]

}