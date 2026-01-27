import { useState, type ChangeEvent } from 'react'

import styles from './Form.module.css'

import type { TaskItem } from '../types';

export interface FormProps {
    onAddTask: (task: TaskItem) => void;
}

export const Form = ({ onAddTask }: FormProps) => {
    const [task, setTask] = useState<string>('')

    const [time, setTime] = useState<string>('')

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        if (name === 'task') {
            setTask(value)
        } else if (name === 'time') {
            setTime(value)
        }
    }
    const addTask = () => {
        const newTask: TaskItem = {
            id: crypto.randomUUID(),
            task: task.trim(),
            time,
            completed: false
        }
        onAddTask(newTask)
        setTask('')
        setTime('')
    }
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            addTask()
        }
    }
    return (
        <>
            <div className={styles.container}>
                <div className={styles.containerTask}>
                    <label className={styles.taskText}>Задание:</label>
                    <input
                        className={styles.input}
                        name='task'
                        type="text"
                        value={task}
                        onChange={handleChange}
                        onKeyDown={handleKeyPress}
                        placeholder='Задача'
                    />
                </div>
                <div className={styles.containerTask}>
                    <label className={styles.timeTask}> Время выполения:</label>
                    <input
                        className={styles.input}
                        name='time'
                        type="text"
                        value={time}
                        onChange={handleChange}
                        onKeyDown={handleKeyPress}
                        placeholder='Время выполнения'
                    />
                </div>
                <button
                    className={styles.button}
                    onClick={addTask}
                >Добавить задачу
                </button>
            </div>
        </>
    )
}