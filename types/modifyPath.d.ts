// import { Path } from './util/tools';

export function modifyPath<U, K0 extends keyof U, T>(path: [K0], fn: (value: U[K0]) => T, obj: U): Omit<U, K0> & Record<K0, T>;

// export function modifyPath<S, K0 extends keyof S = keyof S, K1 extends keyof S[K0] = keyof S[K0]>(path: [K0, K1], obj: S): S[K0][K1];
// export function modifyPath<
//   S,
//   K0 extends keyof S = keyof S,
//   K1 extends keyof S[K0] = keyof S[K0],
//   K2 extends keyof S[K0][K1] = keyof S[K0][K1]
// >(path: [K0, K1, K2], obj: S): S[K0][K1][K2];
// export function modifyPath<
//   S,
//   K0 extends keyof S = keyof S,
//   K1 extends keyof S[K0] = keyof S[K0],
//   K2 extends keyof S[K0][K1] = keyof S[K0][K1],
//   K3 extends keyof S[K0][K1][K2] = keyof S[K0][K1][K2]
// >(path: [K0, K1, K2, K3], obj: S): S[K0][K1][K2][K3];
// export function modifyPath<
//   S,
//   K0 extends keyof S = keyof S,
//   K1 extends keyof S[K0] = keyof S[K0],
//   K2 extends keyof S[K0][K1] = keyof S[K0][K1],
//   K3 extends keyof S[K0][K1][K2] = keyof S[K0][K1][K2],
//   K4 extends keyof S[K0][K1][K2][K3] = keyof S[K0][K1][K2][K3]
// >(path: [K0, K1, K2, K3, K4], obj: S): S[K0][K1][K2][K3][K4];
// export function modifyPath<
//   S,
//   K0 extends keyof S = keyof S,
//   K1 extends keyof S[K0] = keyof S[K0],
//   K2 extends keyof S[K0][K1] = keyof S[K0][K1],
//   K3 extends keyof S[K0][K1][K2] = keyof S[K0][K1][K2],
//   K4 extends keyof S[K0][K1][K2][K3] = keyof S[K0][K1][K2][K3],
//   K5 extends keyof S[K0][K1][K2][K3][K4] = keyof S[K0][K1][K2][K3][K4]
// >(path: [K0, K1, K2, K3, K4, K5], obj: S): S[K0][K1][K2][K3][K4][K5];
// export function modifyPath<T>(path: Path, obj: any): T | undefined;
// export function modifyPath<T>(path: Path): (obj: any) => T | undefined;
