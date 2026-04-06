import { useMemo, useState } from 'react';

import { CheckMark, PriorityIcon } from '../../shared/assets';

import { type TaskItem, type SortField, type SortDirection, type FilterState } from '../../types';

import styles from './List.module.css';

import { MySortControl } from '../../shared/ui/SortControl/SortControl';
import { MyFilterSidebar } from '../../shared/ui/FilterSidebar/FilterSidebar';

interface ListProps {
    activeTasks: TaskItem[],
    completedTasks: TaskItem[],
    onDeleteTask: (id: string) => void;
    onToggleTask: (id: string) => void;
}
export const List = ({ onDeleteTask, onToggleTask, activeTasks, completedTasks }: ListProps) => {

    const [sortConfig, setSortConfig] = useState<{
        field: SortField;
        direction: SortDirection;
    }>({ field: 'priority', direction: 'desc' });

    const [appliedFilters, setAppliedFilters] = useState<FilterState>({
        priority: 'all',
        status: 'all',
        hashtag: '',
        time: 'all',
        showOnlyPriority: false,
    });

    const filteredActiveTasks = useMemo(() => {
        return activeTasks.filter(task => {
            if (appliedFilters.status === 'active' && task.completed) return false;
            if (appliedFilters.status === 'completed' && !task.completed) return false;
            if (appliedFilters.priority !== 'all' && task.important !== appliedFilters.priority) return false;

            if (appliedFilters.time !== 'all') {
                const hour = parseInt(task.time?.split(':')[0] || '0');
                if (appliedFilters.time === 'morning' && (hour < 6 || hour >= 12)) return false;
                if (appliedFilters.time === 'aftermoon' && (hour < 12 || hour >= 18)) return false;
                if (appliedFilters.time === 'evening' && (hour < 18 || hour >= 24)) return false;
            }

            if (appliedFilters.hashtag && !task.hashtag?.toLowerCase().includes(appliedFilters.hashtag.toLowerCase())) return false;
            if (appliedFilters.showOnlyPriority && !task.priority) return false;
            return true;
        });
    }, [activeTasks, appliedFilters]);

    const filteredCompletedTasks = useMemo(() => {
        return completedTasks.filter(task => {
            if (appliedFilters.status === 'active' && task.completed) return false;
            if (appliedFilters.status === 'completed' && !task.completed) return false;
            if (appliedFilters.priority !== 'all' && task.important !== appliedFilters.priority) return false;

            if (appliedFilters.time !== 'all') {
                const hour = parseInt(task.time?.split(':')[0] || '0');
                if (appliedFilters.time === 'morning' && (hour < 6 || hour >= 12)) return false;
                if (appliedFilters.time === 'aftermoon' && (hour < 12 || hour >= 18)) return false;
                if (appliedFilters.time === 'evening' && (hour < 18 || hour >= 24)) return false;
            }

            if (appliedFilters.hashtag && !task.hashtag?.toLowerCase().includes(appliedFilters.hashtag.toLowerCase())) return false;
            if (appliedFilters.showOnlyPriority && !task.priority) return false;
            return true;
        });
    }, [completedTasks, appliedFilters]);

    const sortedActiveTasks = useMemo(() => {
        return [...filteredActiveTasks].sort((a, b) => {
            let aValue: string | number | boolean;
            let bValue: string | number | boolean;

            switch (sortConfig.field) {
                case 'priority':
                    aValue = a.priority ? 1 : 0;
                    bValue = b.priority ? 1 : 0;
                    break;
                case 'important': {
                    const priorityOrder: Record<string, number> = {
                        high: 3,
                        medium: 2,
                        low: 1,
                    }
                    aValue = priorityOrder[a.important];
                    bValue = priorityOrder[b.important];
                    break;
                }
                case 'hashtag':
                    aValue = a.hashtag.toLowerCase();
                    bValue = b.hashtag.toLowerCase();
                    break;
                case 'time':
                    aValue = a.time || '00:00';
                    bValue = b.time || '00:00';
                    break
                default:
                    return 0;
            }
            if (sortConfig.direction === 'asc') {
                return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
            } else {
                return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
            }
        });
    }, [filteredActiveTasks, sortConfig]);

    const handleFilterApply = (newFilters: FilterState) => {
        setAppliedFilters(newFilters);
    }

    const handleSort = (field: SortField, direction: SortDirection) => {
        setSortConfig({ field, direction })
    };

    return (
        <>
            <div className={styles.container}>
                <MyFilterSidebar
                    onFilterChange={handleFilterApply}
                    initialFilters={appliedFilters}
                />
                <div className={styles.active}>
                    <div>
                        <MySortControl
                            className={styles.sortPanel}
                            onSort={handleSort}
                            currentSort={sortConfig} />
                    </div>
                    <h3>Активные задачи:</h3>
                    <ol>
                        {sortedActiveTasks.map((item) => (
                            <li
                                key={item.id}
                                className={styles.taskList}
                            >
                                <input
                                    className={styles.checkbox}
                                    checked={false}
                                    type="checkbox"
                                    onChange={() => onToggleTask(item.id)}
                                />
                                <div>
                                    <div className={styles.listItem}>
                                        <div className={styles.taskText}>
                                            <span className={styles.taskName}>{item.task}{item.priority && <PriorityIcon className={styles.priorityIcon} />}</span>
                                            <span className={styles.taskTime}>{item.time}</span>
                                            <span className={styles.hashtagText}>#{item.hashtag}</span>
                                        </div>
                                    </div>
                                    {item.description && (
                                        <p className={styles.taskDescription}>
                                            {item.description}
                                        </p>
                                    )}
                                </div>
                                <span className={`
                                ${styles.priorityCircle}
                                ${item.important === 'low' ? styles.taskLow : item.important === 'medium' ? styles.taskMedium : styles.taskHigh}
                                `}></span>
                            </li>))}
                    </ol>
                </div>
                <div className={styles.completedTasks}>
                    <h3>Выполеннные задачи:</h3>
                    <ol>
                        {filteredCompletedTasks.map(item => (
                            <li
                                key={item.id}
                                className={styles.completedTasksList}
                            >
                                <input
                                    className={styles.checkbox}
                                    checked={item.completed}
                                    type="checkbox"
                                    onChange={() => onToggleTask(item.id)}
                                />
                                <div>
                                    <div className={styles.completedTaskText}>
                                        <span className={styles.taskName}>{item.task}</span>
                                        <span className={styles.taskTime}>{item.time}</span>
                                    </div>
                                </div>
                                <div className={styles.deleteButton}>
                                    <CheckMark
                                        onClick={() => onDeleteTask(item.id)}
                                    />
                                </div>
                            </li>))}
                    </ol>
                </div>
            </div >
        </>
    )
}