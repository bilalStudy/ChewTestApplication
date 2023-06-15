import { useNavigation } from '@react-navigation/core';
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import {
  Image,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Linking,
} from 'react-native';
import { userApi } from '../api/userApi';
import Icon from 'react-native-vector-icons/FontAwesome';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    const result = await userApi.userLogin(username, password);
    if (result) {
      console.log('logged in');
      login(result.user);
      navigation.navigate('Home');
    } else {
      Alert.alert('Error', 'Invalid username or password');
    }
  };

  const handleGmailLogin = () => {
    const gmailURL =
      'https://accounts.google.com/InteractiveLogin/identifier?ffgf=1&hl=no&ifkv=Af_xneEEjqf6VexAmJKOpYOa8UiJxHf4jud4VxvRTvfvid_inTD72Q2ceXZvVa4Hlis4cSqeVCYgJA&flowName=GlifWebSignIn&flowEntry=ServiceLogin';
    Linking.openURL(gmailURL);
  };

  const handleFacebookLogin = () => {
    const facebookURL =
      'https://www.facebook.com/?stype=lo&jlou=AfdV5zPc9lnUv5el35GQ6KkyrTFizOICu_BMZdHfeacLV8zwvVASYMAtGbQllVP6rWRmAZ2_r2I9BPpaOf-SbkbRNekYFBrttQyfxSc74QO17g&smuh=8945&lh=Ac_Z2MWGlNx3R1zHYpg&wtsid=rdr_02x6eiLgYPh0HDP9l';
    Linking.openURL(facebookURL);
  };

  const handleFeideLogin = () => {
    const feideURL =
      'https://idp.feide.no/simplesaml/module.php/feide/selectorg?org=feide.osloskolen.no&AuthState=_1e49c0c4f6da6fdd89c7eb066238cdf0fd0ec75e6d%3Ahttps%3A%2F%2Fidp.feide.no%2Fsimplesaml%2Fsaml2%2Fidp%2FSSOService.php%3Fspentityid%3Dhttp%253A%252F%252Fauth2.skoleplattform.no%252Fadfs%252Fservices%252Ftrust%26RelayState%3De53b6094-5507-4ecb-8da3-6dccefce25fc%26cookieTime%3D1686138897';
    Linking.openURL(feideURL);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/chewlogo1.jpg')}
          style={styles.image}
        />
      </View>
      <View>
        <Text style={styles.title}>
          <Text style={styles.boldText}> Hello,</Text>
          {'\n'} <Text style={styles.lightBoldText}> Welcome Back!</Text>
        </Text>
      </View>

      <Text style={styles.text}>School mail / Username</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Username"
          value={username}
          onChangeText={setUsername}
        />
      </View>

      <Text style={styles.text}>Enter Password</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <TouchableOpacity onPress={() => {}}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Sign in →</Text>
      </TouchableOpacity>

      <Text style={styles.orSignInWithText}>──── Or sign in With ────</Text>

      <View style={styles.socialIconsContainer}>
        <TouchableOpacity onPress={handleGmailLogin} style={styles.socialIcon}>
          <Icon name="google" size={30} color="green" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleFacebookLogin}
          style={styles.socialIcon}
        >
          <Icon name="facebook-square" size={30} color="blue" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleFeideLogin} style={styles.socialIcon}>
          <Icon name="question-circle" size={30} color="darkblue" />
        </TouchableOpacity>
      </View>

      <Text style={styles.createAccountText}>
        Don’t have an account? <Text style={styles.signUpText}>Sign up</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    marginBottom: '15%',
  },
  imageContainer: {
    alignItems: 'flex-end',
  },
  image: {
    width: '30%',
    height: 100,
    resizeMode: 'contain',
  },
  boldText: {
    fontStyle: 'normal',
    fontSize: 40,
    fontWeight: 'bold',
  },
  lightBoldText: {
    fontSize: 30,
    fontWeight: 'normal',
    color: 'black',
  },
  text: {
    marginBottom: 5,
    marginLeft: '5%',
  },
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  input: {
    height: 60,
    width: '90%',
    borderColor: '#D9D9D9',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
  },
  button: {
    height: 60,
    width: '90%',
    marginTop: 20,
    backgroundColor: '#F86D47',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 20,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    alignSelf: 'center',
  },
  forgotPasswordText: {
    color: 'orange',
    marginLeft: '5%',
  },
  orSignInWithText: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 10,
    marginTop: 10,
  },
  socialIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  socialIcon: {
    marginHorizontal: 10,
    borderColor: '#dddd',
    borderWidth: 2,
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
  },
  createAccountText: {
    textAlign: 'center',
    fontSize: 15,
    marginTop: 20,
  },
  signUpText: {
    color: 'orange',
  },
});

export default LoginScreen;
