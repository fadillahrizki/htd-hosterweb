import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
    Alert, Image,
    SafeAreaView, Text, View
} from 'react-native';
import { getProfile } from '../api/ApiManager';
import CustomButton from '../components/CustomButton';
import { Color, globalStyles } from '../styles/global';

function Home({navigation}) {
    const [profile, setProfile] = useState({})

    const handleLogout = () => {
        AsyncStorage.clear()
        navigation.replace('Login')
    }

    useEffect(()=>{

        const created = async () => {
            try{
                const res = await getProfile()
                setProfile(res)
            }catch(error){
                if(error.response.status == 403) {
                    Alert.alert("Gagal!", "Token Expired")
                    AsyncStorage.clear()
                    navigation.replace('Login')
                }
            }
        }

        created()

    },[profile])
  
    return (
        <SafeAreaView style={globalStyles.container}>
            <StatusBar backgroundColor={Color.Background} />
            
            <View
                style={{
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
                    <CustomButton text={'Manajemen Foto'} onPress={()=>navigation.push('PhotoManagement')} />
                    <CustomButton text={'Transaksi'} onPress={()=>navigation.push('Transaksi')} />
                    <CustomButton text={'Keluar'} onPress={handleLogout} />
                
                </View>
        </SafeAreaView>
    );
}

export default Home;
