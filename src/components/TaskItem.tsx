import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Pressable,
  Alert,
} from 'react-native';
import { COLORS, SIZES } from '../styles/global';
import { database } from '../services/firebase';
import { ref, update, remove } from 'firebase/database';


type TaskItemProps = {
  id: string;
  titre: string;
  terminee: boolean;
};


const TaskItem = ({ id, titre, terminee }: TaskItemProps) => {
  const toggleDone = async () => {
    try {
      const tacheRef = ref(database, `taches/${id}`);
      await update(tacheRef, { terminee: !terminee });
    } catch (err) {
      console.error('❌ Erreur mise à jour Firebase :', err);
    }
  };


  const confirmDelete = () => {
    Alert.alert(
      'Confirmation',
      'Tu es sûre de vouloir supprimer cette tâche ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: async () => {
            try {
              const tacheRef = ref(database, `taches/${id}`);
              await remove(tacheRef);
            } catch (err) {
              console.error('❌ Erreur suppression Firebase :', err);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };


  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleDone} style={styles.taskContent}>
        <View style={[styles.checkbox, terminee && styles.checkedBox]} />
        <Text style={[styles.text, terminee && styles.doneText]}>{titre}</Text>
      </TouchableOpacity>


      <Pressable onPress={confirmDelete} style={styles.deleteButton}>
        <Text style={styles.deleteText}>🗑️</Text>
      </Pressable>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SIZES.base * 1.25,
    paddingHorizontal: SIZES.padding,
    marginVertical: SIZES.base / 2,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    elevation: 1,
    justifyContent: 'space-between',
  },
  taskContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: COLORS.success,
    marginRight: SIZES.base * 1.5,
  },
  checkedBox: {
    backgroundColor: COLORS.success,
  },
  text: {
    fontSize: SIZES.font + 2,
    color: COLORS.secondary,
    flexShrink: 1,
  },
  doneText: {
    textDecorationLine: 'line-through',
    color: COLORS.grey,
  },
  deleteButton: {
    marginLeft: SIZES.base,
    padding: 4,
  },
  deleteText: {
    fontSize: 18,
  },
});


export default TaskItem;



