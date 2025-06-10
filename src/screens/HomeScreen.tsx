import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase, ref, onValue } from 'firebase/database';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';


import { auth } from '../services/firebase';
import AjoutTache from '../components/AjoutTache';
import TaskList from '../components/TaskList';
import { COLORS } from '../styles/global';


const STORAGE_KEY = '@petitpas_tasks';


type Tache = {
  id: string;
  titre: string;
  terminee: boolean;
  userId: string;
};


const HomeScreen = () => {
  const [taches, setTaches] = useState<Tache[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u: User | null) => {
      setUser(u);
      setLoading(false);
    });
    return unsubscribe;
  }, []);


  useEffect(() => {
    const loadLocalTasks = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          setTaches(JSON.parse(stored));
        }
      } catch (err) {
        console.error('❌ Erreur chargement local :', err);
      }
    };
    loadLocalTasks();
  }, []);


  useEffect(() => {
    if (!user) {return;}


    const db = getDatabase();
    const tachesRef = ref(db, 'taches/');


    const unsubscribe = onValue(tachesRef, (snapshot) => {
      const data = snapshot.val();
      const liste: Tache[] = data
        ? Object.entries(data)
            .map(([id, val]: [string, any]) => ({ id, ...val }))
            .filter((tache) => tache.userId === user.uid)
        : [];


      setTaches(liste);
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(liste));
    });


    return () => unsubscribe();
  }, [user]);


  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('🔓 Déconnecté !');
      navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
    } catch (err) {
      console.error('Erreur de déconnexion :', err);
    }
  };


  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }


  if (!user) {
    return (
      <View style={styles.center}>
        <Text>Pas d'utilisateur connecté.</Text>
      </View>
    );
  }


  const total = taches.length;
  const terminees = taches.filter((t) => t.terminee).length;
  const restantes = total - terminees;


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcome}>Bienvenue 👋</Text>
        <Button title="Se déconnecter" onPress={handleLogout} />
      </View>


      <View style={styles.dashboard}>
        <Text style={styles.stats}>Total : {total}</Text>
        <Text style={styles.stats}>✅ Terminées : {terminees}</Text>
        <Text style={styles.stats}>🕒 Restantes : {restantes}</Text>
        <Text style={styles.motivation}>Tu gères ! Continue comme ça 💪</Text>
      </View>


      <AjoutTache userId={user.uid} />


      {total === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Tu n’as encore rien noté 📝</Text>
          <Text style={styles.emptySub}>Ajoute ta première tâche juste au-dessus !</Text>
        </View>
      ) : (
        <TaskList tasks={taches} />
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 10,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  welcome: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dashboard: {
    backgroundColor: COLORS.lightGrey,
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
  },
  stats: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: '500',
    color: COLORS.secondary,
  },
  motivation: {
    marginTop: 6,
    fontStyle: 'italic',
    color: COLORS.primary,
  },
  emptyContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  emptySub: {
    fontSize: 14,
    color: COLORS.grey,
  },
});


export default HomeScreen;

