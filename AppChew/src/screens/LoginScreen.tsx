import React from 'react';
import { View, StyleSheet } from 'react-native';
import Login from '../components/Login';

const LoginScreen: React.FC = () => {
  const handleLoginSuccess = () => {
    // Navigate to the home screen or perform any other actions
    console.log('Login successful');
  };

  return (
    <View style={styles.container}>
      <Login onLoginSuccess={handleLoginSuccess} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginScreen;
