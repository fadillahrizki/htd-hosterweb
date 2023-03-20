/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  Alert,
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
import * as ImagePicker from "expo-image-picker";
import { postTransaction } from '../api/ApiManager';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '@env'

function DetailTransaksi({route, navigation}) {
    const isDarkMode = useColorScheme() === 'dark';

    const item = route.params

    const [bukti, setBukti] = useState(null)
    const [isUploading, setIsUploading] = useState(false)

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
    }

    const handleUpload = async () => {
      setIsUploading(true)
        const formData = new FormData();
        formData.append('file', {
            uri: bukti.uri,
            type: 'image/jpg',
            name: 'image.jpg',
        });

        try {
            const res = await postTransaction(item.id, formData)
            console.log(res)
            Alert.alert("Berhasil", "Anda Berhasil Upload!")
        } catch (error) {
            if(error.response.status == 403) {
                Alert.alert("Gagal!", "Token Expired")
                AsyncStorage.clear()
                navigation.replace('Login')
            }
            console.log(error)
            if (error.response) {
                console.log(error.response.data.message)
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
                // setErrorMessage(error.message)
            }

            Alert.alert("Gagal", "Anda Gagal Upload!")
        }
        setIsUploading(false)
    }
      
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

                    <Text>{item.category.name}</Text>
                    <Text>Harga: Rp. {parseFloat(item.amount).toLocaleString('id-ID')}</Text>
                    <Text>Masa berlaku: {item.category.active_time} Day{parseFloat(item.category.active_time) > 1 ? 's' : ''}</Text>
                    <Text>Status: {item.status}</Text>
                    
                    <ImageLoad source={{uri: item.file_url ?? bukti?.uri}} borderRadius={8} style={{width:150, height:150, display: item.file || bukti != null ? 'flex' : 'none'}} resizeMode={'cover'}/>

                    <CustomButton text={bukti || bukti?.pic_url ? 'Ganti Bukti' : 'Pilih Bukti'} onPress={selectFile}  style={{alignSelf:'flex-start', display: item.file ? 'none' : 'flex'}}/>

                    <CustomButton text={"Upload"} onPress={handleUpload} isLoading={isUploading} disabled={!bukti} style={{display: item.file ? 'none' : 'flex'}}/>
                    
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

export default DetailTransaksi;
