import axios from 'axios';
import React, {useState} from 'react';
import {
  Alert,
  Button,
  Dimensions,
  Image,
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

function Login({navigation}) {
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [isError, setIsError] = useState(false)

  const data = [
    {
      title: "Aenean leo",
      body: "Ut tincidunt tincidunt erat. Sed cursus turpis vitae tortor. Quisque malesuada placerat nisl. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
      imgUrl: "https://picsum.photos/id/11/200/300",
    },
    {
      title: "In turpis",
      body: "Aenean ut eros et nisl sagittis vestibulum. Donec posuere vulputate arcu. Proin faucibus arcu quis ante. Curabitur at lacus ac velit ornare lobortis. ",
      imgUrl: "https://picsum.photos/id/10/200/300",
    },
    {
      title: "Lorem Ipsum", 
      body: "Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.",
      imgUrl: "https://picsum.photos/id/12/200/300",
    },
  ];

  const handleLogin = async (values) => {

    try {
      const res = await axios.post(API_URL+'/login', values)
      console.log(res)
      setIsError(false)
      Alert.alert("Berhasil", "Anda Berhasil Login!")
    } catch (error) {
      setIsError(true)
      console.log(error);
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
      Alert.alert("Gagal", "Anda Gagal Login!")
    }
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <StatusBar backgroundColor="#ccc" />
      <ScrollView>
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
            loop={true}
            autoplayInterval={3000}
            data={data}
            renderItem={({item,index}) => {
              return (
                <View>
                  <Image source={{uri: item.imgUrl}} style={globalStyles.image}/>
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

                <TextInput 
                  style={globalStyles.input} 
                  placeholder="Username..." 
                  placeholderTextColor={"#333"} 
                  onChangeText={handleChange('username')} 
                  onBlur={handleBlur('username')} 
                  value={values.username}/>

                <TextInput 
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
            
          <CustomButton text={'Register'} onPress={()=>navigation.navigate('Register')} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );

}

export default Login;
