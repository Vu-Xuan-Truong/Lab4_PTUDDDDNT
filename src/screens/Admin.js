import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import { BottomNavigation } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import Setting from './Setting';

const Tab = createMaterialBottomTabNavigator();


const Admin = () => {
  const [services, setServices] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    // Truy vấn danh sách dịch vụ từ Firestore
    const unsubscribe = firestore()
      .collection('services')
      .onSnapshot((querySnapshot) => {
        const servicesList = [];
        querySnapshot.forEach((documentSnapshot) => {
          servicesList.push({
            id: documentSnapshot.id,
            ...documentSnapshot.data(),
          });
        });
        setServices(servicesList);
      });

    // Hủy đăng ký lắng nghe khi component bị hủy
    return () => unsubscribe();
  }, []);

  const navigateToAddNewService = () => {
    navigation.navigate('AddNewService');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh sách dịch vụ</Text>

      <FlatList
        data={services}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.serviceItem}
            onPress={() => navigation.navigate('ServiceDetail', { service: item })}
          >

                <Text style={{ fontSize: 20 }} >{item.name}</Text>
                <Text style={{ fontSize: 20 }} >{item.description}</Text>
                <Text style={{ fontSize: 20 }} >{item.time}</Text>
                <Text style={{ fontSize: 20 }} >{item.money}</Text>

          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={styles.addButton} onPress={navigateToAddNewService}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

    </View>

  );
  function menu() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Admin} />
        <Tab.Screen name="Settings" component={Setting} />
      </Tab.Navigator>
    );
  }
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  serviceItem: {
    bottom: -50,
    marginBottom: 70,
    padding: 15,
    backgroundColor: 'silver',
  },
  addButton: {
    position: 'absolute',
    bottom: 620,
    right: 16,
    width: 50,
    height: 50,
    backgroundColor: 'pink',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },
});

export default Admin;
