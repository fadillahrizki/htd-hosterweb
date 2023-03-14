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
import CustomButton from '../components/CustomButton';
import { StatusBar } from 'expo-status-bar';
import { API_URL } from '@env'
import FAB from 'react-native-fab';

function BankSoal({navigation}) {
    const isDarkMode = useColorScheme() === 'dark';

    const handleLogout = () => {
        ToastAndroid.show("Logout!", 1000)
    }

    const data = [
        {
            judul: "Judul 1",
            exp: "2022-02-02",
            score: 200
        },
        {
            judul: "Judul 2",
            exp: "2022-02-01",
            score: 100
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
                        onPress={() => navigation.push('DetailBankSoal')}>
                        <View style={globalStyles.card}>
                            <Text>{item.judul}</Text>
                            <Text>Exp at : {item.exp}</Text>
                            <Text>Score : {item.score}</Text>
                        </View>
                    </Pressable>    
                )} />

                
            </View>

            <FAB buttonColor="#333" iconTextColor="#fff" onClickAction={() => {ToastAndroid.show("FAB pressed", 1000)}} visible={true} />
            
        </SafeAreaView>
    );
}

export default BankSoal;
