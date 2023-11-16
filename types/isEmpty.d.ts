export function isEmpty<T>(value: T[]): value is [];
export function isEmpty<T extends string>(value: T): value is '';
export function isEmpty<T extends object>(value: T): value is {};
export function isEmpty(value: any): boolean;
