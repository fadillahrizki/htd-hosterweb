import { Dimensions, StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
    container:{
        flex: 1,
        height: Dimensions.get('window').height
    },  
    input: {
        width: '100%',
        borderWidth:1,
        borderColor:'#333',
        paddingHorizontal:20,
        paddingVertical:10,
        borderRadius:10,
    },
    buttonContainer: {
        backgroundColor: '#333',
        paddingHorizontal:24,
        paddingVertical:12,
        borderRadius:10,  
        width:'100%',
    },
    buttonDisabled: {
        backgroundColor: '#ccc',
    },
    buttonText:{
        textAlign: 'center',
        color: '#fff',
    },
    image:{
        height:350,
        width: '100%',
    },
    errorText:{
        color:'red',
        fontSize: 12
    }
})