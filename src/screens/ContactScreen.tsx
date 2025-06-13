import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Switch, ScrollView } from 'react-native';


export default function ContactScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [cookiesAccepted, setCookiesAccepted] = useState(false);


  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


  const handleSubmit = () => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();


    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      Alert.alert('Erreur', 'Tous les champs sont obligatoires.');
      return;
    }


    if (!emailRegex.test(trimmedEmail)) {
      Alert.alert('Erreur', 'Veuillez entrer un email valide.');
      return;
    }


    if (!cookiesAccepted) {
      Alert.alert('Erreur', 'Vous devez accepter les cookies pour continuer.');
      return;
    }


    Alert.alert('Succès', 'Votre message a été envoyé avec succès !');


    setName('');
    setEmail('');
    setMessage('');
    setCookiesAccepted(false);
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Contactez-nous</Text>


        <TextInput
          style={styles.input}
          placeholder="Votre nom"
          value={name}
          onChangeText={setName}
        />


        <TextInput
          style={styles.input}
          placeholder="Votre email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />


        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Votre message"
          value={message}
          onChangeText={setMessage}
          multiline
          numberOfLines={4}
        />


        <View style={styles.cookieContainer}>
          <Switch
            value={cookiesAccepted}
            onValueChange={setCookiesAccepted}
            trackColor={{ false: '#ccc', true: '#D16BA5' }}
            thumbColor={cookiesAccepted ? '#fff' : '#fff'}
          />
          <Text style={styles.cookieText}>
            J'accepte les cookies et la politique de confidentialité.
          </Text>
        </View>


        <Button title="Envoyer" onPress={handleSubmit} disabled={!cookiesAccepted} color="#D16BA5" />
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
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#D16BA5',
  },
  input: {
    borderWidth: 1,
    borderColor: '#D16BA5',
    padding: 12,
    marginBottom: 15,
    borderRadius: 10,
    fontSize: 16,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  cookieContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  cookieText: {
    marginLeft: 10,
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
});






