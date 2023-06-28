export function keys<T>(x: T): string[];
export function keys<T extends object>(x: T): Array<keyof T>;
