/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import axios from 'axios';
import { globalStyles } from '../styles/global';
import * as ImagePicker from "expo-image-picker";


function Register({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';

  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [name, onChangeName] = useState('');
  const [address, onChangeAddress] = useState('');
  const [phone, onChangePhone] = useState('');
  const [username, onChangeUsername] = useState('');
  const [password, onChangePassword] = useState('');
  const [photo, setPhoto] = useState(null);

  const selectFile = async () => {
    try {
      let res = await ImagePicker.launchImageLibraryAsync({
        quality: 1,
      });
      console.log(res)
      setPhoto(res.assets[0])
      console.log(photo)
    } catch (err) {
      console.log(err)
      setPhoto(null)
    }
  };

  const handleRegister = async () => {
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('address', address);
    formData.append('phone', phone);
    formData.append('username', username);
    formData.append('password', password);
    formData.append('pic_url', photo);

    try {
      const res = await axios.post('http://kedokteran.htd-official.com/api/v1/register', formData, {
        headers:{
          'accept': 'application/json',
          'Content-Type':'multipart/form-data',
        }
      })
      console.log(res)
      setMessage("Register Sukses")
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message)
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
        setErrorMessage(error.message)
      }
      console.log(error.config);
    }
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              textAlign: 'center',
              paddingVertical: 24,
            }}>
            Welcome to HosterWeb
          </Text>

          <Text>{message}</Text>
          <Text>{errorMessage}</Text>

          <TextInput
            style={globalStyles.input}
            placeholder="Nama..."
            placeholderTextColor={'#333'}
            onChangeText={onChangeName}
            value={name}
          />

          <TextInput
            style={globalStyles.input}
            placeholder="Username..."
            placeholderTextColor={'#333'}
            onChangeText={onChangeUsername}
            value={username}
          />

          <TextInput
            style={globalStyles.input}
            placeholder="Password..."
            placeholderTextColor={'#333'}
            onChangeText={onChangePassword}
            value={password}
            secureTextEntry={true}
          />

          <TextInput
            style={globalStyles.input}
            placeholder="Alamat..."
            placeholderTextColor={'#333'}
            onChangeText={onChangeAddress}
            value={address}
          />

          <TextInput
            style={globalStyles.input}
            placeholder="No.HP/WA..."
            placeholderTextColor={'#333'}
            onChangeText={onChangePhone}
            value={phone}
            keyboardType={'phone-pad'}
          />

          <Image source={{uri: photo?.uri}} style={{width:150, height:150}}/>

          <CustomButton text={'Select Photo'} onPress={selectFile} />
          <CustomButton text={'Daftar'} onPress={handleRegister} />
          <CustomButton text={'Login'} onPress={()=>navigation.navigate('Login')} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Register;
