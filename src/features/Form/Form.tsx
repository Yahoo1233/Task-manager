import { useState, type ChangeEvent } from 'react'

import styles from './Form.module.css'

import type { ImportantStatus, SelectOption, TaskItem } from '../../types';

import { isImportantStatus } from '../../shared/utils/checkIsImportant';

import { MyInput } from '../../shared/ui/Input/Input';

import { MyTextArea } from '../../shared/ui/TextArea/TextArea';

import { MySelect } from '../../shared/ui/Selector/Selector';

import { MyCheckbox } from '../../shared/ui/CheckBox/ChecBox';

import { MyButton } from '../../shared/ui/Button/Button';

export interface FormProps {
    onAddTask: (task: TaskItem) => void;
}

export const Form = ({ onAddTask }: FormProps) => {
    const [task, setTask] = useState<string>('')

    const [time, setTime] = useState<string>('')

    const [priority, setPriority] = useState<boolean>(false)

    const [important, setImportant] = useState<ImportantStatus>('low')

    const [hashtag, setHashtag] = useState<string>('')

    const [description, setDescription] = useState<string>('')

    const taskOptions: SelectOption[] = [
        { value: 'low', label: 'Лёгкая' },
        { value: 'medium', label: 'Средняя' },
        { value: 'high', label: 'Сложная' },
    ];

    const handleInputsChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked } = e.target
        if (name === 'task') {
            setTask(value)
        } else if (name === 'time') {
            setTime(value)
        } else if (name === 'hashtag') {
            setHashtag(value)
        } else if (name === 'priority')
            setPriority(checked)
    }

    const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target
        if (name === 'description')
            setDescription(value)
    }

    const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target
        if (name === 'important' && isImportantStatus(value)) {
            setImportant(value)
        }
    }

    const addTask = () => {
        const newTask: TaskItem = {
            id: crypto.randomUUID(),
            task: task.trim(),
            time,
            completed: false,
            priority,
            important,
            hashtag,
            description,
        }
        onAddTask(newTask)
        setTask('')
        setTime('')
        setPriority(false)
        setImportant('low')
        setHashtag('')
        setDescription('')
    }

    return (
        <>
            <div className={styles.inputs}>
                <div className={styles.containerInput}>
                    <label className={styles.taskText}>Задание:</label>
                    <MyInput
                        className={styles.taskInput}
                        name="task"
                        value={task}
                        onChange={handleInputsChange}
                    />
                </div>
                <div className={styles.containerInput}>
                    <label className={styles.timeText}>Время выполения:</label>
                    <MyInput
                        className={styles.timeInput}
                        name="time"
                        value={time}
                        onChange={handleInputsChange}
                    />
                </div>
                <div className={styles.containerInput}>
                    <label className={styles.hashtagText}>Хештег</label>
                    <MyInput
                        name="hashtag"
                        value={hashtag}
                        className={styles.hashtagInput}
                        onChange={handleInputsChange}
                    />
                </div>
                <div className={styles.containerInput}>
                    <label className={styles.description}>Описание</label>
                    <MyTextArea
                        className={styles.descriptionInput}
                        name="description"
                        value={description}
                        handleTextAreaChange={handleTextAreaChange}
                    />
                </div>
            </div>
            <div className={styles.checkboxContainer}>``
                <label>Приоритетная задача?</label>
                <MyCheckbox
                    className={styles.inputPriority}
                    name='priority'
                    checked={priority}
                    onChange={handleInputsChange}
                />
            </div>
            <div className={styles.selectContainer}>
                <label>Важность задачи?</label>
                <MySelect
                    className={styles.select}
                    name='important'
                    options={taskOptions}
                    onChange={handleSelectChange}
                />
            </div>
            <MyButton
                className={styles.button}
                name='button'
                onClick={addTask}
            >
                Добавить задачу
            </MyButton>
        </>
    )
}