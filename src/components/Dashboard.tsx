import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../styles/global';
import type { User } from 'firebase/auth';


interface Props {
  taches: Array<{ terminee: boolean }>;
  user: User;
}


const Dashboard = ({ taches, user }: Props) => {
  const total = taches.length;
  const done = taches.filter(t => t.terminee).length;


  return (
    <View style={styles.card}>
      <Text style={styles.title}>Bienvenue {user.email} 👋</Text>
      <Text style={styles.stat}>Total de tâches : {total}</Text>
      <Text style={styles.stat}>✅ Terminées : {done}</Text>
      <Text style={styles.stat}>🕒 En attente : {total - done}</Text>
    </View>
  );
};


const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.lightGrey ?? '#f4f4f4',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 18,
    color: COLORS.primary ?? '#333',
  },
  stat: {
    fontSize: 16,
    marginBottom: 4,
    color: COLORS.secondary ?? '#555',
  },
});


export default Dashboard;



