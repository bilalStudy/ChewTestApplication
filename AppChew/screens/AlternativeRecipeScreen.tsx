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
  ScrollView,
} from 'react-native';
import { recipeApi } from '../api/recipeApi';
import TextInputWithIcon from './TextInputWithIcon';
import Recipe from '../interfaces/IRecipe';
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";

const AlternativeRecipeScreen = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showIngredients, setShowIngredients] = useState(false);
  const [showProcedure, setShowProcedure] = useState(false);
  const route = useRoute()
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [isFromAnnouncementScreen, setIsFromAnnouncementScreen] = useState(false);

  useEffect(() => {
    const fetchRecipes = async () => {
      const allRecipes = await recipeApi.listAll();
      const filteredRecipes = allRecipes.filter((recipe: Recipe) =>
        recipe.dishname.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setRecipes(filteredRecipes);
    };
    fetchRecipes();
  }, [searchTerm]);

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

  useEffect(() => {
    if (isFocused && route.params) {
      const { selectedData } = route.params || {};
      setSearchTerm(selectedData || '');
    }
  }, [route.params]);

  useEffect(() => {
    if (!isFocused) {
      setSearchTerm('');
    }
  }, [isFocused]);

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

  const renderProcedureSteps = (procedure: string) => {
    const steps = procedure.split(',');
    return (
      <View style={styles.stepsContainer}>
        {steps.map((step, index) => (
          <View key={index} style={styles.stepContainer}>
            <View style={styles.stepNumberBox}>
              <Text style={styles.stepNumberText}>{index + 1}</Text>
            </View>
            <Text style={styles.step}>{step.trim()}</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <TextInputWithIcon
          value={searchTerm}
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
          <ScrollView contentContainerStyle={styles.modalContainer}>
            <ImageBackground
              style={styles.selectedRecipeImageBackground}
              source={{ uri: selectedRecipe.picture }}
            ></ImageBackground>
            <View style={styles.recipeInfoContainer}>
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
            {showProcedure && (
              <View>
                <Text style={styles.sectionTitle}>Procedure:</Text>
                {renderProcedureSteps(selectedRecipe.guide)}
              </View>
            )}
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </ScrollView>
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
    height: '35%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  recipeName: {
    color: 'white',
    fontSize: 18,
    marginTop: '65%',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  modalContainer: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: 'white',
  },
  selectedRecipeImageBackground: {
    resizeMode: 'cover',
    width: '100%',
    height: 200,
    marginBottom: 16,
  },
  recipeInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  selectedRecipeName: {
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  button: {
    flex: 1,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  halfButton: {
    marginHorizontal: 4,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#F86D47',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: '10%'
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  stepsContainer: {
    marginBottom: 16,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  stepNumberBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgb(248, 109, 71)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  stepNumberText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  step: {
    flex: 1,
    fontSize: 16,
  },
});

export default AlternativeRecipeScreen;
