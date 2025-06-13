import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function WelcomeScreen() {
  const navigation = useNavigation();


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/847/847969.png' }}
          style={styles.logo}
        />
        <Text style={styles.headerTitle}>Bienvenue sur PetitPas </Text>
        <Text style={styles.headerSubtitle}>Un petit pas aujourd'hui, un grand sourire demain </Text>


        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pourquoi PetitPas ?</Text>
          <Text style={styles.sectionText}>
            PetitPas t’aide à mieux gérer ton temps, organiser tes tâches et atteindre tes objectifs pas à pas.
          </Text>
        </View>


        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fonctionnalités</Text>
          <View style={styles.listContainer}>
            <Text style={styles.listItem}>✅ To-do list simple et efficace</Text>
            <Text style={styles.listItem}>✅ Rappels de tâches</Text>
            <Text style={styles.listItem}>✅ Statistiques de progression</Text>
            <Text style={styles.listItem}>✅ Accessible partout</Text>
          </View>
        </View>


        {/* Ignore TS juste pour la navigation ici */}
        {/* @ts-ignore */}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Auth')}>
          <Text style={styles.buttonText}>Se connecter</Text>
        </TouchableOpacity>


      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFE4F2',
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    elevation: 5,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#D16BA5',
    textAlign: 'center',
    marginBottom: 10,
  },
  headerSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
  },
  listContainer: {
    backgroundColor: '#FFF5FA',
    padding: 15,
    borderRadius: 10,
  },
  listItem: {
    fontSize: 16,
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#D16BA5',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});


