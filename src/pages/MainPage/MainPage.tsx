import { useEffect, useState } from 'react'
import { Form } from '../../features/Form/Form'
import { List } from '../../features/List/List'
import { Header } from '../../features/Header/Header'
import { Modal } from '../../shared/ui/ModalWindow/Modal'
import styles from './MainPage.module.css'
import type { TaskItem } from '../../types'

export const MainPage = () => {
    const [tasks, setTasks] = useState<TaskItem[]>([])

    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        const promise = fetch(`http://localhost:3000/todo/list`)
        console.log(promise)
    }, [])

    const addTask = (newTask: TaskItem) => {
        setTasks(prev => [...prev, newTask])
        setIsOpen(false)
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
        <>
            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            >
                <Form
                    onAddTask={addTask}
                />
            </Modal>
            <div className={styles.container}>
                <Header
                    onClick={() => setIsOpen(true)}
                />
                <List
                    activeTasks={activeTasks}
                    completedTasks={completedTasks}
                    onDeleteTask={deleteTask}
                    onToggleTask={toggleTask}
                />
            </div>
        </>
    )
}