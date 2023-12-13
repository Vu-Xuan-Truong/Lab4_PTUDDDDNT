// EditService.js
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

const EditService = ({ navigation }) => {
  
  const [editedServiceName, setEditedServiceName] = useState('');
  const [editedServiceDescription, setEditedServiceDescription] = useState('');
  const [editedServiceTime, setEditedServiceTime] = useState('');
  const [editedServiceMoney, setEditedServiceMoney] = useState('');

   const updateService = async () => {
    try {
      // Cập nhật thông tin dịch vụ trong Firestore
      await firestore().collection('services').doc(IhKqyxNRgJAAyPUNlfDR).update({
        name: editedServiceName,
        description: editedServiceDescription,
        time: editedServiceTime,
        money: editedServiceMoney,
        // Cập nhật các trường khác tùy thuộc vào yêu cầu của bạn
      });
      console.log('Dịch vụ đã được cập nhật thành công trong Firestore');
      // Hiển thị thông báo thành công
      alert('Dịch vụ đã được cập nhật thành công trong Firestore');

      // Sau khi cập nhật thành công, chuyển đến màn hình "Admin"
      navigation.navigate('Admin');
    } catch (error) {
      console.error('Lỗi khi cập nhật dịch vụ trong Firestore:', error);

      // Hiển thị thông báo lỗi
      alert('Lỗi khi cập nhật dịch vụ trong Firestore');
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cập Nhật Dịch Vụ</Text>
      <TextInput
        style={styles.input}
        placeholder="Tên dịch vụ"
        value={editedServiceName}
        onChangeText={(text) => setEditedServiceName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Mô tả dịch vụ"
        value={editedServiceDescription}
        onChangeText={(text) => setEditedServiceDescription(text)}
      />
        <TextInput
        style={styles.input}
        placeholder="Thời Gian Sử Dụng dịch vụ"
        value={editedServiceTime}
        onChangeText={(time) => setEditedServiceTime(time)}
      />
            <TextInput
        style={styles.input}
        placeholder="Giá Tiền"
        value={editedServiceMoney}
        onChangeText={(money) => setEditedServiceMoney(money)}
      />
      <Button title="Cập nhật Dịch Vụ" onPress={updateService} />
      <Button title="Quay Lại" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title:{
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 16,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default EditService;
