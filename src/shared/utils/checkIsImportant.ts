import type { ImportantStatus } from "../../types";

export function isImportantStatus(value: string): value is ImportantStatus {
    return value === 'low' || value === 'medium' || value === 'high';
}