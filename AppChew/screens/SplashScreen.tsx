import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/background2.jpg')}
        style={styles.backgroundImage}
      />
      <View style={styles.overlay} />

      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/chewlogo.jpg')}
          style={styles.logoImage}
        />
        <Text style={{ color: '#FFFFFF', fontSize: 20, fontWeight: '900' }}>
          100+ Premium Recipes
        </Text>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.text}>Get</Text>
        <Text style={styles.text}>Cooking</Text>
        <Text
          style={{
            color: '#FFFFFF',
            fontSize: 20,
            fontWeight: '400',
            marginTop: '3%',
          }}
        >
          Simple way to find Tasty Recipe
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>Start Cooking →</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  backgroundImage: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
    borderRadius: 10,
    position: 'absolute',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Adjust the opacity value as desired
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    resizeMode: 'contain',
    width: 400,
    height: 200,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: '25%',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 50,
    fontWeight: '800',
  },
  button: {
    height: 60,
    width: '65%',
    backgroundColor: '#F86D47',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: '30%',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    alignSelf: 'center',
  },
});

export default SplashScreen;
