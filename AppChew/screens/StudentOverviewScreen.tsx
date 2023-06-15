import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { userApi } from '../api/userApi';

const StudentOverviewScreen: React.FC = () => {
  const { currentUser } = useContext(AuthContext);
  const [students, setStudents] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    (async () => {
      setStudents(await userApi.findPupils(currentUser.school, 'pupil'));
    })();
  }, []);

  const filteredStudents = students.filter(
    (student) =>
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
      <View style={styles.profileContainer}>
        <Text style={styles.profileText}>Name: {currentUser.fullname}</Text>
        <Text style={styles.profileText}>Role: {currentUser.role}</Text>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#fff"
        />
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={filteredStudents}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F08C2D',
  },
  profileContainer: {
    padding: 10,
    backgroundColor: '#F08C2D',
  },
  profileText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchContainer: {
    padding: 10,
    backgroundColor: '#F08C2D',
  },
  searchInput: {
    height: 40,
    backgroundColor: '#FFA64C',
    borderRadius: 5,
    paddingHorizontal: 10,
    color: '#fff',
  },
  listContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  studentContainer: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#F08C2D',
    borderRadius: 5,
  },
});

export default StudentOverviewScreen;
