import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect } from "react"
import { ActivityIndicator, Text, View } from "react-native"

export default function Splash({navigation}){
    useEffect(()=>{
        const created = async () =>{
            const token = await AsyncStorage.getItem("token")

            if(token) {
                navigation.replace("Home")
            } else {
                navigation.replace("Login")
            }
        }
        created()
    }, [])
    
    return (
        <View style={{alignItems:'center', justifyContent:'center', flex:1}}>
            <ActivityIndicator color={'#333'} size={'large'}/>
        </View>
    )
}