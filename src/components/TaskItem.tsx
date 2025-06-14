import React from 'react';
<<<<<<< HEAD
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Task } from '../types';


type Props = {
  task: Task;
  onToggle: () => void;
  onPress: () => void;
};


export default function TaskItem({ task, onToggle, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.itemContainer}>
      {/* La case à cocher */}
      <TouchableOpacity onPress={onToggle}>
        <Icon
          name={task.completed ? 'check-circle' : 'checkbox-blank-circle-outline'}
          size={28}
          color={task.completed ? '#D16BA5' : '#ccc'}
        />
      </TouchableOpacity>


      {/* Contenu de la tâche */}
      <View style={styles.content}>
        <Text style={[styles.title, task.completed && styles.completedText]}>
          {task.title}
        </Text>


        {/* Informations complémentaires */}
        <View style={styles.metaContainer}>
          <View style={[styles.priorityBadge, getPriorityStyle(task.priority)]}>
            <Text style={styles.priorityText}>{task.priority}</Text>
          </View>


          <Text style={styles.deadline}>Avant le : {task.deadline}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}


// Gestion des couleurs selon la priorité
const getPriorityStyle = (priority: Task['priority']) => {
  switch (priority) {
    case 'Haute': return { backgroundColor: '#ff6b6b' };
    case 'Moyenne': return { backgroundColor: '#ffa726' };
    case 'Basse': return { backgroundColor: '#4caf50' };
    default: return { backgroundColor: '#999' };
  }
=======
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
>>>>>>> b6a3167d22ddf2d3419ddae27a5d9080a7138809
};


const styles = StyleSheet.create({
<<<<<<< HEAD
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  content: {
    marginLeft: 15,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  completedText: {
    textDecorationLine: 'line-through',
    opacity: 0.5,
  },
  metaContainer: {
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center',
  },
  priorityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
    marginRight: 10,
  },
  priorityText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
  deadline: {
    color: '#666',
    fontSize: 12,
  },
});

=======
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



>>>>>>> b6a3167d22ddf2d3419ddae27a5d9080a7138809
