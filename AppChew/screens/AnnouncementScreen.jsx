import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View, Text, Button, Platform} from 'react-native';
import {announcementApi} from "../api/announcementApi";
import {useParams} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";


const AnnouncementScreen = () => {
    const {currentUser} = useContext(AuthContext);
    const [announcements, setAnnouncements] = useState([])
    const [classAnnouncements, setClassAnnouncements] = useState([])

    useEffect(() => {
        (async () => {
            setAnnouncements(await announcementApi.findTeacherBased(currentUser.school));
            //setClassAnnouncements(await announcementApi.findPupilBased(currentUser.school, currentUser.schoolClass))
        })();
    }, []);

    return (
        <View>
            {announcements.map(x => (
                <View>
                    <Text>{x.title} {x.description}</Text>
                </View>
            ))}
        </View>
    );
}

export default AnnouncementScreen;