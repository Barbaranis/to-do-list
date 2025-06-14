// src/screens/AdminScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { ref, onValue } from 'firebase/database';
import { database } from '../services/firebase';
import { COLORS } from '../styles/global';


const AdminScreen = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const usersRef = ref(database, 'admins/'); // 🔁 on lit depuis la table "admins"
    const unsubscribe = onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const userList = Object.entries(data).map(([uid, val]: [string, any]) => ({
          id: uid,
          ...val,
        }));
        setUsers(userList);
      } else {
        setUsers([]);
      }
      setLoading(false);
    });


    // 🔒 clean-up
    return () => unsubscribe();
  }, []);


  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>👑 Tableau de bord Admin</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.email}</Text>
            <Text>Rôle : {item.role || 'utilisateur'}</Text>
            <Text>Ajouté le : {new Date(item.createdAt).toLocaleDateString()}</Text>
          </View>
        )}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: COLORS.background },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  card: { padding: 12, backgroundColor: 'white', borderRadius: 8, marginBottom: 10 },
  name: { fontWeight: '600' },
});


export default AdminScreen;



