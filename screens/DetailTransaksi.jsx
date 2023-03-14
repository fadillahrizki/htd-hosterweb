/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  FlatList,
  Image,
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
import * as ImagePicker from "expo-image-picker";

function DetailTransaksi({navigation}) {
    const isDarkMode = useColorScheme() === 'dark';

    const data = {
        category: "Category 1",
        deskripsi: "blablablablasdasdnasdas",
        harga:200000,
        status: "AKTIF",
    }

    const [bukti, setBukti] = useState(null);

    const selectFile = async () => {
        try {
          let res = await ImagePicker.launchImageLibraryAsync({
            quality: 1,
          });
          console.log(res)
          setBukti(res.assets[0])
          console.log(bukti)
        } catch (err) {
          console.log(err)
          setBukti(null)
        }
      };
  
    return (
        <SafeAreaView style={globalStyles.container}>
            <StatusBar backgroundColor="#ccc" />
            <ScrollView>

                <View
                style={{
                    backgroundColor: isDarkMode ? Colors.black : Colors.white,
                    padding:12,
                    flexDirection: 'column',
                    gap:12
                }}> 

                    <Text>{data.category}</Text>
                    <Text>{data.deskripsi}</Text>
                    <Text>{data.harga}</Text>
                    <Text>{data.status}</Text>
                    
                    <Image source={{uri: bukti?.uri}} style={{width:150, height:150, display: bukti != null ? 'flex' : 'none'}}/>

                    <CustomButton text={'Upload Bukti'} onPress={selectFile} />
                    
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

export default DetailTransaksi;
