// import { readFileSync, mkdirSync, writeFileSync, copyFileSync, existsSync, readdirSync } from 'node:fs';

import { read, write } from './buildScripts.mjs';

const TYPES_DIR = './types';
const UTIL_DIR = './types/util';
const OUTPUT_DIR = './es';

// const filenames = readdirSync(TYPES_DIR);
// console.log(filenames);

write(UTIL_DIR, OUTPUT_DIR, read(TYPES_DIR));
