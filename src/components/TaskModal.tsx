import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Task } from '../types';
import { Alert } from 'react-native';


type Props = {
  visible: boolean;
  task: Task | null;
  onClose: () => void;
  onSave: (task: Task) => void;
};

export default function TaskModal({ visible, task, onClose, onSave }: Props) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Task['priority']>('Moyenne');
  const [deadline, setDeadline] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setPriority(task.priority);
      setDeadline(new Date(task.deadline));
    } else {
      setTitle('');
      setPriority('Moyenne');
      setDeadline(new Date());
    }
  }, [task]);

  const handleSave = () => {
    if (!title.trim()) {
  Alert.alert
("Le titre est obligatoire !");
      return;
    }

    onSave({
      id: task?.id || Date.now().toString(),
      title,
      priority,
      deadline: deadline.toISOString().split('T')[0],
      completed: task?.completed || false
    });
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.header}>{task ? "Modifier la tâche" : "Nouvelle tâche"}</Text>

          <TextInput
            placeholder="Titre de la tâche"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
          />

          <Text style={styles.label}>Priorité :</Text>
          <View style={styles.priorityRow}>
            {(['Haute', 'Moyenne', 'Basse'] as Task['priority'][]).map(p => (
              <TouchableOpacity
                key={p}
                style={[styles.priorityButton, priority === p && styles.selectedPriority]}
                onPress={() => setPriority(p)}
              >
                <Text style={priority === p ? styles.selectedText : styles.priorityText}>{p}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePicker}>
            <Text style={styles.dateText}>Avant le : {deadline.toISOString().split('T')[0]}</Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={deadline}
              mode="date"
              display={Platform.OS === 'ios' ? 'inline' : 'default'}
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) setDeadline(selectedDate);
              }}
            />
          )}

          <View style={styles.buttonsRow}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.buttonText}>Annuler</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.buttonText}>Enregistrer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  container: { backgroundColor: '#fff', padding: 20, borderRadius: 20, width: '90%' },
  header: { fontSize: 22, fontWeight: 'bold', color: '#D16BA5', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#D16BA5', borderRadius: 10, padding: 10, marginBottom: 20 },
  label: { fontWeight: 'bold', marginBottom: 10, fontSize: 16 },
  priorityRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  priorityButton: { padding: 10, borderWidth: 1, borderColor: '#D16BA5', borderRadius: 10 },
  selectedPriority: { backgroundColor: '#D16BA5' },
  priorityText: { color: '#D16BA5', fontWeight: '600' },
  selectedText: { color: '#fff', fontWeight: '600' },
  datePicker: { borderWidth: 1, borderColor: '#D16BA5', borderRadius: 10, padding: 10, marginBottom: 20 },
  dateText: { textAlign: 'center', color: '#333', fontSize: 16 },
  buttonsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  cancelButton: { backgroundColor: '#999', padding: 10, borderRadius: 10, flex: 1, marginRight: 10 },
  saveButton: { backgroundColor: '#D16BA5', padding: 10, borderRadius: 10, flex: 1 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' }
});
