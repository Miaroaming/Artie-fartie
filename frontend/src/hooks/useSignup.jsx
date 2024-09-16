import axios from "axios";
import { useState } from "react";
import {useAuthContext} from './useAuthContext'

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const {dispatch} = useAuthContext()

    const signup = async (email,password) => {
        setIsLoading(true)
        setError(null)
    
        try {
            const response = await axios.post('http://localhost:4000/api/user/signup', 
                { email, password }, 
                { headers: { 'Content-Type': 'application/json' } }
            );

            if (response.status !== 200) {
                setIsLoading(false)
                setError(error.response.data.error)
            }
            if (response.status === 200) {
                localStorage.setItem('user', JSON.stringify(response.data))
                dispatch({type: 'LOGIN', payload: response.data})
    
                setIsLoading(false)
            }
            
            console.log(response);
        } catch (error) {
            console.error(error.response.data.error);
            setError(error.response.data.error)
            setIsLoading(false)
        }
    }

    return {signup, isLoading, error}
}