import type React from "react";
import type { SelectOption, SortDirection, SortField } from "../../../types"
import styles from "./SortControl.module.css";
import { MySelect } from "../Selector/Selector";

export interface SortControls {
    className?: string;
    onSort: (field: SortField, direction: SortDirection) => void;
    currentSort: { field: SortField, direction: SortDirection }

}

export const MySortControl = ({ onSort, currentSort, }: SortControls) => {

    const sortFieldOptions: SelectOption[] = [
        { value: 'priority', label: 'Приоритету ' },
        { value: 'important', label: 'Важности ' },
        { value: 'hashtag', label: 'Хештегу' },
        { value: 'time', label: 'Времени' },
    ];

    const sortDirectionOptions: SelectOption[] = [
        { value: 'asc', label: 'По возрастанию ↑' },
        { value: 'desc', label: 'По убыванию ↓' },
    ];

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onSort(e.target.value as SortField, currentSort.direction);
    }

    const handleDirectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onSort(currentSort.field, e.target.value as SortDirection);
    };
    return (
        <>
            <div className={styles.filterContainer}>
                <label>Сортировать по:</label>
                <MySelect
                    name='select'
                    className={styles.select}
                    value={currentSort.field}
                    onChange={handleFilterChange}
                    options={sortFieldOptions}
                >
                </MySelect>
                <MySelect
                    name='select'
                    className={styles.select}
                    value={currentSort.direction}
                    onChange={handleDirectionChange}
                    options={sortDirectionOptions}
                >
                </MySelect>
            </div>
        </>
    )
}