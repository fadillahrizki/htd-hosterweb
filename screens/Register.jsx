import * as ImagePicker from "expo-image-picker";
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import React, { useRef, useState } from 'react';
import {
  Alert, SafeAreaView,
  ScrollView,
  Text,
  TextInput, TouchableOpacity, useColorScheme,
  View
} from 'react-native';
import ImageLoad from 'react-native-image-placeholder';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { postRegister } from '../api/ApiManager';
import CustomButton from '../components/CustomButton';
import { Color, globalStyles } from '../styles/global';

function Register({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';

  const [photo, setPhoto] = useState(null);
  const [isSending, setIsSending] = useState(false)

  const usernameRef = useRef()
  const passwordRef = useRef()
  const addressRef = useRef()
  const phoneRef = useRef()

  const selectFile = async () => {
    try {
      let res = await ImagePicker.launchImageLibraryAsync({
        quality: 1,
      });
      setPhoto(res.assets[0])
    } catch (err) {
      console.log(err)
      setPhoto(null)
    }
  };

  const handleRegister = async (values) => {
    setIsSending(true)
    
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('address', values.address);
    formData.append('phone', values.phone);
    formData.append('username', values.username);
    formData.append('password', values.password);
    formData.append('pic_url', {
        uri: photo.uri,
        type: 'image/jpg',
        name: 'image.jpg',
    });

    try {
      const res = await postRegister(formData)
      Alert.alert("Berhasil", "Anda Berhasil Register!")
      setIsSending(false)
      return true
    } catch (error) {
      console.log(error)

      if (error.response) {
        console.log(error.response.data.message)
        Alert.alert("Gagal", error.response.data.message[0].toUpperCase()+error.response.data.message.slice(1))
      } else {
        console.log('Error', error.message)
        Alert.alert("Gagal", "Silahkan cek koneksi anda!")
      }
      setIsSending(false)
      return false
    }
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <StatusBar backgroundColor={Color.Background} />
      <ScrollView>
        <KeyboardAwareScrollView extraHeight={120}>
        <View
          style={{
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}>
          
          <ImageLoad source={require('../assets/logo.png')} style={{alignSelf:'center', width:100, height:100}} />

          <Formik
            initialValues={{name:'', username: '', password: '', address: '', phone: ''}}
            onSubmit={async (values, {resetForm})=>{
              if(await handleRegister(values)) {
                setPhoto(null)
                resetForm()
              }
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
                  placeholderTextColor={Color.Black}
                  onChangeText={handleChange('name')} 
                  onBlur={handleBlur('name')} 
                  returnKeyType="next"
                  onSubmitEditing={() => usernameRef.current.focus()}
                  blurOnSubmit={false}
                  value={values.name}
                />

                {(!values.name && touched.name) ? <Text style={globalStyles.errorText}>Nama harus diisi!</Text> : ''}

                <Text>Username</Text>

                <TextInput
                  ref={usernameRef}
                  style={globalStyles.input}
                  placeholder="Username..."
                  placeholderTextColor={Color.Black}
                  onChangeText={handleChange('username')} 
                  onBlur={handleBlur('username')} 
                  returnKeyType="next"
                  onSubmitEditing={() => passwordRef.current.focus()}
                  blurOnSubmit={false}
                  value={values.username}
                />

                {(!values.username && touched.username) ? <Text style={globalStyles.errorText}>Username harus diisi!</Text> : ''}

                <Text>Password</Text>

                <TextInput
                  ref={passwordRef}
                  style={globalStyles.input}
                  placeholder="Password..."
                  placeholderTextColor={Color.Black}
                  onChangeText={handleChange('password')} 
                  onBlur={handleBlur('password')} 
                  value={values.password}
                  returnKeyType="next"
                  onSubmitEditing={() => addressRef.current.focus()}
                  blurOnSubmit={false}
                  secureTextEntry={true}
                />

                {(!values.password && touched.password) ? <Text style={globalStyles.errorText}>Password harus diisi!</Text> : ''}

                <Text>Alamat</Text>

                <TextInput
                  ref={addressRef}
                  style={globalStyles.input}
                  placeholder="Alamat..."
                  placeholderTextColor={Color.Black}
                  onChangeText={handleChange('address')} 
                  onBlur={handleBlur('address')} 
                  returnKeyType="next"
                  onSubmitEditing={() => phoneRef.current.focus()}
                  blurOnSubmit={false}
                  value={values.address}
                />

                {(!values.address && touched.address) ? <Text style={globalStyles.errorText}>Alamat harus diisi!</Text> : ''}

                <Text>No.HP/WA</Text>

                <TextInput
                  ref={phoneRef}
                  style={globalStyles.input}
                  placeholder="No.HP/WA..."
                  placeholderTextColor={Color.Black}
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  value={values.phone}
                  keyboardType={'phone-pad'}
                />

                {(!values.phone && touched.phone) ? <Text style={globalStyles.errorText}>No Hp harus diisi!</Text> : ''}

                <TouchableOpacity onPress={selectFile} style={{width:150, height:150}}>
                  {
                    photo != null ?
                    <ImageLoad source={{uri: photo?.uri}} borderRadius={8} style={{width:150, height:150}} resizeMode={'cover'}/> :
                    <ImageLoad source={require('../assets/placeholder.jpg')} borderRadius={8} style={{width:150, height:150}} resizeMode={'cover'}/>
                  }
                </TouchableOpacity>

                {photo == null ? <Text style={globalStyles.errorText}>Pilih gambar terlebih dahulu!</Text> : ''}

                <CustomButton text={'Register'} onPress={handleSubmit} disabled={(!values.name || !values.username || !values.password || !values.address || !values.phone || photo == null) || (!touched.name && !touched.username && !touched.password && !touched.address && !touched.phone)} isLoading={isSending} />
                <Text style={{textAlign:'center'}}>Sudah punya akun?</Text>
                <CustomButton text={'Login'} type={2} onPress={()=>navigation.replace('Login')} />

              </View>
            )}

          </Formik>
          
        </View>
        </KeyboardAwareScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Register;
