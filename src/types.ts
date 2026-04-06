export interface TaskItem {
    id: string,
    task: string,
    time: string,
    completed: boolean,
    priority: boolean,
    important: ImportantStatus,
    hashtag: string,
    description: string;
}
export interface SelectOption {
    value: string
    label: string
}

export interface FilterState {
    priority: FilterPriority;
    status: FilterStatus;
    hashtag: string;
    time: FilterTime;
    showOnlyPriority: boolean;
}

export const initialFilterState: FilterState = {
    priority: 'all',
    status: 'all',
    hashtag: '',
    time: 'all',
    showOnlyPriority: false,
}

export type ImportantStatus = 'low' | 'medium' | 'high'
export type SortField = 'priority' | 'important' | 'hashtag' | 'time'
export type SortDirection = 'asc' | 'desc'
export type FilterPriority = 'all' | 'low' | 'medium' | 'high'
export type FilterStatus = 'all' | 'active' | 'completed'
export type FilterTime = 'all' | 'morning' | 'aftermoon' | 'evening'
