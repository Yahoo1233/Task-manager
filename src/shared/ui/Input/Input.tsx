import { type ChangeEvent } from "react"
import styles from './input.module.css'

export interface InputInterface {
    name: string
    value: string
    className?: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string
}

export const MyInput = ({ onChange, name, value, className, placeholder }: InputInterface) => {

    return (
        <>
            <div className={styles.inputContainder}>
                <input
                    name={name}
                    type="text"
                    value={value}
                    className={className}
                    onChange={onChange}
                    placeholder={placeholder}
                />
            </div>
        </>
    )
}