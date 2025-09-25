import { ThemedButton } from "@/components/themed-button";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CameraScreen () {

    const [ permission, requestPermission ] = useCameraPermissions();
    const cameraRef = useRef<CameraView>(null);
    const [ photoUri, setPhotoUri ] = useState<string | null>(null)

    const onTakePhoto = () => {
        cameraRef.current?.takePictureAsync({
            skipProcessing: true
        }).then((photoData) => {
            setPhotoUri(photoData.uri);
        })
    }
    
    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>Vous avez besoin des autorisations pour utiliser la camera</Text>
                <ThemedButton onPress={requestPermission}>Autoriser l'utilisation de la camera</ThemedButton>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <CameraView ref={cameraRef} style={styles.camera} />

            <View style={styles.renderContainer}>
                <ThemedButton onPress={() => { router.navigate('/obstacle') }} iconName={"arrow-back"} style={styles.backButton} textStyle={{color: "white"}}>Retour</ThemedButton>
                { photoUri ?
                    <Image source={photoUri} style={styles.renderImage}></Image>
                : null}
            </View>
            

            <View style={styles.snapContainer}>
                <ThemedButton onPress={onTakePhoto} style={styles.snap}></ThemedButton>
            </View>
            
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    camera: {
        flex: 1
    },
    text: {

    },
    message : {
        textAlign: 'center',
        paddingBottom: 10,
    },
    snap: {
        borderRadius: "50%",
        width: 75,
        height: 75,
        backgroundColor: "transparent",
        borderColor: "white",
        borderWidth: 5,
    },
    snapContainer: {
        position: "absolute",
        top: 700,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%"
    },
    renderContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        //debug
        //borderWidth: 1,
        //borderColor: "gray",
        height: 75,
        alignItems: "center"
    },
    renderImage: {
        height: 75,
        width: 75
    },
    backButton: {
        width: 100,
        height: 75,
        padding: 0,
        marginHorizontal: 0,
        backgroundColor: "transparent",
    }
})