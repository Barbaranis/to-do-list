import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Alert, Modal, Platform, Button, LayoutAnimation, UIManager
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Progress from 'react-native-progress';


if (Platform.OS === 'android') UIManager.setLayoutAnimationEnabledExperimental?.(true);


type Priority = 'Haute' | 'Moyenne' | 'Basse';


type Task = {
  id: string;
  title: string;
  completed: boolean;
  priority: Priority;
  deadline: string;
};


export default function ProfileScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);


  useEffect(() => {
    const loadTasks = async () => {
      try {
        const stored = await AsyncStorage.getItem('tasks');
        if (stored) setTasks(JSON.parse(stored));
      } catch {
        Alert.alert('Erreur', 'Impossible de charger les tâches.');
      }
    };
    loadTasks();
  }, []);


  useEffect(() => {
    AsyncStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);


  const openModal = (task?: Task) => {
    if (task) setCurrentTask(task);
    else setCurrentTask({
      id: Date.now().toString(),
      title: '',
      completed: false,
      priority: 'Moyenne',
      deadline: new Date().toISOString().split('T')[0]
    });
    setModalVisible(true);
  };


  const saveTask = () => {
    if (!currentTask?.title.trim()) {
      Alert.alert('Erreur', 'Veuillez entrer un titre.');
      return;
    }
    LayoutAnimation.easeInEaseOut();
    setTasks(prev => {
      const exists = prev.find(t => t.id === currentTask.id);
      if (exists) {
        return prev.map(t => t.id === currentTask.id ? currentTask : t);
      } else {
        return [...prev, currentTask];
      }
    });
    setModalVisible(false);
  };


  const toggleTask = (id: string) => {
    LayoutAnimation.easeInEaseOut();
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };


  const deleteTask = (id: string) => {
    const taskToDelete = tasks.find(t => t.id === id);
    Alert.alert("Supprimer", `Supprimer la tâche : "${taskToDelete?.title}" ?`, [
      { text: "Annuler" },
      {
        text: "Supprimer",
        style: "destructive",
        onPress: () => {
          LayoutAnimation.easeInEaseOut();
          setTasks(prev => prev.filter(t => t.id !== id));
        }
      }
    ]);
  };


  const resetTasks = () => {
    Alert.alert("Reset", "Supprimer toutes les tâches ?", [
      { text: "Annuler" },
      {
        text: "Supprimer tout",
        style: "destructive",
        onPress: () => {
          LayoutAnimation.easeInEaseOut();
          setTasks([]);
        }
      }
    ]);
  };


  const sortedTasks = tasks.sort((a, b) => {
    if (a.deadline !== b.deadline) return a.deadline.localeCompare(b.deadline);
    const priorityOrder = { 'Haute': 0, 'Moyenne': 1, 'Basse': 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });


  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const progress = totalTasks === 0 ? 0 : completedTasks / totalTasks;


  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Ma To-Do PetitPas ✨</Text>


        <View style={styles.summaryContainer}>
          <Text style={styles.summaryText}>
            Total : {totalTasks} | Terminées : {completedTasks} | Restantes : {totalTasks - completedTasks}
          </Text>
          <Button title="Tout réinitialiser" color="#FF6B6B" onPress={resetTasks} />
        </View>


        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>{completedTasks} / {totalTasks} terminées</Text>
          <Progress.Bar progress={progress} color="#D16BA5" width={null} height={10} borderRadius={20} />
        </View>


        <FlatList
          data={sortedTasks}
          renderItem={({ item }) => (
            <View style={styles.taskItem}>
              <TouchableOpacity onPress={() => toggleTask(item.id)} onLongPress={() => openModal(item)} style={styles.taskContent}>
                <Icon name={item.completed ? "check-circle" : "checkbox-blank-circle-outline"} size={24} color={item.completed ? "#D16BA5" : "#ccc"} />
                <View style={{ marginLeft: 10 }}>
                  <Text style={[styles.taskText, item.completed && styles.completedText]}>{item.title}</Text>
                  <Text style={styles.metaText}>Priorité: {item.priority} • Avant le: {item.deadline}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteTask(item.id)}>
                <Icon name="delete-outline" size={24} color="#D16BA5" />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
        />
      </View>


      <TouchableOpacity style={styles.floatingButton} onPress={() => openModal()}>
        <Icon name="plus" size={30} color="#fff" />
      </TouchableOpacity>


      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Nouvelle tâche</Text>
            <TextInput
              style={styles.input}
              placeholder="Nom de la tâche"
              value={currentTask?.title || ''}
              onChangeText={(text) => setCurrentTask(prev => prev ? { ...prev, title: text } : null)}
            />


            <Text style={styles.label}>Priorité :</Text>
            <View style={styles.priorityRow}>
              {(['Haute', 'Moyenne', 'Basse'] as Priority[]).map(p => (
                <TouchableOpacity key={p} style={[styles.priorityButton, currentTask?.priority === p && styles.prioritySelected]} onPress={() => setCurrentTask(prev => prev ? { ...prev, priority: p } : null)}>
                  <Text style={currentTask?.priority === p ? styles.prioritySelectedText : styles.priorityText}>{p}</Text>
                </TouchableOpacity>
              ))}
            </View>


            <Text style={styles.label}>Date :</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <Text style={styles.dateText}>{currentTask?.deadline}</Text>
            </TouchableOpacity>


            {showDatePicker && (
              <DateTimePicker
                value={new Date(currentTask?.deadline || new Date().toISOString())}
                mode="date"
                display={Platform.OS === 'ios' ? 'inline' : 'default'}
                onChange={(e, selected) => {
                  setShowDatePicker(false);
                  if (selected) setCurrentTask(prev => prev ? { ...prev, deadline: selected.toISOString().split('T')[0] } : null);
                }}
              />
            )}


            <View style={styles.modalActions}>
              <Button title="Annuler" color="#999" onPress={() => setModalVisible(false)} />
              <Button title="Enregistrer" color="#D16BA5" onPress={saveTask} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFE4F2' },
  card: { backgroundColor: '#fff', margin: 20, padding: 20, borderRadius: 20, flex: 1, elevation: 5 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#D16BA5', marginBottom: 20, textAlign: 'center' },
  progressContainer: { marginBottom: 20 },
  progressText: { marginBottom: 10, fontSize: 16, textAlign: 'center' },
  listContainer: { paddingBottom: 100 },
  summaryContainer: { marginBottom: 20, alignItems: 'center' },
  summaryText: { fontSize: 16, marginBottom: 10, color: '#333' },


  taskItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFF5FA', padding: 15, borderRadius: 10, marginBottom: 10 },
  taskContent: { flexDirection: 'row', alignItems: 'flex-start' },
  taskText: { fontSize: 16, marginLeft: 10 },
  completedText: { textDecorationLine: 'line-through', color: '#999' },
  metaText: { fontSize: 12, color: '#555', marginTop: 4 },


  floatingButton: { backgroundColor: '#D16BA5', position: 'absolute', bottom: 30, right: 30, width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', elevation: 8 },


  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: '#fff', padding: 20, borderRadius: 20, width: '90%' },
  modalTitle: { fontSize: 24, fontWeight: 'bold', color: '#D16BA5', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#D16BA5', borderRadius: 10, padding: 12, marginBottom: 15, fontSize: 16 },
  label: { fontSize: 16, marginBottom: 8 },
  priorityRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  priorityButton: { padding: 10, borderRadius: 10, borderWidth: 1, borderColor: '#D16BA5' },
  prioritySelected: { backgroundColor: '#D16BA5' },
  priorityText: { color: '#D16BA5', fontWeight: '600' },
  prioritySelectedText: { color: '#fff', fontWeight: '600' },
  dateText: { fontSize: 16, textAlign: 'center', padding: 10, borderWidth: 1, borderColor: '#D16BA5', borderRadius: 10, marginBottom: 20 },
  modalActions: { flexDirection: 'row', justifyContent: 'space-around' },
});


