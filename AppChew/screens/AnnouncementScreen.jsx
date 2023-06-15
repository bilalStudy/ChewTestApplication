import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { announcementApi } from '../api/announcementApi';
import { AuthContext } from '../context/AuthContext';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Card } from 'react-native-paper';
import { Calendar } from 'react-native-calendars';

const AnnouncementScreen = ({ Event }) => {
  const { currentUser } = useContext(AuthContext);
  const [classAnnouncements, setClassAnnouncements] = useState([]);
  const [schoolAnnouncements, setSchoolAnnouncements] = useState([]);
  const [selected, setSelected] = useState('');

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused)
      (async () => {
        setSchoolAnnouncements(
          await announcementApi.findSchoolBased(currentUser.school)
        );
        setClassAnnouncements(
          await announcementApi.findSchoolClassBased(
            currentUser.school,
            currentUser.gradeclass
          )
        );
      })();
  }, [isFocused]);

  const handleItemPress = (item) => {
    import('../MainContainer').then((module) => {
      const MainContainer = module.default;
      navigation.navigate('Recipies', { selectedData: item.recipeName });
    });
  };

  const renderItem = ({ item }) => (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handleItemPress(item)}>
        <Card style={styles.card}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.recipeName}>Oppskrift: {item.recipeName}</Text>
          <Text style={styles.authorName}>Lærer: {item.authorName}</Text>
          <Text style={styles.published}>Publisert: {item.startTime}</Text>
          <Text style={styles.deadline}>Frist: {item.endTime}</Text>
        </Card>
      </TouchableOpacity>
    </View>
  );

  const handleEventPress = () => {
    navigation.navigate('Event');
  };

  function CustomCalender(props) {
    return (
      <Calendar
        onDayPress={(day) => {
          setSelected(day.dateString);
        }}
        markedDates={{
          [selected]: {
            selected: true,
            disableTouchEvent: true,
            selectedDotColor: 'orange',
          },
        }}
        current={'2023-06-14'}
        style={{
          borderWidth: 1,
          borderColor: 'gray',
          height: 350,
        }}
      />
    );
  }

  function SchoolAnnouncements(props) {
    return (
      <View>
        <FlatList
          ListHeaderComponent={CustomCalender}
          data={schoolAnnouncements}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
        />
        <TouchableOpacity style={styles.gangbutton} onPress={handleEventPress}>
          <Text>Create event</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function ClassAnnouncements(props) {
    return (
      <FlatList
        ListHeaderComponent={CustomCalender}
        data={classAnnouncements}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    );
  }

  function AnnouncementsBasedOnRole(props) {
    const userRole = currentUser.role;
    if (userRole === 'teacher') {
      return <SchoolAnnouncements />;
    } else if (userRole === 'pupil') {
      return <ClassAnnouncements />;
    } else {
      return (
        <Text>
          You either dont have access to this, or we havent had the time to
          implement this for you. sorry!
        </Text>
      );
    }
  }
  return (
    <View>
      <AnnouncementsBasedOnRole />
    </View>
  );
};

export default AnnouncementScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#ecf0f1',
  },
  gangbutton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'orange',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  card: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    padding: 20,
    borderRadius: 10,
    height: 225,
    width: '100%',
    backgroundColor: '#0ad5b8',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  description: {
    fontSize: 18,
    paddingBottom: 5,
  },
  recipeName: {
    fontSize: 15,
    fontWeight: 'bold',
    justifyContent: 'flex-end',
    paddingBottom: 5,
  },
  authorName: {},
  published: {},
  deadline: {},
});
