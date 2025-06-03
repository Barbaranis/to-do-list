import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Keyboard } from 'react-native';
import { COLORS, SIZES } from '../styles/global';

type TaskInputProps = {
  onAddTask: (task: string) => void;
};

const TaskInput = ({ onAddTask }: TaskInputProps) => {
  const [input, setInput] = useState('');

  const handleAdd = () => {
    if (input.trim() !== '') {
      onAddTask(input);
      setInput('');
      Keyboard.dismiss();
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
      />
      <Button title="Ajouter" onPress={handleAdd} color={COLORS.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: SIZES.padding,
    marginVertical: SIZES.base * 2,
    alignItems: 'center',
    gap: 10,
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
  },
});

export default TaskInput;

