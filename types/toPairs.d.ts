export function toPairs<O extends object>(obj: O): Array<{ [key in keyof O]: [key, O[key]] }[keyof O]>;
