import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Button, Platform} from 'react-native';
import {announcementApi} from "../api/announcementApi";
import { useParams } from "react-router-dom";


const AnnouncementScreen = () => {

    const [Announcements, setAnnouncements] = useState([])
    const [teacherAnnouncements, setTeacherAnnouncements] = useState([])

    useEffect(() => {
        (async () => {
            setAnnouncements(await announcementApi.listAll());
        })();
    }, []);

    return (
        <View>

        </View>
    );
}

export default AnnouncementScreen;