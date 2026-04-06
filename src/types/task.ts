import type { ImportantStatus } from "../types";

export interface Task {
    id: number;
    text: string;
    completed: boolean;
    createdAt?: string;
}

// src/types/task.ts (дополни существующий файл)
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

// Добавь эти типы для работы с API
export interface CreateTaskDto {
    task: string;
    time: string;
    priority: boolean;
    important: ImportantStatus;
    hashtag: string;
    description: string;
}

export interface UpdateTaskDto {
    task?: string;
    time?: string;
    completed?: boolean;
    priority?: boolean;
    important?: ImportantStatus;
    hashtag?: string;
    description?: string;
}