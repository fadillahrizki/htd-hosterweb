import { ActivityIndicator, Text, TouchableOpacity } from "react-native"
import { Color, globalStyles } from "../styles/global"

export default CustomButton = ({onPress, text, style, disabled, isLoading = false, type = 1}) => {
    return (
        <TouchableOpacity onPress={onPress} style={[(type == 1 ? globalStyles.buttonContainer : globalStyles.buttonContainerSecondary), style, (disabled ? globalStyles.buttonDisabled : '')]} disabled={disabled || isLoading}>
            {
                isLoading ? 
                <ActivityIndicator color={Color.White}/> :
                <Text style={{...(type == 1 ? globalStyles.buttonText : globalStyles.buttonTextSecondary)}}>{text}</Text>
            }
        </TouchableOpacity>   
    )
}