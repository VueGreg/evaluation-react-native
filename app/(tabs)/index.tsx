import { ThemedButton } from "@/components/themed-button";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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

    return (
      <View style={styles.obstacleCard}>
        <View style={styles.obstacleInfo}>
          <Text style={styles.obstacleTitle}>{item.title}</Text>
          <Text style={styles.obstacleType}>Type: {typeText}</Text>
          <Text style={styles.obstacleDescription}>{item.description}</Text>
          <Text style={styles.obstaclePosition}>Position: {item.latitude}, {item.longitude}</Text>
        </View>

        <ThemedButton
          onPress={() => deleteObstacle(item)}
          style={styles.deleteButton}
          iconName="delete"
          textStyle={{fontSize: 18, color: "white"}}
          backgroundColor="transparent"
        >
          Supprimer
        </ThemedButton>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Bonjour {name} {surname}</Text>
      <Text style={styles.subtitle}>Camion immatriculé {truckRegistration}</Text>

      <Text style={styles.obstaclesHeader}>Obstacles signalés ({obstacleList.length})</Text>
      <FlatList
        data={obstacleList}
        renderItem={renderObstacle}
        keyExtractor={(item, index) => index.toString()}
        style={styles.obstaclesList}
        showsVerticalScrollIndicator={false}
      />
      <View style={{flexDirection: "row", justifyContent: "flex-end"}}>
        <Pressable style={styles.button} onPress={() => {router.navigate('/obstacle')}}>
          <MaterialIcons name="add" style={{color: "black", fontSize: 40}}/>
        </Pressable>
      </View>
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
    fontSize: 30,
    color: "white",
    textAlign: "center",
    padding: 10
  },
  button: {
    margin: 20,
    backgroundColor: 'lightgray',
    borderRadius: "50%",
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
  obstaclesHeader: {
    fontSize: 24,
    color: "white",
    textAlign: "center",
    marginVertical: 10,
    fontWeight: "bold"
  },
  obstaclesList: {
    flex: 1,
    marginTop: 10
  },
  obstacleCard: {
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
  obstacleInfo: {
    flex: 1,
    marginRight: 10
  },
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