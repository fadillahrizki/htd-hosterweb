/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getProfile } from '../api/ApiManager';

function Home({navigation}) {
    const isDarkMode = useColorScheme() === 'dark';
    const [profile, setProfile] = useState({})

    const handleLogout = () => {
        ToastAndroid.show("Logout!", 1000)
        AsyncStorage.clear()
        navigation.replace('Login')
    }

    useEffect(()=>{

        const created = async () => {
            setProfile(await getProfile())
        }

        created()

    },[])
  
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
                        {profile?.name}
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
