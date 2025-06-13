import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';


export default function LoginScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }


    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('Connexion réussie', 'Bienvenue sur PetitPas 🎉');
      navigation.navigate('Profil');  // ✅ Redirection vers ton écran profil
    } catch (error: any) {
      Alert.alert('Erreur', error.message);
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Connexion</Text>


        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
        <TextInput style={styles.input} placeholder="Mot de passe" value={password} onChangeText={setPassword} secureTextEntry />


        <Button title="Se connecter" onPress={handleLogin} color="#D16BA5" />


        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Vous n’avez pas de compte ?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerLink}> Inscrivez-vous</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#FFE4F2' },
  card: { backgroundColor: '#fff', padding: 25, borderRadius: 20, width: '100%', elevation: 5 },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 20, color: '#D16BA5', textAlign: 'center' },
  input: { width: '100%', padding: 12, borderWidth: 1, borderColor: '#D16BA5', borderRadius: 10, marginBottom: 15 },
  registerContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 15 },
  registerText: { fontSize: 14, color: '#333' },
  registerLink: { fontSize: 14, color: '#D16BA5', fontWeight: 'bold' },
});
