import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Keyboard,
} from 'react-native';
import { COLORS, SIZES } from '../styles/global';
import { database } from '../services/firebase';
import { ref, push } from 'firebase/database';


type TaskInputProps = {
  userId: string;
};


const TaskInput = ({ userId }: TaskInputProps) => {
  const [input, setInput] = useState('');


  const handleAdd = async () => {
    const trimmed = input.trim();
    if (!trimmed || !userId) {return;}


    const nouvelleTache = {
      titre: trimmed,
      terminee: false,
      createdAt: Date.now(),
      userId: userId,
    };


    try {
      const tachesRef = ref(database, 'taches/');
      await push(tachesRef, nouvelleTache);
      setInput('');
      Keyboard.dismiss();
    } catch (err) {
      console.error('❌ Erreur Firebase :', err);
    }
  };


  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Écris ta tâche ici ✏️"
        placeholderTextColor={COLORS.grey}
        value={input}
        onChangeText={setInput}
        returnKeyType="done"
        onSubmitEditing={handleAdd}
      />
      <TouchableOpacity style={styles.button} onPress={handleAdd}>
        <Text style={styles.buttonText}>Ajouter</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: SIZES.padding,
    marginVertical: SIZES.base * 2,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderColor: COLORS.lightGrey,
    borderWidth: 1,
    borderRadius: SIZES.radius,
    padding: SIZES.base * 1.5,
    backgroundColor: COLORS.white,
    fontSize: SIZES.font,
    color: COLORS.secondary,
    marginRight: SIZES.base,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: SIZES.base * 1.2,
    paddingHorizontal: SIZES.base * 2,
    borderRadius: SIZES.radius,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: SIZES.font,
  },
});


export default TaskInput;







