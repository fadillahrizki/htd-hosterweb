import { ActivityIndicator, Pressable, Text, TouchableOpacity } from "react-native"
import { globalStyles } from "../styles/global"

export default CustomButton = ({onPress, text, style, disabled, isLoading = false}) => {
    return (
        <TouchableOpacity onPress={onPress} style={{...globalStyles.buttonContainer, ...style, ...(disabled ? globalStyles.buttonDisabled : '')}} disabled={disabled || isLoading}>
            <Text style={{...globalStyles.buttonText, display:isLoading ? 'none' : 'flex'}}>{text}</Text>
            <ActivityIndicator style={{display:isLoading ? 'flex' : 'none'}} color={'#fff'}/>
        </TouchableOpacity>   
    )
}