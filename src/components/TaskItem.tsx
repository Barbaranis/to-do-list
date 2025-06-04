import React, { useState } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Pressable,
  Alert,
} from 'react-native';
import { COLORS, SIZES } from '../styles/global';


type TaskItemProps = {
  task: string;
  onDelete: () => void;
};


const TaskItem = ({ task, onDelete }: TaskItemProps) => {
  const [done, setDone] = useState(false);


  const toggleDone = () => {
    setDone(!done);
  };


  const confirmDelete = () => {
    Alert.alert(
      'Confirmation',
      'Tu es sûre de vouloir supprimer cette tâche ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Supprimer', style: 'destructive', onPress: onDelete },
      ],
      { cancelable: true }
    );
  };


  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleDone} style={styles.taskContent}>
        <View style={[styles.checkbox, done && styles.checkedBox]} />
        <Text style={[styles.text, done && styles.doneText]}>{task}</Text>
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



