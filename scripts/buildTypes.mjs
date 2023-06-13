import { basename, join, parse } from 'node:path';
import { readFileSync, mkdirSync, writeFileSync, copyFileSync, existsSync, readdirSync } from 'node:fs';

import { parseComments } from 'dox';

const TYPES_DIR = './types';
const UTIL_DIR = './types/util';
const SOURCE_DIR = './node_modules/ramda/es';
const OUTPUT_DIR = './es';

const mkTypeFile = (path) => {
  return {
    path,
    exports: null,
    docs: null
  };
};

const getTagVal = (tags, key) => {
  const maybe_tag = tags.find(x => x.type == key);
  return ((maybe_tag && maybe_tag.string) || '').trim();
};

const mkDocs = (src) => {
  const dox = parseComments(src, { raw: true })[0];
  const desc = (dox.description && dox.description.full) || '';
  const tags = dox.tags || [];
  const see = getTagVal(tags, 'see');
  const example = getTagVal(tags, 'example');
  return { desc, see, example };
};

const readTypeFile = (x) => {
  const lines = readFileSync(x.path).toString().split('\n');

  let i;
  for (i = 0; !/^export /.test(lines[i]); i += 1) {
  }
  const exports = lines.slice(i).join('\n');

  return {
    path: x.path,
    exports
  };
};

const attachDocsFromJsFile = (x) => {
  const path = parse(x.path);
  const jsFile = path.base.replace(/\.d\.ts$/, '.js');
  const jsPath = `${SOURCE_DIR}/${jsFile}`;
  if (!existsSync(jsPath)) {
    return null;
  }
  const docs = mkDocs(readFileSync(jsPath).toString());
  return Object.assign({}, x, { docs });
};

const read = () => {
  return (
    readdirSync(TYPES_DIR)
      .filter(x => /\.d\.ts$/.test(x))
      .map(filename => mkTypeFile(`${TYPES_DIR}/${filename}`))
      .map(readTypeFile)
      .map(attachDocsFromJsFile)
      .filter(x => x != null)
      .sort((a, b) => a.path.localeCompare(b.path))
  );
};

const genImports = (utilPath) => {
  const utilExportsAsImports = (
    readFileSync(utilPath, 'utf8')
      .split('\n')
      .map(x => /^export \w+ (\w+)/.exec(x))
      .filter(x => x != null)
      .map(x => `    ${x[1]},`)
      .join('\n')
  );
  return [
    'import {',
    utilExportsAsImports,
    `} from './${basename(utilPath, '.d.ts')}';`
  ].join('\n');
};

const genDesc = (desc) => {
  return desc.split('\n');
};

const genSee = (see) => {
  if (see == '') {
    return [];
  } else {
    const tsSee = (
      see
        .split(',')
        .map(x => x.trim())
        .map(x => x.replace(/^R\./, ''))
        .map(x => `{@link ${x}}`)
        .join(', ')
    );
    return [`See also ${tsSee}`];
  }
};

const genExample = (example) => {
  if (example == '') {
    return [];
  } else {
    return [
      '@example',
      '```typescript',
      ...(
        example
          .split('\n')
          .map(x => x.replace(/^     /, ''))
          .map(x => x.replace(/\s+$/, ''))
      ),
      '```'
    ];
  }
};

const asComment = (lines, opts = { firstComment: false }) => {
  let comments = lines.map(x => ` * ${x}`);
  if (!opts.firstComment && lines.length > 0) {
    comments = [' *', ... comments];
  }
  return comments;
};

const genExport = (x) => {
  const desc = genDesc(x.docs.desc);
  const see = genSee(x.docs.see);
  const example = genExample(x.docs.example);
  const docs = [
    '/**',
    ...asComment(desc, { firstComment: true }),
    ...asComment(see),
    ...asComment(example),
    ' */'
  ].join('\n');
  return `${docs}\n${x.exports}`;
};

const genExports = (exports) => {
  return exports.map(genExport).join('\n\n');
};

const write = (exports) => {
  const utilPaths = readdirSync(UTIL_DIR).map(p => join(UTIL_DIR, p));

  const importsCode = utilPaths.map(genImports);

  const exportsCode = genExports(exports);

  const otherExports = [
    ...utilPaths.map(p => `export * from './${basename(p, '.d.ts')}';`),
    'export as namespace R;'
  ].join('\n');

  const code = [
    'import * as _ from \'ts-toolbelt\';',
    ...importsCode,
    '',
    exportsCode,
    '',
    otherExports
  ].join('\n');

  mkdirSync(OUTPUT_DIR, { recursive: true});
  writeFileSync(`${OUTPUT_DIR}/index.d.ts`, code);
  utilPaths.forEach(p => copyFileSync(p, `${OUTPUT_DIR}/${basename(p)}`));
};

write(read());
