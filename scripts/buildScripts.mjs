import { basename, join, parse } from 'node:path';
import { readFileSync, mkdirSync, writeFileSync, copyFileSync, existsSync, readdirSync } from 'node:fs';

import { parseComments } from 'dox';

const SOURCE_DIR = './node_modules/ramda/es';

const mkTypeFile = (path) => ({
  path,
  exports: null,
  docs: null
});

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

export const read = (typesDir, supplementDir = undefined) => {
  const filenames = readdirSync(typesDir);
  const supplementFilenames = supplementDir ? readdirSync(supplementDir) : [];

  return filenames.filter(x => /\.d\.ts$/.test(x))
    .map(filename => {
      const dir = supplementFilenames.includes(filename) ? supplementDir : typesDir;
      return mkTypeFile(`${dir}/${filename}`);
    })
    .map(readTypeFile)
    .map(attachDocsFromJsFile)
    .filter(x => x != null)
    .sort((a, b) => a.path.localeCompare(b.path));
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

const genExports = (types) => types.map(genExport).join('\n\n');

export const write = (utilDir, outDir, types) => {
  const utilPaths = readdirSync(utilDir).map(p => join(utilDir, p));

  const importsCode = utilPaths.map(genImports);

  const exportsCode = genExports(types);

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

  mkdirSync(outDir, { recursive: true });
  writeFileSync(`${outDir}/index.d.ts`, code);
  utilPaths.forEach(p => copyFileSync(p, `${outDir}/${basename(p)}`));
};
