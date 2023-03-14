/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
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

function Transaksi({navigation}) {
    const isDarkMode = useColorScheme() === 'dark';
    const data = [
        {
            category: "Category 1",
            price: 20000000,
            status: "AKTIF"
        },
        {
            category: "Category 2",
            price: 100000,
            status: "AKTIF"
        },
    ]
  
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
                        onPress={() => navigation.push('DetailTransaksi')}>
                        <View style={globalStyles.card}>
                            <Text>{item.category}</Text>
                            <Text>{item.price}</Text>
                            <Text>{item.status}</Text>
                        </View>
                    </Pressable>    
                )} />
                
            </View>
        </SafeAreaView>
    );
}

export default Transaksi;
