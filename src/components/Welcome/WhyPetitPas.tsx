import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';



export default function WhyPetitPas() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        
        <Text style={styles.title}>Pourquoi PetitPas ?</Text>
      </View>
      <Text style={styles.text}>
        PetitPas t’aide à mieux gérer ton temps, organiser tes tâches et atteindre tes objectifs sans stress.
      </Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFE6F0', // fond très doux cohérent
    margin: 20,
    padding: 20,
    borderRadius: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 12 
  },
  title: { 
    fontSize: 22, 
    fontWeight: '600', 
    marginLeft: 12, 
    color: '#333' 
  },
  text: { 
    fontSize: 16, 
    color: '#555', 
    lineHeight: 24 
  },
});



