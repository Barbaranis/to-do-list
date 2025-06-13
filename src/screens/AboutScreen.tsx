import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';


export default function AboutScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>À propos de PetitPas</Text>


        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notre mission 🎯</Text>
          <Text style={styles.sectionText}>
            PetitPas est ton compagnon quotidien pour mieux gérer ton temps, tes tâches et tes priorités, tout en douceur.
          </Text>
        </View>


        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pourquoi PetitPas 🐾</Text>
          <Text style={styles.sectionText}>
            Parce qu’un petit pas chaque jour, c’est déjà avancer. Notre philosophie repose sur le progrès régulier sans pression.
          </Text>
        </View>


        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nos valeurs ❤️</Text>
          <Text style={styles.sectionText}>
            Simplicité, bienveillance et efficacité. On t’aide à rester motivé sans jamais te surcharger.
          </Text>
        </View>


        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notre vision 🌍</Text>
          <Text style={styles.sectionText}>
            Aider un maximum de personnes à organiser leur quotidien, améliorer leur productivité et garder du temps pour eux.
          </Text>
        </View>


        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pour qui ? 👥</Text>
          <Text style={styles.sectionText}>
            Étudiants, professionnels, parents, créateurs de contenu... Tous ceux qui veulent mieux s’organiser au quotidien.
          </Text>
        </View>


        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nos fonctionnalités ⭐</Text>
          <Text style={styles.sectionText}>
            - Gestion des tâches{"\n"}
            - Rappels{"\n"}
            - Statistiques de productivité{"\n"}
            - Objectifs hebdomadaires{"\n"}
            - Interface simple et intuitive
          </Text>
        </View>


        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Petit bonus 💡</Text>
          <Text style={styles.sectionText}>
            PetitPas t’accompagne sans stress. Tu avances à ton rythme et on est là pour te motiver jour après jour.
          </Text>
        </View>
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#D16BA5',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#D16BA5',
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 22,
    color: '#333',
  },
});


