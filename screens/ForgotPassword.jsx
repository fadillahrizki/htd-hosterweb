import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import React, { useState } from 'react';
import {
  Alert, Image, SafeAreaView, Text,
  TextInput, View
} from 'react-native';
import { postForgotPassword } from '../api/ApiManager';
import CustomButton from '../components/CustomButton';
import { Color, globalStyles } from '../styles/global';

function ForgotPassword({navigation}) {

  const [isSending, setIsSending] = useState(false)

  const handleSubmit = async (values) => {
    setIsSending(true)
    try {
      const res = await postForgotPassword(values)
      Alert.alert("Berhasil", res.data.message)
    } catch (error) {
      console.log(error)
      if (error.response) {
        console.log(error.response.data.message)
        Alert.alert("Gagal", "Nomor tidak sesuai!")
      } else {
        console.log('Error', error.message)
        Alert.alert("Gagal", "Silahkan cek koneksi anda!")
      }
    }
    setIsSending(false)
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      
      <StatusBar backgroundColor={Color.Background} />
      <View
        style={{
          flexDirection:'column',
          padding:24,
          gap:20,
          justifyContent: 'center',
          flex:1,
        }}>

        <Image source={require('../assets/logo.png')} style={{alignSelf:'center', width:100, height:100}} />

        <Formik
          initialValues={{phone: ''}}
          onSubmit={(values)=>{
            handleSubmit(values)
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, touched }) => (
            <View style={{
              flexDirection:'column',
              gap:12,
              width:'100%'
            }}>

              <TextInput
                style={globalStyles.input}
                placeholder="No.HP/WA..."
                placeholderTextColor={Color.Black}
                onChangeText={handleChange('phone')}
                onBlur={handleBlur('phone')}
                value={values.phone}
                keyboardType={'phone-pad'}
              />

              {(!values.phone && touched.phone) ? <Text style={globalStyles.errorText}>No Hp harus diisi!</Text> : ''}

              <CustomButton text={'Submit'} onPress={handleSubmit} isLoading={isSending}/>
            </View>
          )}
          
        </Formik>
        <CustomButton text={'Kembali'} type={2} style={{width:'100%'}} onPress={()=>navigation.pop()}/>
      </View>
    </SafeAreaView>
  );

}

export default ForgotPassword;
