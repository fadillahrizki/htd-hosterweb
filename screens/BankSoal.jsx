import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    FlatList,
    Modal,
    Pressable, SafeAreaView, Text, View
} from 'react-native';
import FAB from 'react-native-fab';
import { getBankSoal, getCategory, postBuyCategory } from '../api/ApiManager';
import CustomButton from '../components/CustomButton';
import NoData from '../components/NoData';
import { Color, globalStyles } from '../styles/global';

function BankSoal({navigation}) {
    const [modalVisible, setModalVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isCategoriesLoading, setIsCategoriesLoading] = useState(false)
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
        setIsCategoriesLoading(true)
        try{
            const res = await getCategory()
            setCategories(res)
        }catch(error){
            console.log(error)
            if(error.response.status == 403) {
                Alert.alert("Gagal!", "Token Expired")
                AsyncStorage.clear()
                navigation.replace('Login')
            }
        }
        setIsCategoriesLoading(false)
    }

    const handleBuy = async (item) => {
        try{
            const res = await postBuyCategory({id:item.id})
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
            <StatusBar backgroundColor={Color.Background} />

            <Modal
                animationType="slide"
                visible={modalVisible}>
                <SafeAreaView style={{...globalStyles.container}}>
                    <View style={{padding:12, justifyContent:'space-between', flexDirection:'row', alignItems:'center'}}>
                        <Text style={{fontSize:18, fontWeight:'bold', color:Color.Black}}>List Kategori</Text>
                        <CustomButton text={"Close"} onPress={()=>setModalVisible(false)}/>
                    </View>
                    <FlatList 
                        contentContainerStyle={{paddingVertical:12}}
                        refreshing={isCategoriesLoading}
                        onRefresh={getCategories}
                        ListEmptyComponent={<NoData />} 
                        data={categories} 
                        renderItem={({item}) => (
                            <Pressable
                                key={item.id}
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
                        )} 
                    />
                </SafeAreaView>
            </Modal>

            <FlatList 
                contentContainerStyle={{paddingVertical:12}}
                ListEmptyComponent={<NoData />}
                refreshing={isLoading}
                onRefresh={getData}
                data={data} renderItem={({item}) => (
                    <Pressable
                        key={item.id}
                        onPress={() => navigation.push('DetailBankSoal', {id:item.id})}>
                        <View style={globalStyles.card}>
                            <Text>{item.category.name}</Text>
                            <Text>Score: {item.total_score}</Text>
                            <Text>Exp at: {new Date(item.expired_at).toLocaleDateString("id-ID")}</Text>
                        </View>
                    </Pressable>    
                )}
            />

            <FAB buttonColor={Color.Primary} iconTextColor={Color.White} onClickAction={() => {
                getCategories()
                setModalVisible(true)
            }} visible={true} />
            
        </SafeAreaView>
    );
}

export default BankSoal;
