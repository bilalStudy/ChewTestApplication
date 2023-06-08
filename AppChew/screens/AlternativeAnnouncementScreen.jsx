import react from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Agenda} from "react-native-calendars";
import {useState} from "react/index";
import {Card, Avatar} from 'react-native-paper';


const ScheduleScreen = () => {
    const [items, setItems] = useState({});



            return(
        <View style={{flex:1}}>
        <Agenda
            items={items}
            loadItemsForMonth={loadItems}
            selected={'2023-06-07'}
            renderItem={renderItem}
        />
        </View>
    )
}

export default ScheduleScreen;