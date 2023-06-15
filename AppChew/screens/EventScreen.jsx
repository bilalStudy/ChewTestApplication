import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { recipeApi } from '../api/recipeApi';
import { AuthContext } from '../context/AuthContext';
import { announcementApi } from '../api/announcementApi';
import { SelectList } from 'react-native-dropdown-select-list';

const EventScreen = () => {
  const { currentUser } = useContext(AuthContext);
  const [recipes, setRecipes] = useState([]);
  const [recipe, setRecipe] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [schoolClass, setSchoolClass] = useState('');

  useEffect(() => {
    const fetchRecipes = async () => {
      const allRecipes = await recipeApi.listAll();

      const recipeArray = allRecipes.map((recipe) => ({
        key: recipe.id,
        value: recipe.dishname,
      }));

      setRecipes(recipeArray);
    };

    fetchRecipes();
  }, []);

  const handleEvent = async () => {
    const school = currentUser.school;
    const authorName = currentUser.fullname;
    const recipeName = recipe;

    console.log(recipes);
    console.log(title);
    console.log(description);
    console.log(startTime);
    console.log(endTime);
    console.log(schoolClass);
    console.log(recipeName);
    console.log(authorName);

    const result = await announcementApi.insert({
      title,
      description,
      startTime,
      endTime,
      school,
      schoolClass,
      recipeName,
      authorName,
    });

    if (result) {
      console.log('post created');
      setTitle('');
      setDescription('');
      setStartTime('');
      setEndTime('');
      alert('Lecture Post Created');
    } else {
      Alert.alert('Error', 'Invalid username or password');
    }
  };

  const SchoolClassData = [
    { key: '1', value: '9a' },
    { key: '2', value: '9b' },
    { key: '3', value: '9c' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.inputLabel}>Tittel</Text>
        <TextInput
          style={styles.input}
          placeholder="Tittel*"
          value={title}
          onChangeText={setTitle}
        />
        <Text style={styles.inputLabel}>Beskrivelse</Text>
        <TextInput
          style={styles.input}
          placeholder="Beskrivelse*"
          value={description}
          onChangeText={setDescription}
        />
        <Text style={styles.inputLabel}>Publiserings dato</Text>
        <TextInput
          style={styles.input}
          placeholder="Start Tid*"
          value={startTime}
          onChangeText={setStartTime}
        />
        <Text style={styles.inputLabel}>Frist</Text>
        <TextInput
          style={styles.input}
          placeholder="Frist"
          value={endTime}
          onChangeText={setEndTime}
        />
        <Text style={styles.inputLabel}>Klasse</Text>
        <SelectList
          setSelected={setSchoolClass}
          data={SchoolClassData}
          save="value"
        />
        <Text style={styles.inputLabel}>Oppskrift</Text>
        <SelectList
          key={recipe._id}
          setSelected={setRecipe}
          data={recipes}
          save="value"
        />

        <TouchableOpacity onPress={handleEvent} style={styles.button}>
          <Text style={styles.buttonText}>Create Event</Text>
        </TouchableOpacity>
        <View style={styles.space}></View>
      </ScrollView>
    </View>
  );
};

export default EventScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    width: '98%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  inputLabel: {
    marginBottom: 10,
    fontSize: 20,
    justifyContent: 'center',
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
  space: {
    paddingBottom: 20,
    height: '25%',
    width: 10,
  },
});
