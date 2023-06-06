import React, {createContext, useState} from "react"
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [userToken, setUserToken] = useState(null)
    const [currentUser, setCurrentUser] = useState('')

    const login = async (user) => {
        setCurrentUser(user)
        setUserToken('secret');
        await AsyncStorage.setItem('userToken', 'secret')
        setIsLoading(false);
        /*
        console.log(userToken)

        console.log(currentUser)
        console.log(currentUser.username)
        console.log(currentUser.fullname)
        console.log(currentUser.role)

         */
    }

    const logout = () => {
        setUserToken(null);
        setIsLoading(false)
        AsyncStorage.removeItem('userToken', )
    }

    const isLoggedIn = async () => {
        try{
            setIsLoading(true)
            let userToken = await AsyncStorage.getItem('userToken');
            setIsLoading(false)
        }catch (e){
            console.log(`logged error ${e}`)
        }
    }
    return (
        <AuthContext.Provider value={{login, logout, isLoading, userToken, currentUser}}>
            {children}
        </AuthContext.Provider>
    )
}