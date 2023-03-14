/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
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

function BankSoal({navigation}) {
    const isDarkMode = useColorScheme() === 'dark';

    const [modalVisible, setModalVisible] = useState(false)

    const data = [
        {
            judul: "Judul 1",
            exp: "2022-02-02",
            score: 200
        },
        {
            judul: "Judul 2",
            exp: "2022-02-01",
            score: 100
        },
    ]

    const addOnData = [
        {
            category: "Category 1",
            description: "deskripsi",
            price: 200000
        },
        {
            category: "Category 2",
            description: "deskripsi",
            price: 210000
        },
        {
            category: "Category 2",
            description: "deskripsi",
            price: 210000
        },
        {
            category: "Category 2",
            description: "deskripsi",
            price: 210000
        },
        {
            category: "Category 2",
            description: "deskripsi",
            price: 210000
        },
        {
            category: "Category 2",
            description: "deskripsi",
            price: 210000
        },
        {
            category: "Category 2",
            description: "deskripsi",
            price: 210000
        },
    ]
  
    return (
        <SafeAreaView style={globalStyles.container}>
            <StatusBar backgroundColor="#ccc" />

            <Modal
                animationType="slide"
                visible={modalVisible}>
                <View style={{...globalStyles.container}}>
                    <View style={{padding:12, justifyContent:'space-between', flexDirection:'row', alignItems:'center'}}>
                        <Text style={{fontSize:18, fontWeight:'bold', color:'#333'}}>Kategori</Text>
                        <CustomButton text={"Close"} onPress={()=>setModalVisible(false)}/>
                    </View>
                    <FlatList data={addOnData} renderItem={({item, index}) => (
                        <Pressable
                            onPress={() => Alert.alert("Alert", "Apakah anda ingin membeli kategori ini?", [
                                {
                                    text: 'Tidak', 
                                    onPress: () => {},
                                    style: 'cancel'
                                },
                                {
                                    text: 'Ya', 
                                    onPress: () => {}
                                },
                            ])}>
                            <View style={globalStyles.card}>
                                <Text>{item.category}</Text>
                                <Text>{item.description}</Text>
                                <Text>{item.price}</Text>
                            </View>
                        </Pressable>    
                    )} />
                </View>
            </Modal>

            <View
            style={{
                backgroundColor: isDarkMode ? Colors.black : Colors.white,
                paddingVertical:12,
                flexDirection:'column'
            }}> 
                <FlatList data={data} renderItem={({item, index}) => (
                    <Pressable
                        onPress={() => navigation.push('DetailBankSoal')}>
                        <View style={globalStyles.card}>
                            <Text>{item.judul}</Text>
                            <Text>Exp at : {item.exp}</Text>
                            <Text>Score : {item.score}</Text>
                        </View>
                    </Pressable>    
                )} />
            </View>

            <FAB buttonColor="#333" iconTextColor="#fff" onClickAction={() => setModalVisible(true)} visible={true} />
            
        </SafeAreaView>
    );
}

export default BankSoal;
