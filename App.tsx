import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged, User } from 'firebase/auth';
import { ref, onValue } from 'firebase/database';
import { auth, database } from './src/services/firebase';
import { View, ActivityIndicator, StyleSheet } from 'react-native';


import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import AdminScreen from './src/screens/AdminScreen';


const Stack = createNativeStackNavigator();


export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [initializing, setInitializing] = useState(true);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);


      if (currentUser) {
        const userRef = ref(database, `users/${currentUser.uid}/role`);
        onValue(userRef, (snapshot) => {
          const fetchedRole = snapshot.val();
          console.log('🎭 Rôle détecté :', fetchedRole);
          setRole(fetchedRole || 'user');
          setInitializing(false);
        }, (error) => {
          console.error('Erreur lors de la récupération du rôle :', error);
          setInitializing(false);
        });
      } else {
        setRole(null);
        setInitializing(false);
      }
    });


    return unsubscribe;
  }, []);


  if (initializing) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FF7F50" />
      </View>
    );
  }


  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          role === 'admin' ? (
            <Stack.Screen name="Admin" component={AdminScreen} />
          ) : (
            <Stack.Screen name="Home" component={HomeScreen} />
          )
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

