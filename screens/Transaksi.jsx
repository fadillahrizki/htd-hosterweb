/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
    Alert,
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  ToastAndroid,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import { globalStyles } from '../styles/global';
import { StatusBar } from 'expo-status-bar';
import { getTransaction } from '../api/ApiManager';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Transaksi({navigation}) {
    const isDarkMode = useColorScheme() === 'dark';

    const [data,setData] = useState([])

    useEffect(()=>{
        const created = async () => {
            try{
                const res = await getTransaction()
                setData(res)
                console.log(res)
            }catch(error){
                if(error.response.status == 403) {
                    Alert.alert("Gagal!", "Token Expired")
                    AsyncStorage.clear()
                    navigation.replace('Login')
                }
            }
        }
        created()
    },[])
  
    return (
        <SafeAreaView style={globalStyles.container}>
            <StatusBar backgroundColor="#ccc" />
            <View
            style={{
                backgroundColor: isDarkMode ? Colors.black : Colors.white,
                paddingVertical:12,
                flexDirection:'column'
            }}> 
                <FlatList data={data} renderItem={({item, index}) => (
                    <Pressable
                        onPress={() => navigation.push('DetailTransaksi', item)}>
                        <View style={globalStyles.card}>    
                            <Text>{item.category.name}</Text>
                            <Text>Harga: Rp. {parseFloat(item.amount).toLocaleString('id-ID')}</Text>
                            <Text>Status: {item.status}</Text>
                        </View>
                    </Pressable>    
                )} />
                
            </View>
        </SafeAreaView>
    );
}

export default Transaksi;
