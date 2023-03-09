import { Pressable, Text } from "react-native"
import { globalStyles } from "../styles/global"

export default CustomButton = ({onPress, text, style}) => {
    return (
        <Pressable onPress={onPress} style={{...globalStyles.buttonContainer, ...style}}>
            <Text style={globalStyles.buttonText}>{text}</Text>
        </Pressable>   
    )
}