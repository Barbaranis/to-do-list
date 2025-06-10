import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { database } from '../services/firebase';
import { ref, push } from 'firebase/database';


type AjoutTacheProps = {
  userId: string;
};


const AjoutTache: React.FC<AjoutTacheProps> = ({ userId }) => {
  const [texte, setTexte] = useState<string>('');


  const ajouterTache = async () => {
    if (!texte.trim() || !userId) return;


    const nouvelleTache = {
      titre: texte,
      terminee: false,
      createdAt: Date.now(),
      userId: userId,
    };


    try {
      const tachesRef = ref(database, 'taches/');
      await push(tachesRef, nouvelleTache);
      setTexte('');
      console.log('✅ Tâche ajoutée !');
    } catch (err) {
      console.error('❌ Erreur Firebase :', err);
    }
  };


  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Écris ta tâche..."
        value={texte}
        onChangeText={setTexte}
        style={styles.input}
      />
      <Button title="Ajouter" onPress={ajouterTache} />
    </View>
  );
};


const styles = StyleSheet.create({
  container: { padding: 10 },
  input: {
    borderBottomWidth: 1,
    marginBottom: 10,
    padding: 5,
  },
});


export default AjoutTache;

