import React, { useState } from "react";

import styles from './FilterSidebar.module.css'

import { type FilterPriority, type FilterStatus, type FilterTime, type SelectOption, type FilterState } from "../../../types";

import { MyButton } from "../Button/Button";

import { MySelect } from "../Selector/Selector";

import { MyInput } from "../Input/Input";

import { MyCheckbox } from "../CheckBox/ChecBox";


interface FilterSidebar {
    onFilterChange: (filters: FilterState) => void;
    initialFilters?: FilterState;
}

export const MyFilterSidebar = ({ onFilterChange, initialFilters, }: FilterSidebar) => {
    const [tempFilters, setTempFilters] = useState<FilterState>(
        initialFilters || {
            priority: 'all',
            status: 'all',
            hashtag: '',
            time: 'all',
            showOnlyPriority: false,
        }
    )

    const statusOptions: SelectOption[] = [
        { value: 'all', label: 'Все задачи' },
        { value: 'active', label: 'Активные' },
        { value: 'completed', label: 'Выполненные' },
    ]
    const priorityOptions: SelectOption[] = [
        { value: 'all', label: 'Все' },
        { value: 'low', label: 'Лёгкая' },
        { value: 'medium', label: 'Средняя' },
        { value: 'high', label: 'Высокая' },
    ]
    const timeOptions: SelectOption[] = [
        { value: 'all', label: 'Любое' },
        { value: 'morning', label: 'Утро (06:00-12:00' },
        { value: 'afternoon', label: 'День (12:00-18:00)' },
        { value: 'evening', label: 'Вечер (18:00-00:00)' },
    ]

    const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
        const newTempFilters = { ...tempFilters, [key]: value }
        setTempFilters(newTempFilters)
    }

    const applyFilters = () => {
        onFilterChange(tempFilters);
    }
    const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        updateFilter('priority', e.target.value as FilterPriority)
    }
    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        updateFilter('status', e.target.value as FilterStatus)
    }
    const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        updateFilter('time', e.target.value as FilterTime)
    }
    const handleHashtagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateFilter('hashtag', e.target.value)
    }
    const handlePriorityOnlyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateFilter('showOnlyPriority', e.target.checked)
    }
    const resetFilters = () => {
        const resetState: FilterState = {
            priority: 'all',
            status: 'all',
            hashtag: '',
            time: 'all',
            showOnlyPriority: false,
        };
        setTempFilters(resetState);
        onFilterChange(resetState);
    }
    return (
        <>
            <aside className={styles.container}>
                <h3 className={styles.filterText} >Фильтры</h3>
                <div>
                    <span>Статус задачи</span>
                    <MySelect
                        className={styles.select}
                        name='status'
                        value={tempFilters.status}
                        options={statusOptions}
                        onChange={handleStatusChange}
                    />
                </div>
                <div>
                    <span>Важность</span>
                    <MySelect
                        className={styles.select}
                        name='priority'
                        value={tempFilters.priority}
                        options={priorityOptions}
                        onChange={handlePriorityChange}
                    />
                </div>
                <div>
                    <span>Время</span>
                    <MySelect
                        className={styles.select}
                        name='time'
                        options={timeOptions}
                        value={tempFilters.time}
                        onChange={handleTimeChange}
                    />
                </div>
                <div>
                    <span>Хештег:</span>
                    <MyInput
                        className={styles.input}
                        name="hashtag"
                        value={tempFilters.hashtag}
                        onChange={handleHashtagChange}
                        placeholder='Хештег'
                    />
                </div>
                <div className={styles.checkboxContainer} >
                    <span>Только приоритетные задачи</span>
                    <MyCheckbox
                        name="checkboxPriority"
                        checked={tempFilters.showOnlyPriority}
                        onChange={handlePriorityOnlyChange}
                        className={styles.checkbox}
                    />
                </div>
                <div className={styles.buttonContainer}>
                    <div>
                        <MyButton
                            name='applyButton'
                            onClick={applyFilters}
                            className={styles.button}
                        >
                            Применить фильтры
                        </MyButton>
                    </div>
                    <div>
                        <MyButton
                            name='resetButton'
                            onClick={resetFilters}
                            className={styles.button}
                        >
                            Сбросить всё
                        </MyButton>
                    </div>
                </div>
            </aside >
        </>
    )
}


