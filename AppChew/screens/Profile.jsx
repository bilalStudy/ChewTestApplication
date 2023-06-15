import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/core';

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const navigation = useNavigation();



  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <Image
        style={styles.avatar}
        source={{
          uri: 'https://thumbs.dreamstime.com/z/happy-kid-cooking-chef-vector-illustration-back-school-baking-cartoon-character-child-children-class-clipart-creative-cuisine-157366454.jpg',
        }}
      />
      <View style={styles.text}>
        <Text style={styles.name}>{currentUser.username} - {currentUser.fullname}</Text>
        <Text style={styles.school}>{currentUser.school} {currentUser.gradeclass}</Text>
        <Text style={styles.info}>{currentUser.role}</Text>

      </View>
      <View style={styles.body}>
        <View style={styles.bodyContent}>
          <TouchableOpacity style={styles.buttonContainer} onPress={logout}>
            <Text>Option 1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text>Option 2</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default Profile;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#F86D47',
    height: 170,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 100,
  },
  text: {
    alignItems: 'center',
    paddingTop: 50,
  },
  name: {
    fontSize: 22,
    color: '#00000',
    fontWeight: '600',
  },
  body: {
    marginTop: 30,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  info: {
    fontSize: 15,
    color: '#00000',
    marginTop: 10,
  },
  school: {
    fontSize: 16,
    color: '#00000',
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: '#696969',
    marginTop: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: '#F86D47',
  },
});
