import { useThemeColor } from "@/hooks/use-theme-color";
import { MaterialIcons } from "@expo/vector-icons";
import { PropsWithChildren } from "react";
import { GestureResponderEvent, Pressable, StyleSheet, Text } from "react-native";
import { TextStyle, ViewStyle } from "react-native/Libraries/StyleSheet/StyleSheetTypes";

type ThemedButtonProps = { 
    color?: string,
    backgroundColor?: string,
    iconName?: any
    style?: ViewStyle;
    textStyle?: TextStyle;
    onPress: (event: GestureResponderEvent) => void;
    iconSize?: number;
}

export function ThemedButton({ onPress, children, color, backgroundColor, style, iconName, textStyle, iconSize }: ThemedButtonProps & PropsWithChildren) {

    const containerColor = useThemeColor({light: backgroundColor, dark: backgroundColor}, 'buttonContainer')
    const textColor = useThemeColor({light: color, dark: color}, 'text')

    return (
        <Pressable onPress={onPress} style={[styles.container, { backgroundColor : containerColor }, style]}>

            { iconName ? <MaterialIcons 
                name={iconName} 
                color={textStyle?.color ?? textColor} 
                size={ textStyle?.fontSize ?? iconSize }>
            </MaterialIcons> : null}

            <Text style={[styles.text, { color: textColor }, textStyle]}>{children}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 5,
        paddingHorizontal: 20,
        alignSelf: 'stretch',
        borderRadius: 5,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'center',
        gap: 10,
        minHeight: 50,
    },
    text: {
        alignItems: "center",
        justifyContent: "center"
    }
})