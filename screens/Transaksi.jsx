import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    FlatList,
    Pressable, RefreshControl, SafeAreaView, ScrollView, Text, useColorScheme,
    View
} from 'react-native';
import { getTransaction } from '../api/ApiManager';
import NoData from '../components/NoData';
import { Color, globalStyles } from '../styles/global';

function Transaksi({navigation}) {
    const isDarkMode = useColorScheme() === 'dark';

    const [data,setData] = useState([])
    const [isLoading, setIsloading] = useState(false)

    const getData = async () => {
        setIsloading(true)
        try{
            const res = await getTransaction()
            setData(res)
        }catch(error){
            if(error.response.status == 403) {
                Alert.alert("Gagal!", "Token Expired")
                AsyncStorage.clear()
                navigation.replace('Login')
            }
        }
        setIsloading(false)
    }

    useEffect(()=>{
        getData()
    },[])
  
    return (
        <SafeAreaView style={globalStyles.container}>
            <StatusBar backgroundColor={Color.Background} />
            <ScrollView 
                contentContainerStyle={{paddingVertical:12}} 
                refreshControl={
                    <RefreshControl refreshing={isLoading} onRefresh={getData} />
                }
            >
                {
                    data?.length > 0 ?
                    <FlatList data={data} renderItem={({item, index}) => (
                        <Pressable
                            onPress={() => navigation.push('DetailTransaksi', item)}>
                            <View style={globalStyles.card}>    
                                <Text>{item.category.name}</Text>
                                <Text>Harga: Rp. {parseFloat(item.amount).toLocaleString('id-ID')}</Text>
                                <Text>Status: {item.status}</Text>
                            </View>
                        </Pressable>    
                    )} /> :
                    <NoData/>
                    
                }
            </ScrollView>
        </SafeAreaView>
    );
}

export default Transaksi;
