import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Button, Platform} from 'react-native';
import {Calendar, LocaleConfig, Agenda} from 'react-native-calendars';
import moment from 'moment';
import 'moment-timezone'

/*
LocaleConfig.locales['nb'] = {
    monthNames: [
        'Januar',
        'Februar',
        'Mars',
        'April',
        'Mai',
        'Juni',
        'Juli',
        'August',
        'September',
        'Oktober',
        'November',
        'Desember'
    ],
    monthNamesShort: ['Jan.', 'Feb.', 'Mars', 'April', 'Mai', 'Juni', 'Juli.', 'Aug', 'Sept.', 'Okt.', 'Nov.', 'Des.'],
    dayNames: ['Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag', 'Søndag'],
    dayNamesShort: ['Man.', 'Tir.', 'Ons.', 'Tor.', 'Fre.', 'Lør.', 'Søn.'],
    today: "Idag"
}

LocaleConfig.defaultLocaler = 'nb';

 */


const eventArray = [
    {
        title: "Plan for uke 10",
        description: "i denne uken skal vi lage mr lee nudler !!!",
        publisherName: "samantha",
    },
    {
        title: "Plan for uke 12",
        description: "i denne uken skal vi lage laks !!!",
        publisherName: "samantha",
    }
]


const AnnouncementScreen = () => {
    const [selected, setSelected] = useState('');

    return (
        <View>
            <Calendar
                onDayPress={day => {
                    setSelected(day.dateString);
                    console.log(day.dateString);
                }}
                markedDates={{
                    [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
                }}
            />
            <Agenda/>
        </View>
    );
}

export default AnnouncementScreen;