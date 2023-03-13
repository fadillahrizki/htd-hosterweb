/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
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
import * as yup from 'yup'
import { Formik } from 'formik';
import CustomButton from '../components/CustomButton';
import { StatusBar } from 'expo-status-bar';
import { API_URL } from '@env'

const RegisterSchema = yup.object({
  nama: yup.string().required(),
  username: yup.string().required(),
  password: yup.string().required(),
  alamat: yup.string().required(),
  phone: yup.string().required()
})


function Register({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';

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

  const handleRegister = async (values) => {

    console.log(values)
    
    const formData = new FormData();
    formData.append('name', values.nama);
    formData.append('address', values.alamat);
    formData.append('phone', values.phone);
    formData.append('username', values.username);
    formData.append('password', values.password);
    formData.append('pic_url', photo);

    try {
      const res = await axios.post(API_URL+'/register', formData, {
        headers:{
          'accept': 'application/json',
          'Content-Type':'multipart/form-data',
        }
      })
      console.log(res)
      Alert.alert("Berhasil", "Anda Berhasil Register!")
    } catch (error) {
      console.log(error)
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

      Alert.alert("Gagal", "Anda Gagal Register!")
    }
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <StatusBar backgroundColor="#ccc" />
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

          <Formik
            initialValues={{nama:'', username: '', password: '', alamat: '', phone: ''}}
            validationSchema={RegisterSchema}
            onSubmit={(values)=>{
              handleRegister(values)
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <View style={{
                flexDirection:'column',
                gap:20,
                width:'100%'
              }}>

                <TextInput
                  style={globalStyles.input}
                  placeholder="Nama..."
                  placeholderTextColor={'#333'}
                  onChangeText={handleChange('nama')} 
                  onBlur={handleBlur('nama')} 
                  value={values.nama}
                />

                <Text style={{...globalStyles.errorText, display: (errors.nama && touched.nama) ? 'flex' : 'none' }}>{errors.nama}</Text>

                <TextInput
                  style={globalStyles.input}
                  placeholder="Username..."
                  placeholderTextColor={'#333'}
                  onChangeText={handleChange('username')} 
                  onBlur={handleBlur('username')} 
                  value={values.username}
                />

                <Text style={{...globalStyles.errorText, display: (errors.username && touched.username) ? 'flex' : 'none' }}>{ errors.username}</Text>

                <TextInput
                  style={globalStyles.input}
                  placeholder="Password..."
                  placeholderTextColor={'#333'}
                  onChangeText={handleChange('password')} 
                  onBlur={handleBlur('password')} 
                  value={values.password}
                  secureTextEntry={true}
                />

                <Text style={{...globalStyles.errorText, display: (errors.password && touched.password) ? 'flex' : 'none' }}>{ errors.password}</Text>

                <TextInput
                  style={globalStyles.input}
                  placeholder="Alamat..."
                  placeholderTextColor={'#333'}
                  onChangeText={handleChange('alamat')} 
                  onBlur={handleBlur('alamat')} 
                  value={values.alamat}
                />

                <Text style={{...globalStyles.errorText, display: (errors.alamat && touched.alamat) ? 'flex' : 'none' }}>{ errors.alamat}</Text>

                <TextInput
                  style={globalStyles.input}
                  placeholder="No.HP/WA..."
                  placeholderTextColor={'#333'}
                  onChangeText={handleChange('phone')} 
                  onBlur={handleBlur('phone')} 
                  value={values.phone}
                  keyboardType={'phone-pad'}
                />

                <Text style={{...globalStyles.errorText, display: (errors.phone && touched.phone) ? 'flex' : 'none' }}>{  errors.phone}</Text>

                <Image source={{uri: photo?.uri}} style={{width:150, height:150, display: photo != null ? 'flex' : 'none'}}/>

                <CustomButton text={photo ? 'Change Photo' : 'Select Photo'} onPress={selectFile} />
                <CustomButton text={'Register'} onPress={handleSubmit} disabled={errors.nama || errors.username || errors.password || errors.alamat || errors.phone || photo == null} />
                <CustomButton text={'Login'} onPress={()=>navigation.navigate('Login')} />

              </View>
            )}

          </Formik>
          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Register;
