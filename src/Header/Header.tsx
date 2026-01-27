import styles from './Header.module.css'

export interface HeaderProps {
    activeCount: number;
    completedCount: number;
}

export const Header = ({ activeCount, completedCount }: HeaderProps) => {
    return (
        <div className={styles.container}>
            <h1 className={styles.allTasks}>Все задачи</h1>
            <h2 className={styles.tasks}>
                Нужно сделать: {activeCount} | Сделано: {completedCount}
            </h2>
        </div>
    )
}