/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  ToastAndroid,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import { globalStyles } from '../styles/global';
import CustomButton from '../components/CustomButton';
import { StatusBar } from 'expo-status-bar';
import { API_URL } from '@env'

function DetailBankSoal({navigation}) {
    const isDarkMode = useColorScheme() === 'dark';

    const data = [
        {
            judul: "Judul 1",
            deskripsi: "blablablablasdasdnasdas",
            jawaban:"Jawaban"
        },
        {
            judul: "Judul 2",
            deskripsi: "blablablablasdasdnasdas",
            jawaban:"Jawaban"
        },
    ]
  
    return (
        <SafeAreaView style={globalStyles.container}>
            <StatusBar backgroundColor="#ccc" />
            <View
                style={{
                    backgroundColor: isDarkMode ? Colors.black : Colors.white,
                    paddingVertical:12
                }}> 
                    <FlatList data={data} renderItem={({item, index}) => (
                        <Pressable
                            onPress={() => {
                                ToastAndroid.show(item.judul, 1000)
                            }}>
                            <View style={globalStyles.card}>
                                <Text>{item.judul}</Text>
                                <Text>{item.deskripsi}</Text>
                                <TextInput style={globalStyles.input} placeholder="Jawaban..."/>
                            </View>
                        </Pressable>    
                    )} />
                    
                </View>
        </SafeAreaView>
    );
}

export default DetailBankSoal;
