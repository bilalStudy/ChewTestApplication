import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import MainContainer from '../App';
import { recipeApi } from '../api/recipeApi';
import TextInputWithIcon from './TextInputWithIcon';

const RecipeSearchScreen = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (text: string) => {
    setSearchTerm(text);
  };

  useEffect(() => {
    (async () => {
      const allRecipes = await recipeApi.listAll();

      // Filter recipes based on searchTerm
      const filteredRecipes = allRecipes.filter((recipe: { dishname: string }) => {
        if (!recipe.dishname) {
          return false;
        }
        return recipe.dishname
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      

      setRecipes(filteredRecipes);
    })();
  }, [searchTerm]);

  return (
    <View style={{ flex: 1, marginTop: 10 }}>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.title}>Search Recipe</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          margin: 0,
          justifyContent: 'space-around',
        }}
      >
        <TextInputWithIcon
          onChangeText={handleSearch}
          icon="search"
          placeholder="search recipe"
        />
        <View style={styles.box}>
          <View style={{}}></View>
          <View></View>
        </View>
      </View>
      <Text style={{ marginLeft: 20, fontSize: 20, marginBottom: 10 }}>
        Search Result
      </Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      {recipes
        .filter((x) => x.dishname && x.dishname.toLowerCase().includes(searchTerm.toLowerCase()))
        .map((x) => (
          <View key={x.id} style={{ width: '50%', padding: 10 }}>
            <View
              style={{
                padding: 10,
                backgroundColor: 'white',
                borderColor: '#ccc',
                borderWidth: 1,
                borderRadius: 10,
                alignItems: 'center',
              }}
            >
              <Image
                style={{
                  resizeMode: 'contain',
                  width: '100%', // adjust this value as needed
                  height: 150, // you may need to adjust this
                }}
                source={{
                  uri: `${x.picture}`,
                }}
              />
              {x.dishname && <Text>dishname : {x.dishname}</Text>}
            </View>
          </View>
        ))}

      </View>
    </View>
  );
};

export default RecipeSearchScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  box: {
    backgroundColor: '#F86D47',
    width: 40,
    height: 40,
    borderRadius: 10,
  },
});
