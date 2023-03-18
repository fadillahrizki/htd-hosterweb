import { Dimensions, StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
    container:{
        flex: 1,
        height: Dimensions.get('window').height,
        backgroundColor: '#fff'
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
        backgroundColor: '#EF4E32',
        paddingHorizontal:24,
        paddingVertical:12,
        borderRadius:10, 
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
    },
    card:{
        padding:12,
        borderRadius:6,
        elevation:3,
        backgroundColor:'#fff',
        shadowOffset:{width:1,height:1},
        shadowColor:"#333",
        shadowOpacity:0.3,
        shadowRadius:2,
        marginHorizontal:12,
        marginVertical:8,
        gap:8,
        flexDirection:'column',
        gap:12
    },
})