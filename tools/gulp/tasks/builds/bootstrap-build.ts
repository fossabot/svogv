import { task, watch, src, dest } from 'gulp';
import * as path from 'path';
import includePaths from '../../../../scripts/release/rollup-includepaths-plugin';

import {
  DIST_BOOTSTRAP_COMPONENTS_ROOT, PROJECT_ROOT, BOOTSTRAP_COMPONENTS_DIR, HTML_MINIFIER_OPTIONS, LICENSE_BANNER
} from '../../constants';
import {
  sassBuildTask, tsBuildTask, copyTask, sequenceTask,
  triggerLivereload
} from '../../task_helpers';

// No typings for these.
const inlineResources = require('../../../../scripts/release/inline-resources');
const gulpRollup = require('gulp-better-rollup');
const gulpMinifyCss = require('gulp-clean-css');
const gulpMinifyHtml = require('gulp-htmlmin');
const gulpIf = require('gulp-if');
const del = require('del');

task(':bt-build:cleanup', () => {
  del(DIST_BOOTSTRAP_COMPONENTS_ROOT);
  del('./node_modules/@svogv/bootstrap');
});

/** [Watch task] Rebuilds (ESM output) whenever ts, scss, or html sources change. */
task(':watch:components', () => {
  watch(path.join(BOOTSTRAP_COMPONENTS_DIR, '**/*.ts'), ['bt-build:components', triggerLivereload]);
  watch(path.join(BOOTSTRAP_COMPONENTS_DIR, '**/*.scss'), ['bt-build:components', triggerLivereload]);
  watch(path.join(BOOTSTRAP_COMPONENTS_DIR, '**/*.html'), ['bt-build:components', triggerLivereload]);
});

/** Builds component typescript only (ESM output). */
task(':bt-build:components:ts', tsBuildTask(BOOTSTRAP_COMPONENTS_DIR,
                                path.join(BOOTSTRAP_COMPONENTS_DIR, 'tsconfig-srcs.json')));

/** Path to the tsconfig used for ESM output. */
const tsconfigPath = path.relative(PROJECT_ROOT, path.join(BOOTSTRAP_COMPONENTS_DIR, 'tsconfig.json'));
/** Builds components typescript for tests (CJS output). */
task(':bt-build:components:spec', tsBuildTask(BOOTSTRAP_COMPONENTS_DIR, tsconfigPath));

/** Copies assets (html, markdown) to build output. */
task(':bt-build:components:assets', copyTask([
  path.join(BOOTSTRAP_COMPONENTS_DIR, '**/*.!(ts|spec.ts)'),
  path.join(PROJECT_ROOT, 'README.md'),
  path.join(PROJECT_ROOT, 'LICENSE'),
], DIST_BOOTSTRAP_COMPONENTS_ROOT));

/** Minifies the HTML and CSS assets in the distribution folder. */
task(':bt-build:components:assets:minify', () => {
  return src('**/*.+(html|css)', { cwd: DIST_BOOTSTRAP_COMPONENTS_ROOT })
    .pipe(gulpIf(/.css$/, gulpMinifyCss(), gulpMinifyHtml(HTML_MINIFIER_OPTIONS)))
    .pipe(dest(DIST_BOOTSTRAP_COMPONENTS_ROOT));
});

/** Builds scss into css. */
task(':bt-build:components:scss', sassBuildTask(DIST_BOOTSTRAP_COMPONENTS_ROOT, BOOTSTRAP_COMPONENTS_DIR));

/** Builds the UMD bundle for all of SvOgV. */
task(':bt-build:components:rollup', () => {
  const globals: { [name: string]: string } = {
    // Angular dependencies
    '@angular/core': 'ng.core',
    '@angular/common': 'ng.common',
    '@angular/forms': 'ng.forms',
    '@angular/http': 'ng.http',
    '@angular/router': 'ng.router',
    '@angular/platform-browser': 'ng.platformBrowser',
    '@angular/platform-browser-dynamic': 'ng.platformBrowserDynamic',
    '@svogv/core': 'svogv.core',

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

  const includePathsOptions = {
    paths: ['src/core', 'src/core/utils' ],
    include: {
      '../../../core/utils/enum-colors': 'src/core/utils/enum-colors.js'
    }
  };

  const rollupOptions = {
    context: 'this',
    external: Object.keys(globals),
    plugins: [ includePaths(includePathsOptions) ]
  };

  const rollupGenerateOptions = {
    // Keep the moduleId empty because we don't want to force developers to a specific moduleId.
    moduleId: '',
    moduleName: 'ac.svogv',
    format: 'umd',
    globals,
    banner: LICENSE_BANNER,
    dest: 'svogv.umd.js'
  };

  return src(path.join(DIST_BOOTSTRAP_COMPONENTS_ROOT, 'index.js'))
    .pipe(gulpRollup(rollupOptions, rollupGenerateOptions))
    .pipe(dest(path.join(DIST_BOOTSTRAP_COMPONENTS_ROOT, 'bundles')));      // copy to dist for reference
});

// refresh the package immediately to simplify local testing with current version
task(':bt-build:components:copy-for-demo', () => {
  let target = './node_modules/@svogv/bootstrap';
  console.log(`** immediate copy from ${DIST_BOOTSTRAP_COMPONENTS_ROOT}  to ${target}`);
  return src(path.join(DIST_BOOTSTRAP_COMPONENTS_ROOT, '**/*.*')).pipe(dest(target));
});

/** Builds components with resources (html, css) inlined into the built JS (ESM output). */
task(':bt-build:components:inline', sequenceTask(
  ':bt-build:cleanup',
  ':bt-build:components:ts',
  ':bt-build:components:scss',
  ':bt-build:components:assets',
  ':bt-build:components:assets:minify',
  ':bt-build:inline-resources'
));

/** Builds components with minified HTML and CSS inlined into the built JS. */
task(':bt-build:components:inline:release', sequenceTask(
  ':bt-build:cleanup',
  ':bt-build:components:ts',
  ':bt-build:components:scss',
  ':bt-build:components:assets',
  ':bt-build:components:assets:minify',
  ':bt-build:inline-resources'
));

/** Inlines resources (html, css) into the JS output (for either ESM or CJS output). */
task(':bt-build:inline-resources', function () {
  return inlineResources(DIST_BOOTSTRAP_COMPONENTS_ROOT);
});

/** Builds components to ESM output and UMD bundle. */
task('bt-build', sequenceTask(
  ':bt-build:components:inline',
  ':bt-build:components:rollup',
  ':bt-build:components:copy-for-demo'));

task('bt-build:components:release', sequenceTask(
  ':bt-build:components:inline:release',
  ':bt-build:components:rollup'
));

