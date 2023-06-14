import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View, Text, Button, Platform, Alert, TouchableOpacity, TextInput, ScrollView} from 'react-native';
import 'moment-timezone'
import {recipeApi} from "../api/recipeApi";
import {AuthContext} from "../context/AuthContext";
import {announcementApi} from "../api/announcementApi";
import {SelectList} from "react-native-dropdown-select-list";


const EventScreen = () => {
    const {currentUser} = useContext(AuthContext);
    const [recipes, setRecipes] = useState([]);
    const [recipe, setRecipe] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [school, setSchool] = useState('');
    const [schoolClass, setSchoolClass] = useState('');
    const [recipeName, setRecipeName] = useState('');
    const [authorName, setAuthorName] = useState('');


    useEffect(() => {
        (async () => {
            const allRecipes = await recipeApi.listAll();

            let recipeArray = allRecipes.map((recipe) => {
                return {key: recipe.id, value: recipe.dishname}
            })



            setRecipes(recipeArray);

        })();
    }, []);


    const handleEvent = async () => {
        setAuthorName(currentUser._id)
        setSchool(currentUser.school)
        setRecipeName(recipe)

        const school = currentUser.school;
        const authorName = currentUser.fullname;
        const recipeName = recipe;

        console.log(recipes)
        console.log(title)
        console.log(description)
        console.log(startTime)
        console.log(endTime)
        console.log(school)
        console.log(schoolClass)
        console.log(recipeName)
        console.log(authorName)

        const result = await announcementApi.insert({
            title,
            description,
            startTime,
            endTime,
            school,
            schoolClass,
            recipeName,
            authorName

        });
        if (result) {
            console.log("post created")
        } else {
            Alert.alert('Error', 'Invalid username or password');
        }
    }

    /*
    const CustomTextInputField = (value) => {
        return (
            <View>
                <Text style={styles.inputLabel}>{value}</Text>
                <TextInput
                    style={styles.input}
                    placeholder={`${value}*`}
                    value={value}
                    onChangeText={text => this.value.setState(text)}
                />
            </View>
        )
    }

     */

    const SchoolClassData = [
        {key: '1', value: '9a'},
        {key: '2', value: '9b'},
        {key: '3', value: '9c'},
    ]

    return (
        <View style={styles.container}>
            <ScrollView>
                <Text>{currentUser._id}</Text>
                <Text>{currentUser.school}</Text>
                <Text style={styles.inputLabel}>Tittel</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Tittel*"
                    value={title}
                    onChangeText={text => setTitle(text)}
                />
                <Text>{title}</Text>
                <Text style={styles.inputLabel}>Beskrivelse</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Beskrivelse*"
                    value={description}
                    onChangeText={text => setDescription(text)}
                />
                <Text>{description}</Text>
                <Text style={styles.inputLabel}>Start Tid</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Start Tid*"
                    value={startTime}
                    onChangeText={text => setStartTime(text)}
                />
                <Text>{startTime}</Text>
                <Text style={styles.inputLabel}>Frist</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Frist"
                    value={endTime}
                    onChangeText={text => setEndTime(text)}
                />
                <Text>{endTime}</Text>
                <Text style={styles.inputLabel}>Klasse</Text>
                <SelectList
                    setSelected={(val) => setSchoolClass(val)}
                    data={SchoolClassData}
                    save="value"
                />
                <Text>{schoolClass}</Text>
                <Text style={styles.inputLabel}>Oppskrift</Text>
                <SelectList key={recipe._id}
                            onSelect={() => alert(recipe)}
                            setSelected={setRecipe}
                            data={recipes}
                            save={"value"}
                />


                <Text>{recipe} and {recipe.key}{recipes.value}</Text>
                <TouchableOpacity onPress={handleEvent} style={styles.button}>
                    <Text style={styles.buttonText}>Create Event</Text>
                </TouchableOpacity>
                <View style={styles.space}></View>
            </ScrollView>
        </View>
    );
}

export default EventScreen;

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
        width: '98%',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 15,
    },
    space: {
        paddingBottom: 20,
        height: '25%',
        width: 10,
    },
    inputLabel: {
        marginBottom: 10,
        fontSize: 20,
        justifyContent: "center",
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
    icons: {
        borderWidth: 2,
        borderRadius: 10,
        paddingHorizontal: 30,
        paddingVertical: 10,
    },
});