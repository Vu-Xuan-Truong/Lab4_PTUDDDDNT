// ServiceDetail.js
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import {EditService} from './EditService';

import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';


const ServiceDetail = ({ route }) => {
  const { service } = route.params;
  const navigation = useNavigation();

  const deleteService = async () => {
    try {
      await firestore().collection('services').doc(service.id).delete();
      console.log('Dịch vụ đã được xóa thành công khỏi Firestore');
      navigation.navigate('Admin');
    } catch (error) {
      console.error('Lỗi khi xóa dịch vụ khỏi Firestore:', error);
      alert('Lỗi khi xóa dịch vụ khỏi Firestore');
    }
  };

  const editService = () => {
    navigation.navigate('EditService');
  };

  const confirmDeleteService = () => {
    Alert.alert(
      'Xác nhận',
      'Bạn có chắc muốn xóa dịch vụ này?',
      [
        { text: 'Hủy bỏ', style: 'cancel' },
        { text: 'Xóa', onPress: deleteService, style: 'destructive' },
      ],
      { cancelable: true }
    );
  };

  const options = [
    { label: 'Edit', value: 'edit' },
    { label: 'Delete', value: 'delete' },
  ];

  const handleDropdownChange = (item) => {
    if (item.value === 'edit') {
      editService();
    } else if (item.value === 'delete') {
      deleteService();
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Service Detail</Text>
      <Text style={{ fontSize: 22 }}>Tên: {service.name}</Text>
      <Text style={{ fontSize: 22 }}>Mô Tả: {service.description}</Text>
      <Text style={{ fontSize: 22 }}>Thời Gian: {service.time}</Text>
      <Text style={{ fontSize: 20 }} >Giá Tiền: {service.money}</Text>
      {/* <TouchableOpacity style={styles.moreOptions} onPress={editService}>
        <Text style={styles.moreOptionsText}>Edit</Text>
      </TouchableOpacity> */}
      <Button style={styles.goback} title="Quay Lại" onPress={() => navigation.goBack()} />

       {/* <TouchableOpacity style={styles.moreOptions} onPress={confirmDeleteService}>
        <Text style={[styles.moreOptionsText, { color: 'black' }]}>Delete</Text>
      </TouchableOpacity> */}

      <MenuProvider style={styles.menu}>
      <Menu>
      <MenuTrigger text='•••' />
      <MenuOptions>
        <MenuOption onSelect={editService}>
        <Text style={{color: 'red'}}>Edit</Text>
        </MenuOption>
        <MenuOption onSelect={confirmDeleteService} >
          <Text style={{color: 'red'}}>Delete</Text>
        </MenuOption>
        <MenuOption onSelect={() => alert(`Not called`)} disabled={true} text='Disabled' />
      </MenuOptions>
    </Menu>
      </MenuProvider>
    </View> 
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  moreOptions: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  moreOptionsText: {
    fontSize: 16,
    color: 'blue',
  },
  goBack:{
  bottom: 60,
  top: 50,
  },
  menu:{
    position: 'absolute',
    bottom: 650,
    right: 1,
    width: 40,
    height: 40,
    backgroundColor: 'pink',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ServiceDetail;
