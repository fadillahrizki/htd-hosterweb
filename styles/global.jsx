import { Dimensions, StyleSheet } from "react-native";

export const Color = {
    Primary: '#EF4E32',
    Secondary: '#cccccc',
    Background: '#f3f3f3',
    White: '#ffffff',
    Black: '#333333'
}

export const globalStyles = StyleSheet.create({
    container:{
        flex: 1,
        height: Dimensions.get('window').height,
        backgroundColor: Color.Background
    },  
    input: {
        width: '100%',
        borderWidth:1,
        borderColor: Color.Secondary,
        backgroundColor: Color.White,
        paddingHorizontal:20,
        paddingVertical:10,
    },
    buttonContainer: {
        backgroundColor: Color.Primary,
        paddingHorizontal:24,
        paddingVertical:12
    },
    buttonContainerSecondary: {
        paddingHorizontal:24,
        paddingVertical:12,
        backgroundColor: Color.White,
        borderWidth:1,
        borderColor: Color.Secondary
    },
    buttonDisabled: {
        backgroundColor: Color.Secondary,
    },
    buttonText:{
        textAlign: 'center',
        color: Color.White,
    },
    buttonTextSecondary:{
        textAlign: 'center',
        color: Color.Black,
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
        elevation:3,
        backgroundColor:Color.White,
        shadowOffset:{width:1,height:1},
        shadowColor: Color.Black,
        shadowOpacity:0.3,
        shadowRadius:2,
        marginHorizontal:12,
        marginVertical:8,
        gap:8,
        flexDirection:'column',
        gap:12,
        borderRadius: 6
    },
})