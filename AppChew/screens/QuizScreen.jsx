import {Image, StyleSheet, Text, View} from 'react-native'
import React from 'react'
import MainContainer from "../App";


const QuizScreen = () => {
    return (
        <View style={{marginTop: 15}}>
            <Image
                style={{height: 300, width: "100%", resizeMode: 'contain'}}
                source={require('../assets/quizlogo.png')}/>
            <Text>hello</Text>


        </View>
    )
}

export default QuizScreen

const styles = StyleSheet.create({})