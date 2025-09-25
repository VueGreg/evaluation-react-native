import { ThemedButton } from "@/components/themed-button";
import { Card } from "@/components/ui/card";
import { CONTACTS } from "@/constants/contacts";
import { Contact } from "@/interfaces/contact";
import { commonStyles } from "@/styles/common";
import { useState } from "react";
import { Alert, FlatList, Linking, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


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
        const actions = (
            <ThemedButton
                onPress={() => handleCall(item.phoneNumber)}
                style={styles.callButton}
                iconName="phone"
                textStyle={{fontSize: 18, color: "white"}}
                backgroundColor="transparent"
            >
                Appeler
            </ThemedButton>
        );

        return (
            <Card actions={actions}>
                <Text style={styles.contactName}>{item.name}</Text>
                <Text style={styles.contactType}>Type: {item.type.name}</Text>
                <Text style={styles.contactDescription}>{item.description}</Text>
                <Text style={styles.contactAddress}>{item.adress}</Text>
                <Text style={styles.contactPhone}>{item.phoneNumber}</Text>
            </Card>
        );
    };

    return (
        <SafeAreaView style={commonStyles.container}>
            <Text style={commonStyles.title}>Contacts Utiles</Text>
            <Text style={commonStyles.subtitle}>Services d'urgence et maintenance</Text>

            <Text style={commonStyles.listHeader}>Contacts disponibles ({contacts.length})</Text>
            <FlatList
                data={contacts}
                renderItem={renderContact}
                keyExtractor={(item) => item.id}
                style={commonStyles.list}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
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