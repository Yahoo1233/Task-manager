import type { TaskItem } from '../types';
import styles from './List.module.css'
interface ListProps {
    activeTasks: TaskItem[],
    completedTasks: TaskItem[],
    onDeleteTask: (id: string) => void;
    onToggleTask: (id: string) => void;
}
export const List = ({ onDeleteTask, onToggleTask, activeTasks, completedTasks }: ListProps) => {

    return (
        <>
            <div className={styles.container}>
                <div className={styles.active}>
                    <h3>Активные задачи</h3>
                    <ol>
                        {activeTasks.map(item => (
                            <li key={item.id}>
                                {item.task} {item.time}
                                <input
                                    type='checkbox'
                                    checked={false}
                                    onChange={() => onToggleTask(item.id)}
                                />
                            </li>))}
                    </ol>
                </div>
                <div className={styles.complitedTasks}>
                    <h3 >Выполеннные задачи</h3>
                    <ol>
                        {completedTasks.map(item => (
                            <li key={item.id} >{item.task} {item.time}
                                <button
                                    onClick={() => onDeleteTask(item.id)}>
                                    Удалить
                                </button>
                            </li>))}
                    </ol>
                </div>
            </div>
        </>
    )
}