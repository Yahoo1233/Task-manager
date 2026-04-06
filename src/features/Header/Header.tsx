import { MyButton } from '../../shared/ui/Button/Button';
import styles from './Header.module.css'

export interface HeaderProps {
    onClick: VoidFunction;
}

export const Header = ({ onClick }: HeaderProps) => {
    return (
        <div className={styles.container}>
            <MyButton
                name='AddTaskButton'
                className={styles.button}
                onClick={onClick}
            >Добавить задачу
            </MyButton>
        </div>
    )
}