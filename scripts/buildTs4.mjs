

import { read, write } from './buildScripts.mjs';

const TYPES_DIR = './types';
const UTIL_DIR = './types/util';
const TYPES_TS4_DIR = './types-ts4';
const OUTPUT_DIR = './ts4/es';

write(UTIL_DIR, OUTPUT_DIR, read(TYPES_DIR, TYPES_TS4_DIR));
