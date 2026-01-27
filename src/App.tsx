import styles from './App.module.css'
import { Header } from './Header/Header'
import { Form } from './Form/Form'
import { List } from './List/List'
import { useState } from 'react'
import type { TaskItem } from './types'
export const App = () => {
  const [tasks, setTasks] = useState<TaskItem[]>([])

  const addTask = (newTask: TaskItem) => {
    setTasks(prev => [...prev, newTask])
  }

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id))
  }

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(task =>
      task.id === id
        ? { ...task, completed: !task.completed }
        : task))
  }

  const activeTasks = tasks.filter(task => !task.completed)

  const completedTasks = tasks.filter(task => task.completed)

  return (

    <div className={styles.container}>
      <Header
        activeCount={activeTasks.length}
        completedCount={completedTasks.length}
      />
      <Form onAddTask={addTask} />
      <List
        activeTasks={activeTasks}
        completedTasks={completedTasks}
        onDeleteTask={deleteTask}
        onToggleTask={toggleTask} />
    </div>
  )
}