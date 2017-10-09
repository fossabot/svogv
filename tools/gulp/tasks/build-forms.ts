import {task, watch, src, dest} from 'gulp';
import * as path from 'path';

import {
  DIST_COMPONENTS_ROOT_FORMS, PROJECT_ROOT, COMPONENTS_DIR_FORMS, HTML_MINIFIER_OPTIONS, LICENSE_BANNER, SOURCE_ROOT
} from '../constants';
import {
  sassBuildTask, tsBuildTask, execNodeTask, copyTask, sequenceTask,
  triggerLivereload
} from '../task_helpers';

// No typings for these.
const inlineResources = require('../../../scripts/release/inline-resources');
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
const tsconfigPath = path.relative(PROJECT_ROOT, path.join(COMPONENTS_DIR_FORMS, 'tsconfig.json'));

console.log('Using this config file: ' + tsconfigPath);

/** [Watch task] Rebuilds (ESM output) whenever ts, scss, or html sources change. */
task(':watch:forms:components', () => {
  watch(path.join(COMPONENTS_DIR_FORMS, '**/*.ts'), ['build:forms:components', triggerLivereload]);
  watch(path.join(COMPONENTS_DIR_FORMS, '**/*.scss'), ['build:forms:components', triggerLivereload]);
  watch(path.join(COMPONENTS_DIR_FORMS, '**/*.html'), ['build:forms:components', triggerLivereload]);
});


/** Builds component typescript only (ESM output). */
task(':build:forms:components:ts', tsBuildTask(path.join(COMPONENTS_DIR_FORMS, 'tsconfig-srcs.json')));

/** Builds components typescript for tests (CJS output). */
task(':build:forms:components:spec', tsBuildTask(COMPONENTS_DIR_FORMS));

/** Copies assets (html, markdown) to build output. */
task(':build:forms:components:assets', copyTask([
  path.join(COMPONENTS_DIR_FORMS, '**/*.!(ts|spec.ts)'),
  path.join(PROJECT_ROOT, 'README.md'),
  path.join(PROJECT_ROOT, 'LICENSE'),
], DIST_COMPONENTS_ROOT_FORMS));

/** Minifies the HTML and CSS assets in the distribution folder. */
task(':build:forms:components:assets:minify', () => {
  return src('**/*.+(html|css)', { cwd: DIST_COMPONENTS_ROOT_FORMS})
    .pipe(gulpIf(/.css$/, gulpMinifyCss(), gulpMinifyHtml(HTML_MINIFIER_OPTIONS)))
    .pipe(dest(DIST_COMPONENTS_ROOT_FORMS));
});

/** Builds scss into css. */
task(':build:forms:components:scss', sassBuildTask(DIST_COMPONENTS_ROOT_FORMS +  'bundles', COMPONENTS_DIR_FORMS));

/** Builds the UMD bundle for all of SvOgV. */
task(':build:forms:components:rollup', () => {
  const globals: {[name: string]: string} = {
    // Angular dependencies
    '@angular/core': 'ng.core',
    '@angular/common': 'ng.common',
    '@angular/forms': 'ng.forms',
    '@angular/http': 'ng.http',
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
    moduleName: 'ac.svogv.lib',
    format: 'umd',
    globals,
    banner: LICENSE_BANNER,
    dest: 'svogv-lib.umd.js'
  };

  return src(path.join(DIST_COMPONENTS_ROOT_FORMS, 'index.js'))
    .pipe(gulpRollup(rollupOptions, rollupGenerateOptions))
    .pipe(dest(path.join(DIST_COMPONENTS_ROOT_FORMS, 'bundles')))         // copy to dist for reference
    .pipe(dest(path.join(SOURCE_ROOT, 'demo/dist/bundles')));       // copy to demo for immediate usage
});

// refresh the package immediately to simplify local testing with current version
task(':build:forms:components:copy-for-demo', () => {
  let target = SOURCE_ROOT + 'demo/node_modules/svogv';
  console.log(`** immediate copy from ${DIST_COMPONENTS_ROOT_FORMS}  to ${target}`);
  return src(DIST_COMPONENTS_ROOT_FORMS + '**/*.*').pipe(dest(target));
});

// prepare external templates for bundling directly
task(':build:forms:components:copy-inline', () => {
  let source = [SOURCE_ROOT + 'lib/**/*.html', '!(node_modules)'];
  let target = DIST_COMPONENTS_ROOT_FORMS + 'bundles/';
  console.log(`** immediate copy from ${source} to ${target}`);
  return src(source).pipe(dest(target));
});
// and after this we cleanup the target folder
task(':build:forms:components:copy-inline:cleanup', () => {
  let target = DIST_COMPONENTS_ROOT_FORMS + 'bundles/';
  del(`${target}widgets/**`);
});

/** Builds components with resources (html, css) inlined into the built JS (ESM output). */
task(':build:forms:components:inline', sequenceTask(
  ':build:forms:components:ts',
  ':build:forms:components:scss',
  ':build:forms:components:copy-inline',
  ':build:forms:components:assets',
  ':build:forms:components:copy-for-demo',
  ':forms:inline-resources',
  ':build:forms:components:copy-inline:cleanup',
));

/** Builds components with minified HTML and CSS inlined into the built JS. */
task(':build:forms:components:inline:release', sequenceTask(
  ':build:forms:components:ts',
  ':build:forms:components:scss',
  ':build:forms:components:copy-inline',
  ':build:forms:components:assets',
  ':build:forms:components:assets:minify',
  ':forms:inline-resources',
  ':build:forms:components:copy-inline:cleanup',
));

/** Inlines resources (html, css) into the JS output (for either ESM or CJS output). */
task(':forms:inline-resources', () => inlineResources(DIST_COMPONENTS_ROOT_FORMS));

/** Builds components to ESM output and UMD bundle. */
task('build:forms', sequenceTask(
  ':build:forms:components:inline',
  ':build:forms:components:rollup'));

task('build:forms:components:release', sequenceTask(
  ':build:forms:components:inline:release',
  ':build:forms:components:rollup'
));

/** Generates metadata.json files for all of the components. */
task(':build:forms:components:ngc', ['build:forms:components:release'], execNodeTask(
  '@angular/compiler-cli', 'ngc', ['-p', tsconfigPath]
));
