export function toPairs<O extends object, K extends Extract<keyof O, string | number>>(
  obj: O,
): Array<{ [key in K]: [`${key}`, O[key]] }[K]>;
