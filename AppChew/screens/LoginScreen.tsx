import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import {Alert, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'
import { userApi } from '../api/userApi'




const LoginScreen = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigation = useNavigation()

    /*
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        if (user) {
          navigation.replace("Home")
        }
      })

      return unsubscribe
    }, [])

    */
    const handleSignUp = async () => {
    }

    const handleLogin = async () => {
        const result = await userApi.userLogin(username, password);
        if(result){
            console.log("logged in")
            navigation.navigate('Home')
        }else{
            Alert.alert('Error', 'Invalid username or password');
        }
    }


    return (


        <View style={styles.container}>
            {/* <Image source={imageSource} style={styles.image}></Image> */}
            <Text style={styles.title}>Hello, Welcome Back</Text>

            <Text style={styles.inputLabel}>School mail / Username</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={text => setUsername(text)}
            />
            <Text style={styles.inputLabel}>Enter Password</Text>
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={text =>setPassword(text)}
                secureTextEntry
            />
            <TouchableOpacity onPress={() => {}}>
                <Text style={styles.innerText}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogin} style={styles.button}>
                <Text style={styles.buttonText}>Sign in</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.icons}>
        <GoogleSvg width={120} height={120} />
      </TouchableOpacity> */}
        </View>
    )
}


export default LoginScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 50,
    },
    image: {
        width: 140,
        height: 70,
        marginBottom: 100,
        left: 130,
    },
    input: {
        height: 40,
        width: 300,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 15,
    },
    inputLabel: {
        marginBottom: 10,
    },
    button: {
        marginTop: 20,
        backgroundColor: '#F86D47',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
    innerText: {
        color: 'orange',
    },
    icons: {
        borderWidth: 2,
        borderRadius: 10,
        paddingHorizontal: 30,
        paddingVertical: 10,
    },
});