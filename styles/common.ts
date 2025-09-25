import { StyleSheet } from 'react-native';

export const commonStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    safeAreaContainer: {
        flex: 1,
        padding: 24,
    },
    title: {
        fontSize: 40,
        color: "white",
        textAlign: "center",
        padding: 10
    },
    pageTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 32,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 24,
        color: "white",
        textAlign: "center",
        padding: 10
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%"
    },
    buttonContainer: {
        marginTop: 32,
        alignItems: 'center',
        justifyContent: "center"
    },
    floatingButton: {
        margin: 20,
        backgroundColor: 'lightgray',
        borderRadius: 50,
        width: 75,
        height: 75,
        borderWidth: 1,
        borderColor: "white",
        shadowColor: "white",
        shadowOffset: {width: 2, height: 4},
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
        justifyContent: "center",
        alignItems: "center"
    },
    listHeader: {
        fontSize: 24,
        color: "white",
        textAlign: "center",
        marginVertical: 10,
        fontWeight: "bold"
    },
    list: {
        flex: 1,
        marginTop: 10
    }
});