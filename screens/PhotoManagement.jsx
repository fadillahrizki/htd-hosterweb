/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
    ActivityIndicator,
    Alert,
  FlatList,
  Image,
  Modal,
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
import { getPicture, postPicture } from '../api/ApiManager';
import * as ImagePicker from "expo-image-picker";
import FAB from 'react-native-fab';
import CustomButton from '../components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageLoad from 'react-native-image-placeholder';

function PhotoManagement({navigation}) {
    const isDarkMode = useColorScheme() === 'dark';

    const [data,setData] = useState([])
    const [photo, setPhoto] = useState(null);
    const [modalVisible, setModalVisible] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const [isLoading, setIsLoading] = useState(false)


    useEffect(()=>{
        getData()
    },[])

    const getData = async () => {
        setIsLoading(true)
        try{
            const res = await getPicture()
            setData(res)
        }catch(error){
            if(error.response.status == 403) {
                Alert.alert("Gagal!", "Token Expired")
                AsyncStorage.clear()
                navigation.replace('Login')
            }
        }
        setIsLoading(false)
    }

    const selectFile = async () => {
        try {
            let res = await ImagePicker.launchImageLibraryAsync({
                quality: 1,
            });
            console.log(res)
            setPhoto(res.assets[0])
            console.log(photo)
        } catch (err) {
            console.log(err)
            setPhoto(null)
        }
    };

    const handleUpload = async () => {

        setIsUploading(true)

        const formData = new FormData();
        formData.append('file', {
            uri: photo.uri,
            type: 'image/jpg',
            name: 'image.jpg',
        });

        try {
            const res = await postPicture(formData)
            if(res == false){
                AsyncStorage.clear()
                navigation.replace('Login')
            }
            console.log(res)
            Alert.alert("Berhasil", "Anda Berhasil Upload!")
            getData()
            setModalVisible(false)
            setIsUploading(false)
            setPhoto(null)
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

            setIsUploading(false)
        }

    }
  
    return (
        <SafeAreaView style={globalStyles.container}>
            <StatusBar backgroundColor="#ccc" />

            <Modal
                animationType="slide"
                visible={modalVisible}>
                <SafeAreaView style={{...globalStyles.container}}>
                    <View
                    style={{
                        backgroundColor: isDarkMode ? Colors.black : Colors.white,
                        padding:12,
                        flexDirection:'column',
                        gap:12
                    }}> 
                        <View style={{padding:12, justifyContent:'space-between', flexDirection:'row', alignItems:'center'}}>
                            <Text style={{fontSize:18, fontWeight:'bold', color:'#333'}}>Upload Gambar</Text>
                            <CustomButton text={"Close"} onPress={()=>setModalVisible(false)}/>
                        </View>
                    
                        <ImageLoad source={{uri: photo?.uri}} borderRadius={8} style={{width:150, height:150, display: photo != null ? 'flex' : 'none'}} resizeMode={'cover'}/>

                        <CustomButton text={photo ? 'Change Photo' : 'Select Photo'} onPress={selectFile} />
                        <CustomButton text={'Upload'} onPress={handleUpload} isLoading={isUploading}/>
                    </View>
                </SafeAreaView>
            </Modal>

            <View
            style={{
                backgroundColor: isDarkMode ? Colors.black : Colors.white,
                padding:12,
                flexDirection:'column',
                justifyContent:'center',
                gap:12,
                flex:1
            }}> 
                {
                    isLoading ? 
                    <ActivityIndicator size={'large'} color={"#333"}/> : 
                    <FlatList data={data} renderItem={({item, index}) => <ImageLoad source={{uri: item.file_url}} borderRadius={8} style={{height:200, marginVertical: 6}} resizeMode={'cover'}/>} />
                }
                
                
            </View>

            <FAB buttonColor="#EF4E32" iconTextColor="#fff" onClickAction={() => setModalVisible(true)} visible={true} />
        </SafeAreaView>
    );
}

export default PhotoManagement;
