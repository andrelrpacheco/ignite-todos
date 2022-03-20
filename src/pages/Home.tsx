import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export type EditTaskArgs = {
  taskId: number,
  taskNewTitle: string
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const newTasks = tasks.find(task => task.title === newTaskTitle)
    if (newTasks) {
      Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome",
      )
      return
    }
    const data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }

    setTasks(oldState => [...oldState, data])
  }

  function handleToggleTaskDone(id: number) {
    const updatedTask = tasks.map(task => ({ ...task }))

    const taskToBeMarkedAsDone = updatedTask.find(task => task.id === id)

    if (!taskToBeMarkedAsDone) return

    taskToBeMarkedAsDone.done = !taskToBeMarkedAsDone.done

    setTasks(updatedTask)
  }

  function handleRemoveTask(id: number) {
    const removeTask = tasks.filter(task => task.id !== id)
    Alert.alert(
      'Remover item',
      'Tem certeza que você deseja remover esse item?',
      [
        {
          text: 'Não',
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: () => setTasks(removeTask),
        },
      ]
    )
  }

  function handleEditTask({ taskId, taskNewTitle }: EditTaskArgs) {
    const updatedTask = tasks.map(task => ({ ...task }))

    const taskToBeEdited = updatedTask.find(task => task.id === taskId)

    if (!taskToBeEdited) return

    taskToBeEdited.title = taskNewTitle

    setTasks(updatedTask)
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})