import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList, Image, SafeAreaView, Text,
    TextInput, useColorScheme,
    View
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { Alert } from 'react-native';
import { getBankSoalDetail, postBankSoalAnswer } from '../api/ApiManager';
import CustomButton from '../components/CustomButton';
import { Color, globalStyles } from '../styles/global';
import NoData from '../components/NoData';

function DetailBankSoal({navigation,route}) {
    const isDarkMode = useColorScheme() === 'dark';
    const [isLoading, setIsLoading] = useState(false)
    const [isSending, setIsSending] = useState(false)
    const [data, setData] = useState({})
    const {id} = route.params

    useEffect(()=>{
        getData()
    },[])
    
    const getData = async () => {
        setIsLoading(true)
        try{
            const res = await getBankSoalDetail(id)
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

    const handleChangeAnswer = (item, value) => {
        data.questions.map(question=>{
            if(question.id == item.id)
                question.answer = value
        })
    }

    const handleSave = async () => {
        setIsSending(true)
        try{
            const res = await postBankSoalAnswer(data.id, {questions:data.questions})
            console.log(res)
            Alert.alert("Berhasil!", "Berhasil Save Jawaban!")
        }catch(error){
            console.log(error)
            if(error.response.status == 403) {
                Alert.alert("Gagal!", "Token Expired")
                AsyncStorage.clear()
                navigation.replace('Login')
            }

            if (error.response) {
                console.log(error.response.data.message)
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
            // Alert.alert("Gagal!", "Gagal Save Jawaban!")
        }
        setIsSending(false)
    }
  
    return (
        <SafeAreaView style={globalStyles.container}>
            <StatusBar backgroundColor={Color.Background}/>
            <View
                style={{
                    paddingVertical:12,
                    justifyContent: 'center',
                    flex:1
                }}>  

                <Text style={{alignSelf:'center', fontSize: 18, marginBottom:12}}>{data?.category?.name}</Text>

                {
                    isLoading ?
                    <ActivityIndicator size={'large'} color={Color.Black}/> :
                    (
                        data?.questions?.length > 0 ?
                        <FlatList data={data.questions} renderItem={({item, index}) => (
                            <View style={globalStyles.card}>
                                <Text>{item.title}</Text>
                                <Text>{item.description}</Text>
                                <TextInput style={globalStyles.input} defaultValue={item.answer} onChangeText={value => handleChangeAnswer(item, value)} placeholder="Jawaban..."/>
                            </View>   
                        )} /> :
                        <NoData/>
                    )
                }
                    
            </View>
            {
                data?.questions?.length > 0 ?
                <CustomButton text={"Simpan"} onPress={handleSave} style={{position:'absolute', bottom:12, alignSelf:'center'}} isLoading={isSending}/> : ''
            }

        </SafeAreaView>
    );
}

export default DetailBankSoal;
