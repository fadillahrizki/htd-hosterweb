/* eslint-disable prettier/prettier */
import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import { globalStyles } from '../styles/global';
import * as ImagePicker from "expo-image-picker";
import * as yup from 'yup'
import { Formik } from 'formik';
import CustomButton from '../components/CustomButton';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getProfile, postProfile } from '../api/ApiManager';

const EditProfileSchema = yup.object({
  nama: yup.string().required(),
  username: yup.string().required(),
  alamat: yup.string().required(),
  phone: yup.string().required()
})


function EditProfile({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';

  const [photo, setPhoto] = useState(null);
  const [profile, setProfile] = useState({})

  const usernameRef = useRef()
  const passwordRef = useRef()
  const addressRef = useRef()
  const phoneRef = useRef()

  useEffect(()=>{

      const created = async () => {
          setProfile(await getProfile())
      }

      created()

  },[])

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

  
  const handleEditProfile = async (values) => {
    
    const formData = new FormData();
    formData.append('name', values.nama);
    formData.append('address', values.alamat);
    formData.append('phone', values.phone);
    formData.append('username', values.username);
    
    if(values.password){
      formData.append('password', values.password)
    }

    if(photo){
      formData.append('pic_url', {
          uri: photo.uri,
          type: 'image/jpg',
          name: 'image.jpg',
      })
    }

    try {
      const res = await postProfile(formData)
      console.log(res)
      Alert.alert("Berhasil", "Anda Berhasil Edit Profile!")
    } catch (error) {
      console.log(error)
      if (error.response) {
        console.log(error.response.data.message)
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
        // setErrorMessage(error.message)
      }

      Alert.alert("Gagal", "Anda Gagal Edit Profile!")
    }
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <StatusBar backgroundColor="#ccc" />
      <ScrollView>
        <KeyboardAwareScrollView extraHeight={120}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}>

          <Formik
          enableReinitialize={true}
            initialValues={{nama:profile?.name, username: profile?.username, password: '', alamat: profile?.address, phone: profile?.phone}}
            validationSchema={EditProfileSchema}
            onSubmit={(values)=>{
              handleEditProfile(values)
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <View style={{
                flexDirection:'column',
                gap:20,
                width:'100%'
              }}>

                <Text>Nama</Text>

                <TextInput
                  style={globalStyles.input}
                  placeholder="Nama..."
                  placeholderTextColor={'#333'}
                  onChangeText={handleChange('nama')} 
                  onBlur={handleBlur('nama')}
                  returnKeyType="next"
                  onSubmitEditing={() => usernameRef.current.focus()}
                  value={values.nama}
                />

                <Text style={{...globalStyles.errorText, display: (errors.nama && touched.nama) ? 'flex' : 'none' }}>{errors.nama}</Text>

                <Text>Username</Text>

                <TextInput
                  ref={usernameRef}
                  style={globalStyles.input}
                  placeholder="Username..."
                  placeholderTextColor={'#333'}
                  onChangeText={handleChange('username')} 
                  onBlur={handleBlur('username')}
                  returnKeyType="next"
                  onSubmitEditing={() => passwordRef.current.focus()}
                  value={values.username}
                />

                <Text style={{...globalStyles.errorText, display: (errors.username && touched.username) ? 'flex' : 'none' }}>{ errors.username}</Text>

                <Text>Password</Text>

                <TextInput
                  ref={passwordRef}
                  style={globalStyles.input}
                  placeholder="Password..."
                  placeholderTextColor={'#333'}
                  onChangeText={handleChange('password')} 
                  onBlur={handleBlur('password')} 
                  value={values.password}
                  returnKeyType="next"
                  onSubmitEditing={() => addressRef.current.focus()}
                  secureTextEntry={true}
                />

                <Text style={{...globalStyles.errorText, display: (errors.password && touched.password) ? 'flex' : 'none' }}>{ errors.password}</Text>

                <Text>Alamat</Text>

                <TextInput
                  ref={addressRef}
                  style={globalStyles.input}
                  placeholder="Alamat..."
                  placeholderTextColor={'#333'}
                  onChangeText={handleChange('alamat')} 
                  onBlur={handleBlur('alamat')} 
                  returnKeyType="next"
                  onSubmitEditing={() => phoneRef.current.focus()}
                  value={values.alamat}
                />

                <Text style={{...globalStyles.errorText, display: (errors.alamat && touched.alamat) ? 'flex' : 'none' }}>{ errors.alamat}</Text>

                <Text>No.HP/WA</Text>

                <TextInput
                  ref={phoneRef}
                  style={globalStyles.input}
                  placeholder="No.HP/WA..."
                  placeholderTextColor={'#333'}
                  onChangeText={handleChange('phone')} 
                  onBlur={handleBlur('phone')} 
                  value={values.phone}
                  keyboardType={'phone-pad'}
                />

                <Text style={{...globalStyles.errorText, display: (errors.phone && touched.phone) ? 'flex' : 'none' }}>{  errors.phone}</Text>

                <Image source={{uri: photo?.uri ?? profile?.pic_url}} style={{width:150, height:150, display: (photo != null || profile.pic_url) ? 'flex' : 'none'}}/>

                <CustomButton text={photo || profile?.pic_url ? 'Change Photo' : 'Select Photo'} onPress={selectFile} />
                <CustomButton text={'Edit Profile'} onPress={handleSubmit} disabled={errors.nama || errors.username || errors.password || errors.alamat || errors.phone} />

              </View>
            )}

          </Formik>
          
        </View>
        </KeyboardAwareScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}

export default EditProfile;
