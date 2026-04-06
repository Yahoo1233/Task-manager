import { type ChangeEvent } from "react"
import styles from './TextArea.module.css'

export interface TextAreaInterfase {
    name: string
    value: string
    className?: string
    handleTextAreaChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;

}

export const MyTextArea = ({ handleTextAreaChange, name, value, className }: TextAreaInterfase) => {

    return (
        <>
            <div className={styles.inputContainder}>
                <textarea
                    name={name}
                    value={value}
                    className={className}
                    onChange={handleTextAreaChange}
                />
            </div>
        </>
    )
}