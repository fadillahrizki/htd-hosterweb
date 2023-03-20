import { ActivityIndicator, Text, TouchableOpacity } from "react-native"
import { Color, globalStyles } from "../styles/global"

export default CustomButton = ({onPress, text, style, disabled, isLoading = false, type = 1}) => {
    return (
        <TouchableOpacity onPress={onPress} style={{...(type == 1 ? globalStyles.buttonContainer : globalStyles.buttonContainerSecondary), ...style, ...(disabled ? globalStyles.buttonDisabled : '')}} disabled={disabled || isLoading}>
            <Text style={{...(type == 1 ? globalStyles.buttonText : globalStyles.buttonTextSecondary), display:isLoading ? 'none' : 'flex'}}>{text}</Text>
            <ActivityIndicator style={{display:isLoading ? 'flex' : 'none'}} color={Color.White}/>
        </TouchableOpacity>   
    )
}