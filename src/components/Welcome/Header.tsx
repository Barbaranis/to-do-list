import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';


export default function Header() {
  return (
    <View style={styles.header}>
      <Image
        source={require('../../assets/petitpaslogo.jpg')}
        style={styles.logo}
      />
      <Text style={styles.title}>Bienvenue sur PetitPas</Text>
      <Text style={styles.subtitle}>Chaque petit pas te rapproche de tes grands objectifs</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  header: {
    backgroundColor: 'rgba(184, 107, 165, 0.54)', // 🎨 fond plus doux, rose pastel
    padding: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    alignItems: 'center',
  },
  logo: {
    width: 90,
    height: 90,
    marginBottom: 20,
    borderRadius: 39,  // cercle parfait
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.59)', 
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
});



