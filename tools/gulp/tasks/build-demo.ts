import { task, watch, src, dest } from 'gulp';
import * as path from 'path';

import {
  DIST_COMPONENTS_ROOT_DEMO, PROJECT_ROOT, COMPONENTS_DIR_DEMO, HTML_MINIFIER_OPTIONS, LICENSE_BANNER, SOURCE_ROOT
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
var systemBuilder = require('systemjs-builder');            // create a rx bundle because the provided did not work

// NOTE: there are two build "modes" in this file, based on which tsconfig is used.
// When `tsconfig.json` is used, we are outputting ES6 modules and a UMD bundle. This is used
// for serving and for release.
//
// When `tsconfig-spec.json` is used, we are outputting CommonJS modules. This is used
// for unit tests (karma).

/** Path to the tsconfig used for ESM output. */
const tsconfigPath = path.relative(PROJECT_ROOT, path.join(COMPONENTS_DIR_DEMO, 'tsconfig.json'));

console.log('Using this config file: ' + tsconfigPath);

/** [Watch task] Rebuilds (ESM output) whenever ts, scss, or html sources change. */
task(':watch:demo:components', () => {
  watch(path.join(COMPONENTS_DIR_DEMO, '**/*.ts'), ['build:demo:components', triggerLivereload]);
  watch(path.join(COMPONENTS_DIR_DEMO, '**/*.scss'), ['build:demo:components', triggerLivereload]);
  watch(path.join(COMPONENTS_DIR_DEMO, '**/*.html'), ['build:demo:components', triggerLivereload]);
});


/** Builds component typescript only (ESM output). */
task(':build:demo:components:ts', tsBuildTask(COMPONENTS_DIR_DEMO, 'tsconfig-prod.json'));

/** Builds components typescript for tests (CJS output). */
task(':build:demo:components:spec', tsBuildTask(COMPONENTS_DIR_DEMO));

/** Copies assets (html, markdown) to build output. */
task(':build:demo:components:assets', copyTask([
  path.join(COMPONENTS_DIR_DEMO, 'app/**/*.html'),
  path.join(COMPONENTS_DIR_DEMO, '**/*.!(ts|spec.ts)'),
  path.join(PROJECT_ROOT, 'README.md'),
  path.join(PROJECT_ROOT, 'LICENSE'),
], DIST_COMPONENTS_ROOT_DEMO));


/** Minifies the HTML and CSS assets in the distribution folder. */
task(':build:demo:components:assets:minify', () => {
  return src('**/*.+(html|css)', { cwd: DIST_COMPONENTS_ROOT_DEMO })
    .pipe(gulpIf(/.css$/, gulpMinifyCss(), gulpMinifyHtml(HTML_MINIFIER_OPTIONS)))
    .pipe(dest(DIST_COMPONENTS_ROOT_DEMO));
});

/** Builds scss into css. */
task(':build:demo:components:scss', sassBuildTask(DIST_COMPONENTS_ROOT_DEMO, COMPONENTS_DIR_DEMO));

/** Builds the UMD bundle for all of SvOgV. */
task(':build:demo:components:rollup', () => {
  const globals: { [name: string]: string } = {
    // Angular dependencies
    '@angular/core': 'ng.core',
    '@angular/common': 'ng.common',
    '@angular/forms': 'ng.forms',
    '@angular/http': 'ng.http',
    '@angular/router': 'ng.router',
    '@angular/platform-browser': 'ng.platformBrowser',
    '@angular/platform-browser-dynamic': 'ng.platformBrowserDynamic',
    // Third party
    'moment': 'moment.lib',
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
    moduleName: 'ac.svogv.demo',
    format: 'cjs', // in the demo it's not a module but rather something we load using SystemJS
    globals,
    banner: LICENSE_BANNER,
    dest: 'app.js'
  };

  return src(path.join(DIST_COMPONENTS_ROOT_DEMO, 'app.js'))
    .pipe(gulpRollup(rollupOptions, rollupGenerateOptions))
    .pipe(dest(path.join(DIST_COMPONENTS_ROOT_DEMO, 'prod')));
});

task(':build:demo:cleanup', () => {
  return del(DIST_COMPONENTS_ROOT_DEMO);
});


task('copy:js', function () {
  return src([
    './node_modules/jquery/dist/jquery.js',
    './node_modules/bootstrap/dist/js/bootstrap.js',
    './node_modules/tether/dist/js/tether.js',
    './node_modules/core-js/client/core.js',
    './node_modules/zone.js/dist/zone.js',
    './node_modules/reflect-metadata/Reflect.js',
    './node_modules/systemjs/dist/system.js'
  ])
    .pipe(dest(path.join(DIST_COMPONENTS_ROOT_DEMO, 'js/lib')));
});

// This is a simple loader while debugging without going through the WebPack hassle
task('copy:systemjs', function () {
  return src(path.join(COMPONENTS_DIR_DEMO, 'systemjs.config.js'))
  .pipe(dest(path.join(DIST_COMPONENTS_ROOT_DEMO, 'js')));
});

task('copy:angular', function () {
  return src([
    './node_modules/@angular/**/bundles/*.umd.js',
    '!' + './node_modules/@angular/**/bundles/*-testing.umd.js'
  ]).pipe(dest(path.join(DIST_COMPONENTS_ROOT_DEMO, 'js/lib/@angular')));
});

task('copy:svogv', function () {
  return src(['./dist/@svogv/**/svogv-*.umd.js'])
    .pipe(dest(path.join(DIST_COMPONENTS_ROOT_DEMO, 'js/lib/@svogv/')));
});

// Create RxJs bundle
task('copy:rxjs', function () {
  var builder = new systemBuilder('./', {
    paths: { 'rxjs/*': 'node_modules/rxjs/*.js' },
    map: { 'rxjs': 'node_modules/rxjs' },
    packages: { 'rxjs': { main: 'Rx.js', defaultExtension: 'js' } }
  });
  // create the bundle we use from systemjs.config.js
  builder.bundle('rxjs', path.join(DIST_COMPONENTS_ROOT_DEMO, 'js/lib/rxjs/bundles/Rx.min.js'), {
    sourceMaps: true,
    minify: true,
    mangle: true
  });
});

// except those css that's delivered "as is"
task('copy:css', function () {
  return src([
    './node_modules/font-awesome/css/font-awesome.css'
  ])
    .pipe(dest(path.join(DIST_COMPONENTS_ROOT_DEMO, 'styles')));
});
// icons and symbols shall be fonts, never want to see a single GIF here
task('copy:fonts', function () {
  return src([
    './node_modules/font-awesome/fonts/*.*'
  ])
    .pipe(dest(path.join(DIST_COMPONENTS_ROOT_DEMO, 'fonts')));
});
// View HTML (component templates)

task('copy:views:index', function () {
  return src([path.join(COMPONENTS_DIR_DEMO, 'index.html')])
    .pipe(dest(DIST_COMPONENTS_ROOT_DEMO));
});
task('copy:views', ['copy:views:index']);

task('copy:images', function () {
  return src([path.join(COMPONENTS_DIR_DEMO, 'assets/images/**/*.*')])
    .pipe(dest(path.join(DIST_COMPONENTS_ROOT_DEMO, 'images')));
});

task(':build:demo:components:files', [
  'copy:svogv',
  'copy:js',
  'copy:rxjs',
  'copy:angular',
  'copy:systemjs',
  'copy:css',
  'copy:fonts',
  'copy:views',
  'copy:images'
]);



/** Builds components with resources (html, css) inlined into the built JS (ESM output). */
task(':build:demo:components:inline', sequenceTask(
  ':build:demo:cleanup',
  ':build:demo:components:ts',
  ':build:demo:components:files',
  ':build:demo:components:scss',
  ':build:demo:components:assets',
  ':build:demo:components:assets:minify',
  ':demo:inline-resources'
));

/** Builds components with minified HTML and CSS inlined into the built JS. */
task(':build:demo:components:inline:release', sequenceTask(
  ':build:demo:cleanup',
  ':build:demo:components:ts',
  ':build:demo:components:files',
  ':build:demo:components:scss',
  ':build:demo:components:assets',
  ':build:demo:components:assets:minify',
  ':demo:inline-resources'
));

/** Inlines resources (html, css) into the JS output (for either ESM or CJS output). */
task(':demo:inline-resources', () => inlineResources(DIST_COMPONENTS_ROOT_DEMO));

/** Builds components to ESM output and UMD bundle. */
task('build:demo', sequenceTask(
  ':build:demo:components:inline',
  ':build:demo:components:rollup'));

task('build:demo:components:release', sequenceTask(
  ':build:demo:components:inline:release',
  ':build:demo:components:rollup'
));

/** Generates metadata.json files for all of the components. */
task(':build:demo:components:ngc', ['build:demo:components:release'], execNodeTask(
  '@angular/compiler-cli', 'ngc', ['-p', tsconfigPath]
));
