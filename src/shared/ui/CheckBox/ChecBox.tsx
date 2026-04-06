import { type ChangeEvent } from "react"
import styles from './CheckBox.module.css'

export interface CheckboxInterface {
    name: string
    checked?: boolean;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    className?: string;
}

export const MyCheckbox = ({ name, checked, onChange, disabled, className }: CheckboxInterface) => {

    return (
        <>
            <div className={styles.inputContainder}>
                <input
                    name={name}
                    type="checkbox"
                    className={className}
                    checked={checked}
                    onChange={onChange}
                    disabled={disabled}
                />
            </div>
        </>
    )
}