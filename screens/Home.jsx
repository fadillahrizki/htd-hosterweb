/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
    Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  ToastAndroid,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import { globalStyles } from '../styles/global';
import CustomButton from '../components/CustomButton';
import { StatusBar } from 'expo-status-bar';
import { API_URL } from '@env'

function Home({navigation}) {
    const isDarkMode = useColorScheme() === 'dark';

    const handleLogout = () => {
        ToastAndroid.show("Logout!", 1000)
    }
  
    return (
        <SafeAreaView style={globalStyles.container}>
            <StatusBar backgroundColor="#ccc" />
            
            <View
                style={{
                    backgroundColor: isDarkMode ? Colors.black : Colors.white,
                    padding: 24,
                    flexDirection: 'column',
                    justifyContent:'center',
                    gap: 12,
                    flex:1
                }}> 
                    
                    <Image source={require('../assets/logo.png')} style={{alignSelf:'center', width:150, height:150}} />

                    <Text
                        style={{
                            fontSize: 24,
                            fontWeight: 'bold',
                            textAlign: 'center',
                        }}>
                        User Baru bos
                    </Text>

                    <CustomButton text={'Edit Profile'} onPress={()=>navigation.push('EditProfile')} />
                    <CustomButton text={'Bank Soal'} onPress={()=>navigation.push('BankSoal')} />
                    <CustomButton text={'Manajemen Foto'} onPress={()=>{}} />
                    <CustomButton text={'Transaksi'} onPress={()=>navigation.push('Transaksi')} />
                    <CustomButton text={'Keluar'} onPress={handleLogout} />
                
                </View>
        </SafeAreaView>
    );
}

export default Home;
