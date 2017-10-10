import {task, watch, src, dest} from 'gulp';
import * as path from 'path';

import {
  DIST_COMPONENTS_ROOT_BLOCK, PROJECT_ROOT, COMPONENTS_DIR_BLOCKS, HTML_MINIFIER_OPTIONS, LICENSE_BANNER, SOURCE_ROOT
} from '../constants';
import {
  sassBuildTask, tsBuildTask, execNodeTask, copyTask, sequenceTask,
  triggerLivereload
} from '../task_helpers';

// No typings for these.
const inlineResources = require('../inline-resources');
const gulpRollup = require('gulp-better-rollup');
const gulpMinifyCss = require('gulp-clean-css');
const gulpMinifyHtml = require('gulp-htmlmin');
const gulpIf = require('gulp-if');
const del = require('del');


// NOTE: there are two build "modes" in this file, based on which tsconfig is used.
// When `tsconfig.json` is used, we are outputting ES6 modules and a UMD bundle. This is used
// for serving and for release.
//
// When `tsconfig-spec.json` is used, we are outputting CommonJS modules. This is used
// for unit tests (karma).

/** Path to the tsconfig used for ESM output. */
const tsconfigPath = path.relative(PROJECT_ROOT, path.join(COMPONENTS_DIR_BLOCKS, 'tsconfig.json'));

console.log('Using this config file: ' + tsconfigPath);

/** [Watch task] Rebuilds (ESM output) whenever ts, scss, or html sources change. */
task(':watch:blocks:components', () => {
  watch(path.join(COMPONENTS_DIR_BLOCKS, '**/*.ts'), ['build:blocks:components', triggerLivereload]);
  watch(path.join(COMPONENTS_DIR_BLOCKS, '**/*.scss'), ['build:blocks:components', triggerLivereload]);
  watch(path.join(COMPONENTS_DIR_BLOCKS, '**/*.html'), ['build:blocks:components', triggerLivereload]);
});


/** Builds component typescript only (ESM output). */
task(':build:blocks:components:ts', tsBuildTask(path.join(COMPONENTS_DIR_BLOCKS, 'tsconfig-srcs.json')));

/** Builds components typescript for tests (CJS output). */
task(':build:blocks:components:spec', tsBuildTask(COMPONENTS_DIR_BLOCKS));

/** Copies assets (html, markdown) to build output. */
task(':build:blocks:components:assets', copyTask([
  path.join(COMPONENTS_DIR_BLOCKS, '**/*.!(ts|spec.ts)'),
  path.join(PROJECT_ROOT, 'README.md'),
  path.join(PROJECT_ROOT, 'LICENSE'),
], DIST_COMPONENTS_ROOT_BLOCK));

/** Minifies the HTML and CSS assets in the distribution folder. */
task(':build:blocks:components:assets:minify', () => {
  return src('**/*.+(html|css)', { cwd: DIST_COMPONENTS_ROOT_BLOCK})
    .pipe(gulpIf(/.css$/, gulpMinifyCss(), gulpMinifyHtml(HTML_MINIFIER_OPTIONS)))
    .pipe(dest(DIST_COMPONENTS_ROOT_BLOCK));
});

/** Builds scss into css. */
task(':build:blocks:components:scss', sassBuildTask(DIST_COMPONENTS_ROOT_BLOCK, COMPONENTS_DIR_BLOCKS));

/** Builds the UMD bundle for all of SvOgV. */
task(':build:blocks:components:rollup', () => {
  const globals: {[name: string]: string} = {
    // Angular dependencies
    '@angular/core': 'ng.core',
    '@angular/common': 'ng.common',
    '@angular/forms': 'ng.forms',
    '@angular/http': 'ng.http',
    '@angular/router': 'ng.router',
    '@angular/platform-browser': 'ng.platformBrowser',
    '@angular/platform-browser-dynamic': 'ng.platformBrowserDynamic',

    // Rxjs dependencies
    'rxjs/Subject': 'Rx',
    'rxjs/add/observable/fromEvent': 'Rx.Observable',
    'rxjs/add/observable/forkJoin': 'Rx.Observable',
    'rxjs/add/observable/of': 'Rx.Observable',
    'rxjs/add/observable/throw': 'Rx.Observable',
    'rxjs/add/operator/toPromise': 'Rx.Observable.prototype',
    'rxjs/add/operator/map': 'Rx.Observable.prototype',
    'rxjs/add/operator/filter': 'Rx.Observable.prototype',
    'rxjs/add/operator/do': 'Rx.Observable.prototype',
    'rxjs/add/operator/share': 'Rx.Observable.prototype',
    'rxjs/add/operator/finally': 'Rx.Observable.prototype',
    'rxjs/add/operator/catch': 'Rx.Observable.prototype',
    'rxjs/add/operator/first': 'Rx.Observable.prototype',
    'rxjs/Observable': 'Rx'
  };

  const rollupOptions = {
    context: 'this',
    external: Object.keys(globals)
  };

  const rollupGenerateOptions = {
    // Keep the moduleId empty because we don't want to force developers to a specific moduleId.
    moduleId: '',
    moduleName: 'ac.svogv.blocks',
    format: 'umd',
    globals,
    banner: LICENSE_BANNER,
    dest: 'svogv-blocks.umd.js'
  };

  return src(path.join(DIST_COMPONENTS_ROOT_BLOCK, 'index.js'))
    .pipe(gulpRollup(rollupOptions, rollupGenerateOptions))
    .pipe(dest(path.join(DIST_COMPONENTS_ROOT_BLOCK, 'bundles')))         // copy to dist for reference
    .pipe(dest(path.join(SOURCE_ROOT, 'demo/dist/bundles')));       // copy to demo for immediate usage
});

// refresh the package immediately to simplify local testing with current version
task(':build:blocks:components:copy-for-demo', () => {
  let target = SOURCE_ROOT + 'demo/node_modules/@svogv/blocks';
  console.log(`** immediate copy from ${DIST_COMPONENTS_ROOT_BLOCK}  to ${target}`);
  return src(DIST_COMPONENTS_ROOT_BLOCK + '**/*.*').pipe(dest(target));
});

// and after this we cleanup the target folder
task(':build:blocks:cleanup', () => {
  return del(DIST_COMPONENTS_ROOT_BLOCK);
});

/** Builds components with resources (html, css) inlined into the built JS (ESM output). */
task(':build:blocks:components:inline', sequenceTask(
  ':build:blocks:cleanup',
  ':build:blocks:components:ts',
  ':build:blocks:components:scss',
  ':build:blocks:components:assets',
  ':build:blocks:components:copy-for-demo',
  ':blocks:inline-resources'
));

/** Builds components with minified HTML and CSS inlined into the built JS. */
task(':build:blocks:components:inline:release', sequenceTask(
  ':build:blocks:cleanup',
  ':build:blocks:components:ts',
  ':build:blocks:components:scss',
  ':build:blocks:components:assets',
  ':build:blocks:components:assets:minify',
  ':blocks:inline-resources'
));

/** Inlines resources (html, css) into the JS output (for either ESM or CJS output). */
task(':blocks:inline-resources', () => inlineResources(DIST_COMPONENTS_ROOT_BLOCK));

/** Builds components to ESM output and UMD bundle. */
task('build:blocks', sequenceTask(
  ':build:blocks:components:inline',
  ':build:blocks:components:rollup'));

task('build:blocks:components:release', sequenceTask(
  ':build:blocks:components:inline:release',
  ':build:blocks:components:rollup'
));

/** Generates metadata.json files for all of the components. */
task(':build:blocks:components:ngc', ['build:blocks:components:release'], execNodeTask(
  '@angular/compiler-cli', 'ngc', ['-p', tsconfigPath]
));
