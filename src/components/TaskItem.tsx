import React, { useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
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


  return (
    <TouchableOpacity onPress={toggleDone} onLongPress={onDelete}>
      <View style={styles.container}>
        <View style={[styles.checkbox, done && styles.checkedBox]} />
        <Text style={[styles.text, done && styles.doneText]}>
          {task}
        </Text>
      </View>
    </TouchableOpacity>
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
  },
  doneText: {
    textDecorationLine: 'line-through',
    color: COLORS.grey,
  },
});


export default TaskItem;






