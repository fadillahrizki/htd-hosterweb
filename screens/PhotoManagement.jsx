import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from "expo-image-picker";
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    FlatList, Modal, RefreshControl, SafeAreaView, ScrollView, Text, TouchableOpacity, useColorScheme,
    View
} from 'react-native';
import FAB from 'react-native-fab';
import ImageLoad from 'react-native-image-placeholder';
import { getPicture, postPicture } from '../api/ApiManager';
import CustomButton from '../components/CustomButton';
import NoData from '../components/NoData';
import { Color, globalStyles } from '../styles/global';

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
            setPhoto(res.assets[0])
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
            <StatusBar backgroundColor={Color.Background} />

            <Modal
                animationType="slide"
                visible={modalVisible}>
                <SafeAreaView style={{...globalStyles.container}}>
                    <View
                    style={{
                        padding:12,
                        flexDirection:'column',
                        gap:12
                    }}> 
                        <View style={{padding:12, justifyContent:'space-between', flexDirection:'row', alignItems:'center'}}>
                            <Text style={{fontSize:18, fontWeight:'bold', color:Color.Black}}>Upload Gambar</Text>
                            <CustomButton text={"Close"} onPress={()=>setModalVisible(false)}/>
                        </View>

                        <TouchableOpacity onPress={selectFile} style={{width:150, height:150}}>
                        {
                            photo != null ?
                            <ImageLoad source={{uri: photo?.uri}} borderRadius={8} style={{width:150, height:150}} resizeMode={'cover'}/> :
                            <ImageLoad source={require('../assets/placeholder.jpg')} borderRadius={8} style={{width:150, height:150}} resizeMode={'cover'}/>
                        }
                        </TouchableOpacity>

                        {(photo == null) ? <Text style={globalStyles.errorText}>Pilih gambar terlebih dahulu!</Text> : ''}

                        <CustomButton text={'Upload'} onPress={handleUpload} disabled={!photo} isLoading={isUploading}/>
                    </View>
                </SafeAreaView>
            </Modal>

            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={isLoading} onRefresh={getData} />
                }
                contentContainerStyle={{padding:12}}
            > 
                {
                    data?.length > 0 ?
                    <FlatList data={data} renderItem={({item, index}) => <ImageLoad source={{uri: item.file_url}} borderRadius={8} style={{height:200, marginVertical: 6}} resizeMode={'cover'}/>} /> :
                    <NoData />
                }
                
            </ScrollView>

            <FAB buttonColor={Color.Primary} iconTextColor={Color.White} onClickAction={() => setModalVisible(true)} visible={true} />
        </SafeAreaView>
    );
}

export default PhotoManagement;
