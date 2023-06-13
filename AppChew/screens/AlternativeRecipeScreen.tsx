import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Modal,
  StyleSheet,
  FlatList,
  Dimensions,
} from 'react-native';
import { recipeApi } from '../api/recipeApi';
import TextInputWithIcon from './TextInputWithIcon';

interface Recipe {
  id: string;
  dishname: string;
  picture: string;
  guide: string;
  description: string;
  nutrition: string;
  allergens: string;
  ingredients: string;
  kitchentools: string;
  category: string;
  culture: string;
}

const AlternativeRecipeScreen = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showIngredients, setShowIngredients] = useState(false);
  const [showProcedure, setShowProcedure] = useState(false);

  useEffect(() => {
    (async () => {
      const allRecipes = await recipeApi.listAll();
      const filteredRecipes = allRecipes.filter(
        (recipe: { dishname: string }) => {
          return recipe.dishname
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        }
      );
      setRecipes(filteredRecipes);
    })();
  }, [searchTerm]);

  const handleRecipePress = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setShowIngredients(true);
    setShowProcedure(false);
  };

  const closeModal = () => {
    setSelectedRecipe(null);
  };

  const handleSearch = (text: string) => {
    setSearchTerm(text);
  };

  const renderRecipeItem = ({ item }: { item: Recipe }) => (
    <TouchableOpacity
      style={styles.recipeItem}
      onPress={() => handleRecipePress(item)}
    >
      <ImageBackground
        style={styles.recipeImageBackground}
        source={{ uri: item.picture }}
      >
        <View style={styles.imageOverlay} />
        <Text style={styles.recipeName}>{item.dishname}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <TextInputWithIcon
          onChangeText={handleSearch}
          icon="search"
          placeholder="Search recipe"
        />
      </View>
      <Text style={styles.title}>Search Result</Text>
      <FlatList
        data={recipes}
        renderItem={renderRecipeItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.recipeList}
      />
      <Modal visible={selectedRecipe !== null} onRequestClose={closeModal}>
        {selectedRecipe && (
          <View style={styles.modalContainer}>
            <ImageBackground
              style={styles.selectedRecipeImageBackground}
              source={{ uri: selectedRecipe.picture }}
            ></ImageBackground>
            <View
              style={{
                flexDirection: 'row',
                padding: 10,
                justifyContent: 'space-between',
              }}
            >
              <Text style={styles.selectedRecipeName}>
                {selectedRecipe.dishname}
              </Text>
              <Text>(13k Reviews)</Text>
            </View>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[
                  styles.button,
                  styles.halfButton,
                  {
                    backgroundColor: showIngredients
                      ? '#F86D47'
                      : 'transparent',
                  },
                ]}
                onPress={() => {
                  setShowIngredients(!showIngredients);
                  setShowProcedure(false);
                }}
              >
                <Text
                  style={[
                    styles.buttonText,
                    { color: showIngredients ? 'white' : '#F86D47' },
                  ]}
                >
                  Ingredients
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  styles.halfButton,
                  {
                    backgroundColor: showProcedure ? '#F86D47' : 'transparent',
                  },
                ]}
                onPress={() => {
                  setShowProcedure(!showProcedure);
                  setShowIngredients(false);
                }}
              >
                <Text
                  style={[
                    styles.buttonText,
                    { color: showProcedure ? 'white' : '#F86D47' },
                  ]}
                >
                  Procedure
                </Text>
              </TouchableOpacity>
            </View>
            {showIngredients && (
              <View>
                <Text>Ingredients: {selectedRecipe.ingredients}</Text>
                <Text>Nutrition: {selectedRecipe.nutrition}</Text>
              </View>
            )}
            {showProcedure && <Text>Guide: {selectedRecipe.guide}</Text>}
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        )}
      </Modal>
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const itemWidth = (windowWidth - 32) / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  searchBarContainer: {
    marginLeft: 10,
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    marginLeft: 20,
  },
  recipeList: {
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  recipeItem: {
    width: itemWidth,
    margin: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },
  recipeImageBackground: {
    resizeMode: 'cover',
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '30%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  recipeName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginTop: '65%',
    paddingHorizontal: 10,
    zIndex: 1,
  },
  modalContainer: {
    flex: 1,
    padding: 10,
    marginTop: '15%',
  },
  selectedRecipeImageBackground: {
    resizeMode: 'cover',
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedRecipeName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    paddingHorizontal: 10,
  },
  closeButton: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    padding: 10,
    backgroundColor: 'orange',
    borderRadius: 15,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  button: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#F86D47',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '20%',
    marginBottom: '5%',
  },
  halfButton: {
    width: '45%',
  },
});

export default AlternativeRecipeScreen;
