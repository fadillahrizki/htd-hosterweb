import { Pressable, Text, TouchableOpacity } from "react-native"
import { globalStyles } from "../styles/global"

export default CustomButton = ({onPress, text, style, disabled}) => {
    return (
        <TouchableOpacity onPress={onPress} style={{...globalStyles.buttonContainer, ...style, ...(disabled ? globalStyles.buttonDisabled : '')}} disabled={disabled}>
            <Text style={globalStyles.buttonText}>{text}</Text>
        </TouchableOpacity>   
    )
}