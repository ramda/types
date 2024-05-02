export function flow<S, R1>(seed: S, pipeline: [(a: S) => R1]): R1;
export function flow<S, R1, R2>(seed: S, pipeline: [(a: S) => R1, (a: R1) => R2]): R2;
export function flow<S, R1, R2, R3>(seed: S, pipeline: [(a: S) => R1, (a: R1) => R2, (a: R2) => R3]): R3;
export function flow<S, R1, R2, R3, R4>(seed: S, pipeline: [(a: S) => R1, (a: R1) => R2, (a: R2) => R3, (a: R3) => R4]): R4;
export function flow<S, R1, R2, R3, R4, R5>(seed: S, pipeline: [(a: S) => R1, (a: R1) => R2, (a: R2) => R3, (a: R3) => R4, (a: R4) => R5]): R5;
export function flow<S, R1, R2, R3, R4, R5, R6>(seed: S, pipeline: [(a: S) => R1, (a: R1) => R2, (a: R2) => R3, (a: R3) => R4, (a: R4) => R5, (a: R5) => R6]): R6;
export function flow<S, R1, R2, R3, R4, R5, R6, R7>(seed: S, pipeline: [(a: S) => R1, (a: R1) => R2, (a: R2) => R3, (a: R3) => R4, (a: R4) => R5, (a: R5) => R6, (a: R6) => R7]): R7;
export function flow<S, R1, R2, R3, R4, R5, R6, R7, R8>(seed: S, pipeline: [(a: S) => R1, (a: R1) => R2, (a: R2) => R3, (a: R3) => R4, (a: R4) => R5, (a: R5) => R6, (a: R6) => R7, (a: R7) => R8]): R8;
export function flow<S, R1, R2, R3, R4, R5, R6, R7, R8, R9>(seed: S, pipeline: [(a: S) => R1, (a: R1) => R2, (a: R2) => R3, (a: R3) => R4, (a: R4) => R5, (a: R5) => R6, (a: R6) => R7, (a: R7) => R8, (a: R8) => R9]): R9;
// catch-all to larger than 9, or if you need to manually set seed type `S` and final return type `R`
export function flow<S, R>(seed: S, pipeline: ReadonlyArray<(a: S) => any>): R;
