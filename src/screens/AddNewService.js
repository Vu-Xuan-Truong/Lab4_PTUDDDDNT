import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet,Text,TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Admin from './Admin';

const AddNewService = ({ navigation }) => {
  const [serviceName, setServiceName] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');
  const [serviceTime, setServiceTime] = useState('');
  const [serviceMoney, setServiceMoney] = useState('');

  const addNewService = async () => {
    try {
      // Thêm dịch vụ mới vào Firestore
      await firestore().collection('services').add({
        name: serviceName,
        description: serviceDescription,
        time: serviceTime,
        money: serviceMoney,
        // Thêm các trường khác tùy thuộc vào yêu cầu của bạn
      });

      console.log('Dịch vụ đã được thêm thành công vào Firestore');
      // Hiển thị thông báo thành công
      alert('Dịch vụ đã được thêm thành công vào Firestore');

      // Sau khi thêm thành công, chuyển đến màn hình "Admin"
      navigation.navigate('Admin');
    } catch (error) {
      console.error('Lỗi khi thêm dịch vụ vào Firestore:', error);

      // Hiển thị thông báo lỗi
      alert('Lỗi khi thêm dịch vụ vào Firestore');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thêm Dịch Vụ</Text>
      <TextInput
        style={styles.input}
        placeholder="Tên Dịch Vụ"
        value={serviceName}
        onChangeText={(text) => setServiceName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Mô Tả Dịch Vụ"
        value={serviceDescription}
        onChangeText={(text) => setServiceDescription(text)}
      />
        <TextInput
        style={styles.input}
        placeholder="Thời Gian Sử Dụng Dịch Vụ"
        value={serviceTime}
        onChangeText={(time) => setServiceTime(time)}
      />
        <TextInput
        style={styles.input}
        placeholder="Giá Tiền"
        value={serviceMoney}
        onChangeText={(money) => setServiceTime(money)}
      />
      <Button title="Thêm Dịch Vụ" onPress={addNewService} />

      <Button  title="Quay Lại" onPress={() => navigation.goBack()} />
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
  goBack:{
  },
});

export default AddNewService;
