import { Platform } from 'react-native'

export const baseUrl = Platform.OS === 'android' ?
    'http://10.0.2.2:3000' : 'http://localhost:3000';



export const userApi = {


    getLoggedInUser: async () => {
        const res = await fetch(`${baseUrl}/api/users/logged-in`);

        return res.ok ? await res.json() : null;
    },
    registerNewUser:async (user) => {
        const res = await fetch(`${baseUrl}/api/users/register`, {
            method : "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        })

        return res.ok;
    },

    userLogin : async (username, password) => {
        const res = await fetch(`${baseUrl}/api/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
            }),
        })

        return res.ok ? await res.json() : null
    },
}