/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
    Alert,
  FlatList,
  Modal,
  Pressable,
  SafeAreaView,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import { globalStyles } from '../styles/global';
import CustomButton from '../components/CustomButton';
import { StatusBar } from 'expo-status-bar';
import { API_URL } from '@env'
import FAB from 'react-native-fab';
import { getBankSoal, getCategory, postBuyCategory } from '../api/ApiManager';
import AsyncStorage from '@react-native-async-storage/async-storage';

function BankSoal({navigation}) {
    const isDarkMode = useColorScheme() === 'dark';

    const [modalVisible, setModalVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState([])
    const [categories, setCategories] = useState([])

    useEffect(()=>{
        getData()
    },[])
    
    const getData = async () => {
        setIsLoading(true)
        try{
            const res = await getBankSoal()
            setData(res)
            console.log(res)
        }catch(error){
            if(error.response.status == 403) {
                Alert.alert("Gagal!", "Token Expired")
                AsyncStorage.clear()
                navigation.replace('Login')
            }
        }
        setIsLoading(false)
    }

    const getCategories = async () => {
        setIsLoading(true)
        try{
            const res = await getCategory()
            setCategories(res.data)
            COS
        }catch(error){
            console.log(error)
            if(error.response.status == 403) {
                Alert.alert("Gagal!", "Token Expired")
                AsyncStorage.clear()
                navigation.replace('Login')
            }
        }
        setIsLoading(false)
    }

    const handleBuy = async (item) => {
        console.log(item)
        try{
            const res = await postBuyCategory({id:item.id})
            console.log(res)
            Alert.alert("Berhasil!", "Berhasil membeli kategori!")
            getCategories()
            setModalVisible(false)
        }catch(error){
            if(error.response.status == 403) {
                Alert.alert("Gagal!", "Token Expired")
                AsyncStorage.clear()
                navigation.replace('Login')
            }
        }
    }

    return (
        <SafeAreaView style={globalStyles.container}>
            <StatusBar backgroundColor="#ccc" />

            <Modal
                animationType="slide"
                visible={modalVisible}>
                <SafeAreaView style={{...globalStyles.container}}>
                    <View style={{padding:12, justifyContent:'space-between', flexDirection:'row', alignItems:'center'}}>
                        <Text style={{fontSize:18, fontWeight:'bold', color:'#333'}}>List Kategori</Text>
                        <CustomButton text={"Close"} onPress={()=>setModalVisible(false)}/>
                    </View>
                    <FlatList data={categories} renderItem={({item, index}) => (
                        <Pressable
                            onPress={() => Alert.alert("Alert", "Apakah anda ingin membeli kategori ini?", [
                                {
                                    text: 'Tidak', 
                                    onPress: () => {},
                                    style: 'cancel'
                                },
                                {
                                    text: 'Ya', 
                                    onPress: () => {
                                        handleBuy(item)
                                    }
                                },
                            ])}>
                            <View style={globalStyles.card}>
                                <Text>{item.name}</Text>
                                <Text>Harga: Rp. {parseFloat(item.price).toLocaleString('id-ID')}</Text>
                                <Text>Masa berlaku: {item.active_time} Day{parseFloat(item.active_time) > 1 ? 's' : ''}</Text>
                            </View>
                        </Pressable>    
                    )} />
                </SafeAreaView>
            </Modal>

            <View
            style={{
                backgroundColor: isDarkMode ? Colors.black : Colors.white,
                paddingVertical:12,
                flexDirection:'column'
            }}> 
                <FlatList data={data} renderItem={({item, index}) => (
                    <Pressable
                        onPress={() => navigation.push('DetailBankSoal', {id:item.id})}>
                        <View style={globalStyles.card}>
                            <Text>{item.category.name}</Text>
                            <Text>Score: {item.total_score}</Text>
                            <Text>Exp at: {new Date(item.expired_at).toLocaleDateString("id-ID")}</Text>
                        </View>
                    </Pressable>    
                )} />
            </View>

            <FAB buttonColor="#EF4E32" iconTextColor="#fff" onClickAction={() => {
                getCategories()
                setModalVisible(true)
            }} visible={true} />
            
        </SafeAreaView>
    );
}

export default BankSoal;
