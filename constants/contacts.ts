import { Contact } from "@/interfaces/contact";

export const CONTACTS: Contact[] = [
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
];