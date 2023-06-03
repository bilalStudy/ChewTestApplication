import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  Image,
  StyleSheet,
} from 'react-native';
import UserApi from '../services/userApi';
import { Colors } from 'react-native/Libraries/NewAppScreen';

interface LoginProps {
  onLoginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [imageSource, setImageSource] = useState(
    require('../../assets/chewlogo-removebg-preview.png')
  );

  const handleLogin = async () => {
    try {
      const userData = await UserApi.getTeacherUser(username, password);
      // Handle successful login, store user data, etc.
      console.log('User Data:', userData);
      onLoginSuccess();
    } catch (error) {
      console.error('Login Error:', error);
      Alert.alert('Error', 'Invalid username or password');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={imageSource} style={styles.image}></Image>
      <Text style={styles.title}>Hello, Welcome Back</Text>

      <Text style={styles.inputLabel}>School mail / Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <Text style={styles.inputLabel}>Enter Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Text style={styles.innerText}>Forgot Password?</Text>
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Sign in</Text>
      </TouchableOpacity>
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
});

export default Login;
