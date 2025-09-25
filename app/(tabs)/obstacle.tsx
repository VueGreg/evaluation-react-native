import { ThemedButton } from '@/components/themed-button';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Picker } from '@react-native-picker/picker';
import * as Location from 'expo-location';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Obstacle, TypeObstacle } from '../../interfaces/obstacle';
import { LocalStorageServiceAsync } from '../../utils/storage';

export default function ObstaclePage() {

  const { control, handleSubmit, reset, formState: { errors } } = useForm<Obstacle>({
    defaultValues: {
      title: '',
      description: '',
    }
  });

  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    async function getCurrentLocation() {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }

    getCurrentLocation();
  }, []);

  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const inputBackgroundColor = useThemeColor({light: '#f8f9fa', dark: '#2a2a2a'}, 'background');
  const borderColor = useThemeColor({light: '#e9ecef', dark: '#404040'}, 'icon');
  const placeholderColor = useThemeColor({light: '#6c757d', dark: '#9BA1A6'}, 'icon');

  const TYPE_OBSTACLE : TypeObstacle[] = [
    {
        id: 1,
        name: "Infrastructure"
    },
    {
        id: 2,
        name: "Sécurité"
    },
    {
        id: 3,
        name: "Voirie"
    },
    {
        id: 4,
        name: "Urgence"
    }
  ]

  const onSubmit = async(data: Obstacle) => {

    data.id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });

    data.userName = data.userName ?? await LocalStorageServiceAsync.getData('name')
    data.userSurname = data.userSurname ?? await LocalStorageServiceAsync.getData('surname')
    data.truckRegistration = data.truckRegistration ?? await LocalStorageServiceAsync.getData('truckRegistration')
    data.state = true;
    data.longitude = location?.coords.longitude;
    data.latitude = location?.coords.latitude
    console.log('Obstacle signalé:', data);
    await LocalStorageServiceAsync.storeData(`obstacle-${data.id}`, JSON.stringify(data));

    reset();

    router.navigate('/');
  };


  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <View style={styles.container}>
        <Text style={[styles.title, { color: textColor }]}>Signaler un obstacle</Text>

        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: textColor }]}>Nom de l'obstacle</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                style={[
                  styles.input,
                  {
                    backgroundColor: inputBackgroundColor,
                    borderColor: borderColor,
                    color: textColor,
                  }
                ]}
                placeholder="Entrez le nom de l'obstacle"
                placeholderTextColor={placeholderColor}
              />
            )}
            name="title"
            rules={{ required: 'Vous devez renseigner le nom' }}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: textColor }]}>Description</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                style={[
                  styles.input,
                  styles.textArea,
                  {
                    backgroundColor: inputBackgroundColor,
                    borderColor: borderColor,
                    color: textColor,
                  }
                ]}
                placeholder="Décrivez l'obstacle en détail"
                placeholderTextColor={placeholderColor}
                multiline
                numberOfLines={4}
              />
            )}
            name="description"
            rules={{ required: 'Vous devez ajouter une description' }}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: textColor }]}>Type d'obstacle</Text>
          <View style={[styles.pickerContainer, { backgroundColor: inputBackgroundColor, borderColor: borderColor }]}>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <Picker
                  selectedValue={value}
                  style={[styles.picker, { color: textColor }]}
                  onValueChange={onChange}
                  dropdownIconColor={textColor}
                >
                  <Picker.Item label="Sélectionnez un type" value="" color={placeholderColor} />
                  {TYPE_OBSTACLE.map((type) => (
                    <Picker.Item key={type.id} label={type.name} value={type.name} color={"black"} />
                  ))}
                </Picker>
              )}
              name="type"
              rules={{ required: 'Vous devez renseigner le type' }}
            />
          </View>
        </View>

        <View style={{flexDirection: "row", justifyContent: "space-between", width: "100%"}}>
            <View style={styles.buttonContainer}>
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

          <View style={styles.buttonContainer}>
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
  container: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    paddingVertical: 12,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
  },
  buttonContainer: {
    marginTop: 32,
    alignItems: 'center',
    justifyContent: "center"
  },
  submitButton: {
    width: 150,
    height: 56,
    borderRadius: 12,
  },
});