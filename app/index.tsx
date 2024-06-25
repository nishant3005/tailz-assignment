import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';
import { useRouter } from 'expo-router';

interface Pet {
  id: string;
  name: string;
  type: string;
  breed: string;
  weight: string;
  color: string;
  image: string;
}

const HomeScreen = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get(
          'https://run.mocky.io/v3/7befd809-b169-488d-9d1a-044012c16f88'
        );
        console.log('Full Response:', response); // Log the full response object

        if (typeof response.data === 'string') {
          // Assuming the response is a JSON string, parse it into an array of objects
          const parsedData = JSON.parse(response.data);
          if (Array.isArray(parsedData)) {
            setPets(parsedData);
          } else {
            console.error(
              'Invalid response format - parsed data is not an array:',
              parsedData
            );
          }
        } else if (Array.isArray(response.data)) {
          setPets(response.data);
        } else {
          console.error(
            'Invalid response format - response.data is not an array:',
            response.data
          );
        }
      } catch (error) {
        console.error('Error fetching pet data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPets();
  }, []);

  const handlePetSelect = (value: string) => {
    const pet = pets.find((pet) => pet.id === value) || null;
    setSelectedPet(pet);
    if (pet) {
      router.push({
        pathname: '/pet-details',
        params: { pet: JSON.stringify(pet) },
      });
    }
  };

  //   const navigateToDetails = () => {
  //     if (selectedPet) {
  //       router.push({
  //         pathname: 'pet-details',
  //         params: { pet: JSON.stringify(selectedPet) },
  //       });
  //     }
  //   };

  if (loading) {
    return (
      <View style={styles.spinner}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ImageBackground
      source={require('../assets/images/background.jpg')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Select a Pet</Text>
        {pets.length > 0 ? (
          <View style={styles.pickerWrapper}>
            <RNPickerSelect
              onValueChange={(itemValue) => handlePetSelect(itemValue)}
              items={pets.map((pet) => ({ label: pet.name, value: pet.id }))}
              style={pickerSelectStyles}
              value={selectedPet?.id}
              placeholder={{ label: 'Select a pet...', value: null }}
            />
          </View>
        ) : (
          <Text style={{ color: '#fff' }}>No pets available</Text>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
    justifyContent: 'center',
  },
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 16,
    paddingBottom: 75,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    width: '100%',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
    color: '#fff',
  },
  picker: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Light background for better readability
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerWrapper: {
    backgroundColor: 'white',
    borderRadius: 18,
    marginBottom: 8,
    overflow: 'hidden',
    marginHorizontal: 20,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    padding: 10,
    color: 'black',
  },
  inputAndroid: {
    padding: 10,
    color: 'black',
  },
});

export default HomeScreen;
