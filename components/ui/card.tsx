import { PropsWithChildren, ReactNode } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

type CardProps = {
    style?: ViewStyle;
    actions?: ReactNode;
}

export function Card({ children, style, actions }: CardProps & PropsWithChildren) {
    return (
        <View style={[styles.card, style]}>
            <View style={styles.content}>
                {children}
            </View>
            {actions && (
                <View style={styles.actions}>
                    {actions}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.2)",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    content: {
        flex: 1,
        marginRight: 10
    },
    actions: {
        // Actions container
    }
});