import { ThemedButton } from "@/components/themed-button";
import { Card } from "@/components/ui/card";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { commonStyles } from "@/styles/common";
import { Obstacle } from "../../interfaces/obstacle";
import { LocalStorageServiceAsync } from "../../utils/storage";

export default function Index() {

  const [obstacleList, setObstacleList] = useState<Obstacle[]>([]);

  const truckRegistration = "AA-123-BB";
  const name = "Jean";
  const surname = "Fonce"

  const deleteObstacle = async (obstacleToDelete: Obstacle) => {
    try {
      console.log(obstacleToDelete);
      await LocalStorageServiceAsync.removeData(`obstacle-${obstacleToDelete.id}`);
      const updatedObstacles = obstacleList.filter(obstacle => obstacle.id !== obstacleToDelete.id);
      setObstacleList(updatedObstacles);
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'obstacle:', error);
    }
  }

  useEffect(() => {

    const setUser = async () => {
      await LocalStorageServiceAsync.storeData("truckRegistration", truckRegistration);
      await LocalStorageServiceAsync.storeData("name", name);
      await LocalStorageServiceAsync.storeData("surname", surname);
    }

    const fetchObstacles = async () => {
      const allData = await LocalStorageServiceAsync.getAllData();
      const obstacles: Obstacle[] = [];

      for (const [key, value] of Object.entries(allData)) {
        if (key.startsWith('obstacle-')) {
          try {
            const obstacle = typeof value === 'string' ? JSON.parse(value) : value;
            obstacles.push(obstacle);
          } catch (error) {
            console.error('Erreur lors du parsing de l\'obstacle:', error);
          }
        }
      }

      setObstacleList(obstacles);
    };

    setUser();
    fetchObstacles();
  });

  const renderObstacle = ({ item }: { item: Obstacle }) => {
    const typeText = typeof item.type === 'string' ? item.type : item.type?.name || 'Non défini';

    const actions = (
      <ThemedButton
        onPress={() => deleteObstacle(item)}
        style={styles.deleteButton}
        iconName="delete"
        textStyle={{fontSize: 18, color: "white"}}
        backgroundColor="transparent"
      >
        Supprimer
      </ThemedButton>
    );

    return (
      <Card actions={actions}>
        <Text style={styles.obstacleTitle}>{item.title}</Text>
        <Text style={styles.obstacleType}>Type: {typeText}</Text>
        <Text style={styles.obstacleDescription}>{item.description}</Text>
        <Text style={styles.obstaclePosition}>Position: {item.latitude}, {item.longitude}</Text>
      </Card>
    );
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <Text style={commonStyles.title}>Bonjour {name} {surname}</Text>
      <Text style={commonStyles.subtitle}>Camion immatriculé {truckRegistration}</Text>

      <Text style={commonStyles.listHeader}>Obstacles signalés ({obstacleList.length})</Text>
      <FlatList
        data={obstacleList}
        renderItem={renderObstacle}
        keyExtractor={(item, index) => index.toString()}
        style={commonStyles.list}
        showsVerticalScrollIndicator={false}
      />
      <View style={{flexDirection: "row", justifyContent: "flex-end"}}>
        <Pressable style={commonStyles.floatingButton} onPress={() => {router.navigate('/obstacle')}}>
          <MaterialIcons name="add" style={{color: "black", fontSize: 40}}/>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  obstacleTitle: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    marginBottom: 5
  },
  obstacleType: {
    fontSize: 14,
    color: "#0a7ea4",
    marginBottom: 5,
    fontWeight: "600"
  },
  obstacleDescription: {
    fontSize: 14,
    color: "#ccc",
    marginBottom: 8,
    fontStyle: "italic"
  },
  obstaclePosition: {
    fontSize: 13,
    color: "white",
    fontWeight: "500"
  },
  deleteButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    minHeight: 40,
    borderRadius: 8
  }
})