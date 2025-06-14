import React from 'react';
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
};


const styles = StyleSheet.create({
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

