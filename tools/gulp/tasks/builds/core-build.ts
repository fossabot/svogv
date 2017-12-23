import { task, watch, src, dest } from 'gulp';
import { join, relative } from 'path';

import {
  DIST_CORE_COMPONENTS_ROOT, PROJECT_ROOT, CORE_COMPONENTS_DIR, LICENSE_BANNER
} from '../../constants';
import {
  sassBuildTask, tsBuildTask, copyTask, sequenceTask,
  triggerLivereload
} from '../../task_helpers';

// No typings for these.
const inlineResources = require('../../../../scripts/release/inline-resources');
const gulpRollup = require('gulp-better-rollup');
const gulpMinifyJs = require('gulp-uglify');
const gulpRename = require('gulp-rename');
const del = require('del');

task(':core-build:cleanup', () => {
  del(DIST_CORE_COMPONENTS_ROOT);
  del('./node_modules/@svogv/core');
});

/** Builds component typescript only (ESM output). */
task(':core-build:components:ts', tsBuildTask(CORE_COMPONENTS_DIR,
                                join(CORE_COMPONENTS_DIR, 'tsconfig-srcs.json')));

/** Path to the tsconfig used for ESM output. */
const tsconfigPath = relative(PROJECT_ROOT, join(CORE_COMPONENTS_DIR, 'tsconfig.json'));
/** Builds components typescript for tests (CJS output). */
task(':core-build:components:spec', tsBuildTask(CORE_COMPONENTS_DIR, tsconfigPath));

/** Copies assets (html, markdown) to build output. */
task(':core-build:components:assets', copyTask([
  join(CORE_COMPONENTS_DIR, '**/*.!(ts|spec.ts)'),
  join(PROJECT_ROOT, 'README.md'),
  join(PROJECT_ROOT, 'LICENSE'),
], DIST_CORE_COMPONENTS_ROOT));

/** Builds the UMD bundle for all of SvOgV. */
task(':core-build:components:rollup', () => {
  const globals: { [name: string]: string } = {
    // Angular dependencies
    '@angular/core': 'ng.core',
    '@angular/common': 'ng.common',
    '@angular/forms': 'ng.forms',
    '@angular/router': 'ng.router',
    '@angular/platform-browser': 'ng.platformBrowser',
    '@angular/platform-browser-dynamic': 'ng.platformBrowserDynamic'
  };

  const rollupOptions = {
    context: 'this',
    external: Object.keys(globals)
  };

  const rollupGenerateOptions = {
    // Keep the moduleId empty because we don't want to force developers to a specific moduleId.
    moduleId: '',
    moduleName: 'ac.svogv.core',
    format: 'umd',
    globals,
    banner: LICENSE_BANNER,
    dest: 'svogv-core.umd.js'
  };

  return src(join(DIST_CORE_COMPONENTS_ROOT, 'index.js'))
    .pipe(gulpRollup(rollupOptions, rollupGenerateOptions))
    .pipe(dest(join(DIST_CORE_COMPONENTS_ROOT, 'bundles')));      // copy to dist for reference
});

task(':core-build:components:rollup-minify', () => {
  return src(
    join(DIST_CORE_COMPONENTS_ROOT, 'bundles/svogv-core.umd.min.js'))
    .pipe(gulpRename('svogv-core.umd.min.js'))
    .pipe(gulpMinifyJs())
    .pipe(dest(join(DIST_CORE_COMPONENTS_ROOT, 'bundles')));
});

// refresh the package immediately to simplify local testing with current version
task(':core-build:components:copy-for-demo', () => {
  let target = './node_modules/@svogv/core';
  console.log(`** immediate copy from ${DIST_CORE_COMPONENTS_ROOT}  to ${target}`);
  return src(join(DIST_CORE_COMPONENTS_ROOT, '**/*.*')).pipe(dest(target));
});

/** Builds components with resources (html, css) inlined into the built JS (ESM output). */
task(':core-build:components:inline', sequenceTask(
  ':core-build:cleanup',
  ':core-build:components:ts'
));

/** Builds components with minified HTML and CSS inlined into the built JS. */
task(':core-build:components:inline:release', sequenceTask(
  ':core-build:cleanup',
  ':core-build:components:ts'
));

/** Builds components to ESM output and UMD bundle. */
task('core-build', sequenceTask(
  ':core-build:components:inline',
  ':core-build:components:rollup',
  ':core-build:components:rollup-minify',
  ':core-build:components:copy-for-demo'));

task('core-build:components:release', sequenceTask(
  ':core-build:components:inline:release',
  ':core-build:components:rollup',
  ':core-build:components:rollup-minify'
));

