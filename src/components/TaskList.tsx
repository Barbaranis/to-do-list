import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import TaskItem from './TaskItem';
import { SIZES } from '../styles/global';


type TaskListProps = {
  tasks: string[];
  onDeleteTask: (index: number) => void;
};


const TaskList = ({ tasks, onDeleteTask }: TaskListProps) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TaskItem task={item} onDelete={() => onDeleteTask(index)} />
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    paddingHorizontal: SIZES.padding,
    paddingBottom: SIZES.padding * 2,
  },
});


export default TaskList;






