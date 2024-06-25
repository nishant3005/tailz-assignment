import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams } from 'expo-router';

interface Pet {
  id: string;
  name: string;
  type: string;
  breed: string;
  weight: string;
  color: string;
  image: string;
}

const PetDetailsScreen = () => {
  const { pet: petString } = useLocalSearchParams();
  const pet: Pet = JSON.parse(petString as string);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <LinearGradient
      colors={['#fc9068', '#f77140']} // Adjust the colors for the gradient
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.imageContainer}>
          {!imageLoaded && (
            <ActivityIndicator
              size="large"
              color="#ffffff"
              style={styles.loader}
            />
          )}
          <Image
            source={{ uri: pet.image }}
            style={styles.image}
            onLoad={() => setImageLoaded(true)}
          />
        </View>
        <LinearGradient
          colors={['#fa5032', '#FF6347']} // Gradient colors for the card
          style={styles.card}
        >
          <View style={styles.dot} />
          <View style={[styles.dot, styles.dotRight]} />
          <Text style={styles.title}>{pet.name}</Text>
          <Text style={styles.detailText}>Type: {pet.type}</Text>
          <Text style={styles.detailText}>Breed: {pet.breed}</Text>
          <Text style={styles.detailText}>Weight: {pet.weight}</Text>
          <Text style={styles.detailText}>Color: {pet.color}</Text>
        </LinearGradient>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 200,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    position: 'absolute',
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 200,
  },
  card: {
    width: '90%',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  detailText: {
    fontSize: 18,
    marginBottom: 10,
    color: '#fff',
  },
  dot: {
    position: 'absolute',
    top: 15,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    left: 15,
  },
  dotRight: {
    left: '100%',
    marginLeft: 10,
  },
});

export default PetDetailsScreen;
