import { type ChangeEvent } from "react"
import styles from './Selector.module.css'
import type { SelectOption } from "../../../types";

export interface SelectorInterface {
    name: string
    value?: string
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    options: SelectOption[];
    className?: string
}

export const MySelect = ({ onChange, name, options, className }: SelectorInterface) => {

    return (
        <>
            <div className={styles.SelectorContainder}>
                <select
                    className={className}
                    name={name}
                    onChange={onChange}>
                    {options.map((option) => {
                        return (
                            <option
                                key={name}
                                value={option.value}
                            >
                                {option.label}
                            </option>)
                    })}
                </select>
            </div>
        </>
    )
}