import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
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

  useEffect(() => {
    (async () => {
      const allRecipes = await recipeApi.listAll();

      // Filter recipes based on searchTerm
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
      <Image style={styles.recipeImage} source={{ uri: item.picture }} />
      <Text style={styles.recipeName}>{item.dishname}</Text>
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
      <Text style={{ marginLeft: 20, fontSize: 20, marginBottom: 10 }}>
        Search Result
      </Text>
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
            <Image
              style={styles.selectedRecipeImage}
              source={{ uri: selectedRecipe.picture }}
            />
            <Text>{selectedRecipe.dishname}</Text>
            <Text>Guide: {selectedRecipe.guide}</Text>
            <Text>Description: {selectedRecipe.description}</Text>
            <Text>Nutrition: {selectedRecipe.nutrition}</Text>
            <Text>Allergens: {selectedRecipe.allergens}</Text>
            <Text>Ingredients: {selectedRecipe.ingredients}</Text>
            <Text>Kitchen Tools: {selectedRecipe.kitchentools}</Text>
            <Text>Category: {selectedRecipe.category}</Text>
            <Text>Culture: {selectedRecipe.culture}</Text>
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
  box: {
    backgroundColor: '#F86D47',
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  recipeList: {
    alignItems: 'flex-start',
    paddingHorizontal: 8,
  },
  recipeItem: {
    width: itemWidth,
    margin: 8,
  },
  recipeImage: {
    resizeMode: 'cover',
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  recipeName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  selectedRecipeImage: {
    resizeMode: 'contain',
    width: '100%',
    height: '50%',
  },
  closeButton: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    padding: 10,
    backgroundColor: 'orange',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AlternativeRecipeScreen;
