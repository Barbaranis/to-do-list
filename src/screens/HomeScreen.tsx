import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import Header from '../components/Header';
import TaskInput from '../components/TaskInput';
import TaskList from '../components/TaskList';
import { COLORS } from '../styles/global';
import AsyncStorage from '@react-native-async-storage/async-storage';


const STORAGE_KEY = '@petitpas_tasks';


const HomeScreen = () => {
  const [tasks, setTasks] = useState<string[]>([]);


  // Charger les tâches depuis AsyncStorage
  const loadTasks = async () => {
    try {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setTasks(parsed);
      }
    } catch (error) {
      console.error('❌ Erreur de chargement :', error);
    }
  };


  // Sauvegarder les tâches dans AsyncStorage
  const saveTasks = async (newTasks: string[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks));
    } catch (error) {
      console.error('❌ Erreur de sauvegarde :', error);
    }
  };


  // Ajouter une tâche si elle est unique
  const addTask = (task: string) => {
    if (tasks.includes(task)) {
      Alert.alert('Tâche déjà ajoutée', 'Essaie d’écrire une tâche différente.');
      return;
    }
    const updated = [...tasks, task];
    setTasks(updated);
  };


  // Supprimer une tâche selon son index
  const deleteTask = (index: number) => {
    const updated = [...tasks];
    updated.splice(index, 1);
    setTasks(updated);
  };


  useEffect(() => {
    loadTasks();
  }, []);


  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);


  return (
    <View style={styles.container}>
      <Header />
      <TaskInput onAddTask={addTask} />
      <TaskList tasks={tasks} onDeleteTask={deleteTask} />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});


export default HomeScreen;

