import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
    Alert, FlatList, SafeAreaView, Text,
    TextInput, View
} from 'react-native';
import { getBankSoalDetail, postBankSoalAnswer } from '../api/ApiManager';
import CustomButton from '../components/CustomButton';
import NoData from '../components/NoData';
import { Color, globalStyles } from '../styles/global';

function DetailBankSoal({navigation,route}) {
    const [isLoading, setIsLoading] = useState(false)
    const [isSending, setIsSending] = useState(false)
    const [data, setData] = useState({})
    const {id} = route.params
    const [isAnswered, setIsAnswered] = useState(false)

    useEffect(()=>{
        getData()
    },[])
    
    const getData = async () => {
        setIsLoading(true)
        try{
            const res = await getBankSoalDetail(id)
            setData(res)
            res.questions.map(question=>{
                if(question.answer)
                    setIsAnswered(true)
            })
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

        let isNotAnswered = true

        data.questions.map(question=>{
            if(!question.answer)
                isNotAnswered = false
        })

        if (!isNotAnswered) {
            Alert.alert('Gagal', 'Silahkan isi jawaban terlebih dahulu')
        } else {
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
        
    }
  
    return (
        <SafeAreaView style={globalStyles.container}>
            <StatusBar backgroundColor={Color.Background}/>
            
            <Text style={{alignSelf:'center', fontSize: 18, marginVertical:12}}>{data?.category?.name}</Text>

            <FlatList 
                contentContainerStyle={{paddingVertical:12}}
                refreshing={isLoading} 
                onRefresh={getData}
                data={data.questions} 
                ListEmptyComponent={<NoData />}
                renderItem={({item}) => (
                    <View style={globalStyles.card} key={item.id}>
                        <Text>{item.title}</Text>
                        <Text>{item.description}</Text>
                        <TextInput style={globalStyles.input} defaultValue={item.answer} editable={!item.answer} onChangeText={value => handleChangeAnswer(item, value)} placeholder="Jawaban..."/>
                    </View>   
                )} 
            />

            {
                data?.questions?.length > 0 ?
                <CustomButton text={"Simpan"} onPress={handleSave} disabled={isAnswered} style={{position:'absolute', bottom:12, alignSelf:'center'}} isLoading={isSending}/> : ''
            }

        </SafeAreaView>
    );
}

export default DetailBankSoal;
