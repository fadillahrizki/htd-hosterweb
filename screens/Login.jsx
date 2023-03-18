import axios from 'axios';
import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  Button,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';

import Carousel from 'react-native-snap-carousel'
import { globalStyles } from '../styles/global';
import CustomButton from '../components/CustomButton';
import { Formik } from 'formik';
import { StatusBar } from 'expo-status-bar';

import { API_URL } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getSlideShow, postLogin } from '../api/ApiManager';

function Login({navigation}) {
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [isError, setIsError] = useState(false)

  const passwordRef = useRef()

  const [slideShows, setSlideShows] = useState([])

  useEffect(()=>{
    const created = async () => {
      setSlideShows(await getSlideShow())
    }

    created()
  },[])

  const handleLogin = async (values) => {
    try {
      await AsyncStorage.setItem("token", await postLogin(values))
      Alert.alert("Berhasil", "Anda Berhasil Login!")
      navigation.replace('Home')
    } catch (error) {
      setIsError(true)
      console.log(error)
      if (error.response) {
        console.log(error.response.data.message)
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
        setErrorMessage(error.message)
      }
      Alert.alert("Gagal", "Anda Gagal Login!")
    }
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      
      <StatusBar backgroundColor="#ccc" />
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
                    <Image source={{uri: item.file_url}} style={globalStyles.image}/>
                  </View>
                )
              }}
              sliderWidth={Dimensions.get('window').width}
              itemWidth={Dimensions.get('window').width}
            />

            <Formik
              initialValues={{username: '', password: ''}}
              onSubmit={(values)=>{
                handleLogin(values)
              }}
            >
              {({ handleChange, handleBlur, handleSubmit, values }) => (
                <View style={{
                  flexDirection:'column',
                  gap:20,
                  width:'100%'
                }}>

                  {/* <Text style={{display: isError ? 'flex' : 'none', ...globalStyles.errorText}}>Username / Password tidak sesuai!</Text> */}

                  <Text>Username</Text>

                  <TextInput 
                    style={globalStyles.input} 
                    placeholder="Username..." 
                    placeholderTextColor={"#333"} 
                    onChangeText={handleChange('username')} 
                    onBlur={handleBlur('username')} 
                    returnKeyType="next"
                    onSubmitEditing={() => passwordRef.current.focus()}
                    value={values.username}/>

                  <Text>Password</Text>

                  <TextInput 
                    ref={passwordRef}
                    style={globalStyles.input} 
                    placeholder="Password..." 
                    placeholderTextColor={"#333"} 
                    onChangeText={handleChange('password')} 
                    onBlur={handleBlur('password')} 
                    secureTextEntry={true}
                    value={values.password}/>

                  <CustomButton text={'Login'} onPress={handleSubmit}/>
                </View>
              )}
              
            </Formik>
              
            <CustomButton text={'Register'} style={{width:'100%'}} onPress={()=>navigation.replace('Register')} />
          </View>
        </KeyboardAwareScrollView>
      </ScrollView>
    </SafeAreaView>
  );

}

export default Login;
