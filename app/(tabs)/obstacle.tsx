import { ThemedButton } from '@/components/themed-button';
import { FormField } from '@/components/ui/form-field';
import { FormPicker } from '@/components/ui/form-picker';
import { TYPE_OBSTACLE } from '@/constants/typesObstacle';
import { useLocationPermissions } from '@/hooks/use-permissions';
import { useThemeColor } from '@/hooks/use-theme-color';
import { commonStyles } from '@/styles/common';
import { UUID } from '@/utils/uuid';
import { router } from 'expo-router';
import { useForm } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Obstacle } from '../../interfaces/obstacle';
import { LocalStorageServiceAsync } from '../../utils/storage';

export default function ObstaclePage() {

  const { control, handleSubmit, reset } = useForm<Obstacle>({
    defaultValues: {
      title: '',
      description: '',
    }
  });

  const { location, getCurrentLocation, status } = useLocationPermissions();

  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');


  const onSubmit = async(data: Obstacle) => {

    let currentLocation = location;
    if (!currentLocation || !currentLocation.coords) {
      currentLocation = await getCurrentLocation();
    }

    data.id = UUID.generateUUID()
    data.userName = data.userName ?? await LocalStorageServiceAsync.getData('name')
    data.userSurname = data.userSurname ?? await LocalStorageServiceAsync.getData('surname')
    data.truckRegistration = data.truckRegistration ?? await LocalStorageServiceAsync.getData('truckRegistration')
    data.state = true;
    data.longitude = currentLocation?.coords.longitude;
    data.latitude = currentLocation?.coords.latitude;

    await LocalStorageServiceAsync.storeData(`obstacle-${data.id}`, JSON.stringify(data));

    reset();

    router.navigate('/');
  };


  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <View style={commonStyles.safeAreaContainer}>
        <Text style={[commonStyles.pageTitle, { color: textColor }]}>Signaler un obstacle</Text>

        <FormField
          control={control}
          name="title"
          label="Nom de l'obstacle"
          placeholder="Entrez le nom de l'obstacle"
          rules={{ required: 'Vous devez renseigner le nom' }}
        />

        <FormField
          control={control}
          name="description"
          label="Description"
          placeholder="Décrivez l'obstacle en détail"
          multiline
          numberOfLines={4}
          rules={{ required: 'Vous devez ajouter une description' }}
        />

        <FormPicker
          control={control}
          name="type"
          label="Type d'obstacle"
          placeholder="Sélectionnez un type"
          options={TYPE_OBSTACLE.map(type => ({ label: type.name, value: type.name }))}
          rules={{ required: 'Vous devez renseigner le type' }}
        />

        <View style={commonStyles.buttonRow}>
            <View style={commonStyles.buttonContainer}>
              <ThemedButton
                onPress={() => { router.navigate('/camera') }}
                style={{borderColor: "white", borderWidth: 1, width: 175}}
                backgroundColor={"transparent"}
                color="#ffffff"
                iconName={"add-a-photo"}
                iconSize={24}
              >
                Ajouter une photo
              </ThemedButton>
          </View>

          <View style={commonStyles.buttonContainer}>
            <ThemedButton
              onPress={handleSubmit(onSubmit, (validationErrors) => {
                console.log('Erreurs de validation:', validationErrors);
              })}
              style={{width: 175}}
              backgroundColor={useThemeColor({light: '#0a7ea4', dark: '#4A90E2'}, 'tint')}
              color="#ffffff"
              iconName={"library-add-check"}
              iconSize={24}
            >
              Signaler l'obstacle
            </ThemedButton>
          </View>
      </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});