import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert, Dimensions,
  Image, Pressable, SafeAreaView,
  ScrollView, Text,
  TextInput, View
} from 'react-native';
import ImageLoad from 'react-native-image-placeholder';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Carousel from 'react-native-snap-carousel';
import { getSlideShow, postLogin } from '../api/ApiManager';
import CustomButton from '../components/CustomButton';
import { Color, globalStyles } from '../styles/global';

function Login({navigation}) {
  const [isSending, setIsSending] = useState(false)
  const passwordRef = useRef()
  const [slideShows, setSlideShows] = useState([])

  useEffect(()=>{
    const created = async () => {
      setSlideShows(await getSlideShow())
    }

    created()
  },[])

  const handleLogin = async (values) => {
    setIsSending(true)
    try {
      await AsyncStorage.setItem("token", await postLogin(values))
      navigation.replace('Home')
    } catch (error) {
      console.log(error)
      if (error.response) {
        console.log(error.response.data.message)
        Alert.alert("Login Gagal", "Username/Password tidak sesuai!")
      } else {
        console.log('Error', error.message)
        Alert.alert("Login Gagal", "Silahkan cek koneksi anda!")
      }
    }
    setIsSending(false)
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      
      <StatusBar backgroundColor={Color.Background} />
      <ScrollView>
        <KeyboardAwareScrollView extraHeight={120}>
          <View
            style={{
              flexDirection:'column',
              padding:24,
              gap:20,
              alignItems: 'center',
            }}>

            <Carousel
              layout='default'
              autoplay={true}
              autoplayInterval={3000}
              data={slideShows}
              renderItem={({item,index}) => {
                return (
                  <View>
                    <ImageLoad source={{uri: item.file_url}} style={{height:200 }} resizeMode={'cover'}/>
                  </View>
                )
              }}
              sliderWidth={Dimensions.get('window').width}
              itemWidth={Dimensions.get('window').width}
            />

            <Image source={require('../assets/logo.png')} style={{alignSelf:'center', width:100, height:100}} />

            <Formik
              initialValues={{username: '', password: ''}}
              onSubmit={(values)=>{
                handleLogin(values)
              }}
            >
              {({ handleChange, handleBlur, handleSubmit, values }) => (
                <View style={{
                  flexDirection:'column',
                  gap:12,
                  width:'100%'
                }}>

                  <Text>Username</Text>

                  <TextInput 
                    style={globalStyles.input} 
                    placeholder="Username..." 
                    placeholderTextColor={Color.Black} 
                    onChangeText={handleChange('username')} 
                    onBlur={handleBlur('username')} 
                    returnKeyType="next"
                    onSubmitEditing={() => passwordRef.current.focus()}
                    blurOnSubmit={false}
                    value={values.username}/>

                  <Text>Password</Text>

                  <TextInput 
                    ref={passwordRef}
                    style={globalStyles.input} 
                    placeholder="Password..." 
                    placeholderTextColor={Color.Black} 
                    onChangeText={handleChange('password')} 
                    onBlur={handleBlur('password')} 
                    secureTextEntry={true}
                    value={values.password}/>

                  <Pressable onPress={()=>navigation.push('ForgotPassword')}>
                    <Text style={{textAlign: 'right', marginVertical:12, color: Color.Primary}}>Lupa Password ?</Text>
                  </Pressable>

                  <CustomButton text={'Login'} onPress={handleSubmit} isLoading={isSending}/>
                </View>
              )}
              
            </Formik>
            <Text style={{textAlign:'center'}}>Belum punya akun?</Text>
            <CustomButton text={'Register'} type={2} style={{width:'100%'}} onPress={()=>navigation.replace('Register')}/>
          </View>
        </KeyboardAwareScrollView>
      </ScrollView>
    </SafeAreaView>
  );

}

export default Login;
