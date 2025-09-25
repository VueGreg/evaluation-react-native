import { ThemedButton } from "@/components/themed-button";
import { Contact } from "@/interfaces/contact";
import { useState } from "react";
import { Alert, FlatList, Linking, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CONTACTS : Contact[] = [
    {
        id: "1",
        name: "Service Technique Municipal",
        type: { id: 1, name: "Infrastructure" },
        description: "Service responsable de la maintenance des routes et de l'infrastructure urbaine",
        phoneNumber: "01.23.45.67.89",
        adress: "12 Rue de la Mairie, 75001 Paris"
    },
    {
        id: "2",
        name: "Police Municipale",
        type: { id: 2, name: "Sécurité" },
        description: "Forces de l'ordre locales pour les interventions d'urgence",
        phoneNumber: "01.98.76.54.32",
        adress: "5 Place de la République, 75001 Paris"
    },
    {
        id: "3",
        name: "Service de Voirie",
        type: { id: 3, name: "Voirie" },
        description: "Équipes de nettoyage et de maintenance de la voie publique",
        phoneNumber: "01.56.78.90.12",
        adress: "8 Avenue des Travaux, 75001 Paris"
    },
    {
        id: "4",
        name: "Pompiers - Caserne Centrale",
        type: { id: 4, name: "Urgence" },
        description: "Service d'incendie et de secours pour les situations d'urgence",
        phoneNumber: "18",
        adress: "15 Boulevard des Secours, 75001 Paris"
    },
    {
        id: "5",
        name: "Entreprise BTP Solutions",
        type: { id: 1, name: "Infrastructure" },
        description: "Entreprise de travaux publics spécialisée dans la réparation routière",
        phoneNumber: "01.34.56.78.90",
        adress: "22 Zone Industrielle Nord, 75001 Paris"
    }
]

export default function ContactPage () {
    const [contacts] = useState<Contact[]>(CONTACTS);

    const handleCall = (phoneNumber: string) => {
        const phoneUrl = `tel:${phoneNumber}`;
        Linking.canOpenURL(phoneUrl).then(supported => {
            if (supported) {
                Linking.openURL(phoneUrl);
            } else {
                Alert.alert("Erreur", "Impossible d'ouvrir l'application téléphone");
            }
        });
    };

    const renderContact = ({ item }: { item: Contact }) => {
        return (
            <View style={styles.contactCard}>
                <View style={styles.contactInfo}>
                    <Text style={styles.contactName}>{item.name}</Text>
                    <Text style={styles.contactType}>Type: {item.type.name}</Text>
                    <Text style={styles.contactDescription}>{item.description}</Text>
                    <Text style={styles.contactAddress}>{item.adress}</Text>
                    <Text style={styles.contactPhone}>{item.phoneNumber}</Text>
                </View>

                <ThemedButton
                    onPress={() => handleCall(item.phoneNumber)}
                    style={styles.callButton}
                    iconName="phone"
                    textStyle={{fontSize: 18, color: "white"}}
                    backgroundColor="transparent"
                >
                    Appeler
                </ThemedButton>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Contacts Utiles</Text>
            <Text style={styles.subtitle}>Services d'urgence et maintenance</Text>

            <Text style={styles.contactsHeader}>Contacts disponibles ({contacts.length})</Text>
            <FlatList
                data={contacts}
                renderItem={renderContact}
                keyExtractor={(item) => item.id}
                style={styles.contactsList}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    title: {
        fontSize: 40,
        color: "white",
        textAlign: "center",
        padding: 10
    },
    subtitle: {
        fontSize: 24,
        color: "white",
        textAlign: "center",
        padding: 10
    },
    contactsHeader: {
        fontSize: 24,
        color: "white",
        textAlign: "center",
        marginVertical: 10,
        fontWeight: "bold"
    },
    contactsList: {
        flex: 1,
        marginTop: 10
    },
    contactCard: {
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
    contactInfo: {
        flex: 1,
        marginRight: 10
    },
    contactName: {
        fontSize: 18,
        color: "white",
        fontWeight: "bold",
        marginBottom: 5
    },
    contactType: {
        fontSize: 14,
        color: "#0a7ea4",
        marginBottom: 5,
        fontWeight: "600"
    },
    contactDescription: {
        fontSize: 14,
        color: "#ccc",
        marginBottom: 8,
        fontStyle: "italic"
    },
    contactAddress: {
        fontSize: 13,
        color: "white",
        marginBottom: 3
    },
    contactPhone: {
        fontSize: 14,
        color: "white",
        fontWeight: "500"
    },
    callButton: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        minHeight: 40,
        borderRadius: 8
    }
})