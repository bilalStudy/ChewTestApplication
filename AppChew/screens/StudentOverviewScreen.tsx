import React, { useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { userApi } from '../api/userApi';
import { Card } from 'react-native-paper';

const StudentOverviewScreen: React.FC = () => {
  const { currentUser } = useContext(AuthContext);
  const [students, setStudents] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    (async () => {
      setStudents(await userApi.findPupils(currentUser.school, 'pupil'));
    })();
  }, []);

  const filteredStudents = students.filter((student) =>
    student.fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.school.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.studentContainer}>
      <Text>{item.fullname}</Text>
      <Text>{item.gradeclass}</Text>
      <Text>{item.school}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#fff" // Change the placeholder text color
        />
      </View>
      <View style={styles.listContainer}>
        <FlatList data={filteredStudents} renderItem={renderItem} keyExtractor={(item) => item._id} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F08C2D', // Change the background color to orange
  },
  searchContainer: {
    padding: 10,
    backgroundColor: '#F08C2D', // Change the background color to orange
  },
  searchInput: {
    height: 40,
    backgroundColor: '#FFA64C', // Change the background color to a lighter shade of orange
    borderRadius: 5,
    paddingHorizontal: 10,
    color: '#fff', // Change the text color to white
  },
  listContainer: {
    flex: 1,
    backgroundColor: '#fff', // Change the background color of the list container to white
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  studentContainer: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#F08C2D', // Change the background color of each student container to orange
    borderRadius: 5,
  },
});

export default StudentOverviewScreen;
