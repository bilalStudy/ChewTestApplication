import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View, Text, Button, Platform, Alert, TouchableOpacity} from 'react-native';
import 'moment-timezone'
import {recipeApi} from "../api/recipeApi";
import {AuthContext} from "../context/AuthContext";
import {userApi} from "../api/userApi";
import {announcementApi} from "../api/announcementApi";


const EventScreen = () => {
    const [recipes, setRecipes] = useState([]);
    const [recipe, setRecipe] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [school, setSchool] = useState('');
    const [schoolClass, setSchoolClass] = useState('');
    const [recipeId, setRecipeId] = useState('');
    const [authorId, setAuthorId] = useState('');

    const {currentUser} = useContext(AuthContext);


    useEffect(() => {
        (async () => {
            setRecipes(await recipeApi.listAll());
        })();
    }, []);

    const handleEvent = async () => {
        setAuthorId(currentUser._id)
        setSchool(currentUser.school)
        setRecipeId('6480c2726d5a6af3e221aaa1')
        setSchoolClass('9b')
        setTitle('velkommen til oppstartsuke 9b')
        setDescription('vi skal starte med å lage kebab til uken')
        setStartTime('2023-01-01')
        setEndTime('2023-02-01')
        const result = await announcementApi.insert({
            title,
            description,
            startTime,
            endTime,
            school,
            schoolClass,
            recipeId,
            authorId

        });
        if(result){
            console.log("post created")
        }else{
            Alert.alert('Error', 'Invalid username or password');
        }
    }

    return (
        <View>
            <Text>{currentUser._id}</Text>
            <Text>{currentUser.school}</Text>
            <TouchableOpacity onPress={handleEvent} style={styles.button}>
                <Text style={styles.buttonText}>Create Event</Text>
            </TouchableOpacity>
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
    icons: {
        borderWidth: 2,
        borderRadius: 10,
        paddingHorizontal: 30,
        paddingVertical: 10,
    },
});