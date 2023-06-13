import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button, Platform } from 'react-native';
import { announcementApi } from '../api/announcementApi';
import { AuthContext } from '../context/AuthContext';

const AnnouncementScreen = () => {
  const { currentUser } = useContext(AuthContext);
  const [announcements, setAnnouncements] = useState([]);
  const [classAnnouncements, setClassAnnouncements] = useState([]);

  useEffect(() => {
    (async () => {
      setAnnouncements(await announcementApi.listAll());
      //setAnnouncements(await announcementApi.findSchoolBased(currentUser.school));
      //setClassAnnouncements(await announcementApi.findSchoolClassBased(currentUser.school, currentUser.schoolClass))

      console.log(announcements);
    })();
  }, []);

  return (
    <View>
      {announcements.map((a) => (
        <View key={a.id}>
          <Text>
            {a.title} ewohnioenwfweon {a.description}{' '}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default AnnouncementScreen;
