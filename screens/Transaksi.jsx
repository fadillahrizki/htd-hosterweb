import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Pressable,
    SafeAreaView, Text, useColorScheme,
    View
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { getTransaction } from '../api/ApiManager';
import { Color, globalStyles } from '../styles/global';
import NoData from '../components/NoData';

function Transaksi({navigation}) {
    const isDarkMode = useColorScheme() === 'dark';

    const [data,setData] = useState([])
    const [isLoading, setIsloading] = useState(false)

    useEffect(()=>{
        const created = async () => {
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
        created()
    },[])
  
    return (
        <SafeAreaView style={globalStyles.container}>
            <StatusBar backgroundColor={Color.Background} />
            <View
            style={{
                paddingVertical:12,
                flexDirection:'column',
                flex: 1,
                justifyContent: 'center'
            }}> 
                {
                    isLoading ? 
                    <ActivityIndicator size={'large'} color={Color.Black}/> : 
                    (
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
                    )
                    
                }
            </View>
        </SafeAreaView>
    );
}

export default Transaksi;
