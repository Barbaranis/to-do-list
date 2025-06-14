import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';


export default function Features() {
  const features = [
    'To-do list simple et efficace',
    'Rappels de tâches',
    'Statistiques de progression',
    'Accessible partout',
  ];


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Fonctionnalités</Text>
      </View>
      {features.map((text, i) => (
        <View key={i} style={styles.feature}>
          <Text style={styles.bullet}>{'\u2022'}</Text>
          <Text style={styles.featureText}>{text}</Text>
        </View>
      ))}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFE6F0',
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
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  title: { fontSize: 22, fontWeight: '600', marginLeft: 12, color: '#333' },
  feature: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
  bullet: { fontSize: 20, color: '#D16BA5', marginRight: 10 },
  featureText: { fontSize: 16, color: '#555' },
});

