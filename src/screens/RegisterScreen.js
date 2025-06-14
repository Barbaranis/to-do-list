import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, StyleSheet } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { database } from '../services/firebase';


const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleRegister = async () => {
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;


      // Enregistrer l'utilisateur dans Firebase Database avec rôle "user"
      await set(ref(database, 'users/' + user.uid), {
        email: user.email,
        role: 'user',
      });


      console.log('✅ Compte créé avec succès');
      navigation.navigate('Home'); // Ou Login si tu préfères
    } catch (error) {
      Alert.alert('Erreur', error.message);
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Créer un compte 📝</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="S'inscrire" onPress={handleRegister} />
      <Button title="Déjà un compte ?" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};


const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: 'center' },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: { borderBottomWidth: 1, marginBottom: 15, padding: 10 },
});


export default RegisterScreen;



