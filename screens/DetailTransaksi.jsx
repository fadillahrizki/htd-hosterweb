import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from "expo-image-picker";
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
    Alert, SafeAreaView,
    ScrollView,
    Text, TouchableOpacity, useColorScheme,
    View
} from 'react-native';
import ImageLoad from 'react-native-image-placeholder';
import { postTransaction } from '../api/ApiManager';
import CustomButton from '../components/CustomButton';
import { Color, globalStyles } from '../styles/global';

function DetailTransaksi({route, navigation}) {
    const isDarkMode = useColorScheme() === 'dark';

    const item = route.params

    const [bukti, setBukti] = useState(null)
    const [isUploading, setIsUploading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

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
            setIsSuccess(true)
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
            <StatusBar backgroundColor={Color.Background} />
            <ScrollView>

                <View
                style={{
                    padding:12,
                    flexDirection: 'column',
                    gap:12
                }}> 

                    <Text>{item.category.name}</Text>
                    <Text>Harga: Rp. {parseFloat(item.amount).toLocaleString('id-ID')}</Text>
                    <Text>Masa berlaku: {item.category.active_time} Day{parseFloat(item.category.active_time) > 1 ? 's' : ''}</Text>
                    <Text>Status: {item.status}</Text>

                    <TouchableOpacity onPress={!item.file?selectFile:()=>{}} style={{width:150, height:150}}>
                    {
                        (bukti || item.file) ?
                        <ImageLoad source={{uri: bukti?.uri ?? item.file_url}} borderRadius={8} style={{width:150, height:150}} resizeMode={'cover'}/> :
                        <ImageLoad source={require('../assets/placeholder.jpg')} borderRadius={8} style={{width:150, height:150}} resizeMode={'cover'}/>
                    }
                    </TouchableOpacity>

                    {(bukti == null && !item.file_url) ? <Text style={globalStyles.errorText}>Pilih gambar terlebih dahulu!</Text> : ''}

                    { (!item.file && !isSuccess) ? <CustomButton text={"Upload"} onPress={handleUpload} isLoading={isUploading} disabled={!bukti}/> : '' }
                    
                </View>

            </ScrollView>
        </SafeAreaView>
    );
} 

export default DetailTransaksi;
