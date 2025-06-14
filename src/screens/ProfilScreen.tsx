import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Alert, LayoutAnimation, Platform, UIManager, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TaskItem from '../components/TaskItem';
import TaskModal from '../components/TaskModal';
import { Task } from '../types';


if (Platform.OS === 'android') UIManager.setLayoutAnimationEnabledExperimental?.(true);


export default function ProfileScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);


  useEffect(() => {
    const loadTasks = async () => {
      const stored = await AsyncStorage.getItem('tasks');
      if (stored) setTasks(JSON.parse(stored));
    };
    loadTasks();
  }, []);


  useEffect(() => {
    AsyncStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);


  const toggleTask = (id: string) => {
    LayoutAnimation.easeInEaseOut();
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };


  const openActionMenu = (task: Task) => {
    Alert.alert("Action", `"${task.title}"`, [
      { text: "Modifier", onPress: () => { setEditingTask(task); setModalVisible(true); } },
      { text: "Supprimer", style: "destructive", onPress: () => deleteTask(task.id) },
      { text: "Annuler", style: "cancel" }
    ]);
  };


  const deleteTask = (id: string) => {
    LayoutAnimation.easeInEaseOut();
    setTasks(prev => prev.filter(t => t.id !== id));
  };


  const saveTask = (task: Task) => {
    LayoutAnimation.easeInEaseOut();
    setTasks(prev => {
      const exists = prev.find(t => t.id === task.id);
      if (exists) return prev.map(t => t.id === task.id ? task : t);
      else return [...prev, task];
    });
    setModalVisible(false);
    setEditingTask(null);
  };


  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onToggle={() => toggleTask(item.id)}
            onPress={() => openActionMenu(item)}
          />
        )}
        contentContainerStyle={styles.list}
      />


      <TouchableOpacity style={styles.addButton} onPress={() => { setEditingTask(null); setModalVisible(true); }}>
        <Icon name="plus" size={30} color="#fff" />
      </TouchableOpacity>


      <TaskModal visible={modalVisible} task={editingTask} onClose={() => setModalVisible(false)} onSave={saveTask} />
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFE4F2' },
  list: { padding: 20 },
  addButton: { position: 'absolute', bottom: 30, right: 30, backgroundColor: '#D16BA5', padding: 20, borderRadius: 40 }
});