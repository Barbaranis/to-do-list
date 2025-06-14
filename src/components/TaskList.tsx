import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import TaskItem from './TaskItem';
import { SIZES } from '../styles/global';


type Task = {
  id: string;
  titre: string;
  terminee: boolean;
};


type TaskListProps = {
  tasks: Task[];
};


const TaskList = ({ tasks }: TaskListProps) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem
            id={item.id}
            titre={item.titre}
            terminee={item.terminee}
          />
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



