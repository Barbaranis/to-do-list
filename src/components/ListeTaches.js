import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { database } from '../services/firebase';
import { ref, onValue } from 'firebase/database';


const ListeTaches = ({ userId }) => {
  const [taches, setTaches] = useState([]);


  useEffect(() => {
    if (!userId) {return;}


    const tachesRef = ref(database, 'taches/');
    const unsubscribe = onValue(tachesRef, (snapshot) => {
      const data = snapshot.val();
      const liste = data
        ? Object.entries(data)
            .map(([id, val]) => ({ id, ...val }))
            .filter((tache) => tache.userId === userId)
        : [];


      setTaches(liste);
    });


    return () => unsubscribe();
  }, [userId]);


  return (
    <View style={styles.container}>
      <Text style={styles.title}>📋 Mes tâches</Text>
      <FlatList
        data={taches}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={styles.item}>
            {item.terminee ? '✅' : '🕒'} {item.titre}
          </Text>
        )}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: { padding: 10 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  item: { fontSize: 16, marginVertical: 4 },
});


export default ListeTaches;

