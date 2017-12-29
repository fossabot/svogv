import { task, watch, src, dest } from 'gulp';
import { join, relative } from 'path';

import {
  DIST_MATERIAL_COMPONENTS_ROOT, PROJECT_ROOT, MATERIAL_COMPONENTS_DIR, HTML_MINIFIER_OPTIONS, LICENSE_BANNER
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
const gulpMinifyJs = require('gulp-uglify');
const gulpRename = require('gulp-rename');
const gulpIf = require('gulp-if');
const del = require('del');

task(':mt-build:cleanup', () => {
  del(DIST_MATERIAL_COMPONENTS_ROOT);
  del('./node_modules/@svogv/material');
});

/** [Watch task] Rebuilds (ESM output) whenever ts, scss, or html sources change. */
task(':watch:components', () => {
  watch(join(MATERIAL_COMPONENTS_DIR, '**/*.ts'), ['mt-build:components', triggerLivereload]);
  watch(join(MATERIAL_COMPONENTS_DIR, '**/*.scss'), ['mt-build:components', triggerLivereload]);
  watch(join(MATERIAL_COMPONENTS_DIR, '**/*.html'), ['mt-build:components', triggerLivereload]);
});

/** Builds component typescript only (ESM output). */
task(':mt-build:components:ts', tsBuildTask(MATERIAL_COMPONENTS_DIR,
                                join(MATERIAL_COMPONENTS_DIR, 'tsconfig-srcs.json')));

/** Path to the tsconfig used for ESM output. */
const tsconfigPath = relative(PROJECT_ROOT, join(MATERIAL_COMPONENTS_DIR, 'tsconfig.json'));
/** Builds components typescript for tests (CJS output). */
task(':mt-build:components:spec', tsBuildTask(MATERIAL_COMPONENTS_DIR, tsconfigPath));

/** Copies assets (html, markdown) to build output. */
task(':mt-build:components:assets', copyTask([
  join(MATERIAL_COMPONENTS_DIR, '**/*.!(ts|spec.ts)'),
  join(PROJECT_ROOT, 'README.md'),
  join(PROJECT_ROOT, 'LICENSE'),
], DIST_MATERIAL_COMPONENTS_ROOT));

/** Minifies the HTML and CSS assets in the distribution folder. */
task(':mt-build:components:assets:minify', () => {
  return src('**/*.+(html|css)', { cwd: DIST_MATERIAL_COMPONENTS_ROOT })
    .pipe(gulpIf(/.css$/, gulpMinifyCss(), gulpMinifyHtml(HTML_MINIFIER_OPTIONS)))
    .pipe(dest(DIST_MATERIAL_COMPONENTS_ROOT));
});

/** Builds scss into css. */
task(':mt-build:components:scss', sassBuildTask(DIST_MATERIAL_COMPONENTS_ROOT, MATERIAL_COMPONENTS_DIR));

/** Builds the UMD bundle for all of SvOgV. */
task(':mt-build:components:rollup', () => {
  const globals: { [name: string]: string } = {
    // Angular dependencies
    '@angular/core': 'ng.core',
    '@angular/common': 'ng.common',
    '@angular/common/http': 'ng.commonHttp',
    '@angular/forms': 'ng.forms',
    '@angular/http': 'ng.http',
    '@angular/router': 'ng.router',
    '@angular/platform-browser': 'ng.platformBrowser',
    '@angular/platform-browser-dynamic': 'ng.platformBrowserDynamic',
    '@angular/animations': 'ng.animations',
    '@angular/animations/browser': 'ng.animationsBrowser',
    '@angular/platform-browser/animations': 'ng.platformBrowserAnimations',
    '@angular/material': 'ng.material',
    '@angular/cdk': 'nd.cdk',
    '@angular/flex-layout': 'nd.flex-layout',
    '@svogv/core': 'svogv.core',
    // Rxjs dependencies
    'rxjs/Subject': 'Rx.Subject',
    'rxjs/add/observable/fromEvent': 'Rx.Observable',
    'rxjs/add/observable/forkJoin': 'Rx.Observable',
    'rxjs/add/observable/of': 'Rx.Observable',
    'rxjs/add/observable/throw': 'Rx.Observable',
    'rxjs/add/operator/toPromise': 'Rx.Observable.operator',
    'rxjs/add/operator/map': 'Rx.Observable.operator',
    'rxjs/add/operator/filter': 'Rx.Observable.operator',
    'rxjs/add/operator/do': 'Rx.Observable.operator',
    'rxjs/add/operator/share': 'Rx.Observable.operator',
    'rxjs/add/operator/finally': 'Rx.Observable.operator',
    'rxjs/add/operator/catch': 'Rx.Observable.operator',
    'rxjs/add/operator/first': 'Rx.Observable.operator',
    'rxjs/Observable': 'Rx.Observable'
  };

  const rollupOptions = {
    context: 'this',
    external: Object.keys(globals)
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

  return src(join(DIST_MATERIAL_COMPONENTS_ROOT, 'index.js'))
    .pipe(gulpRollup(rollupOptions, rollupGenerateOptions))
    .pipe(dest(join(DIST_MATERIAL_COMPONENTS_ROOT, 'bundles')));      // copy to dist for reference
});

task(':mt-build:components:rollup-minify', () => {
  return src(
    join(DIST_MATERIAL_COMPONENTS_ROOT, 'bundles/svogv.umd.js'))
    .pipe(gulpRename('svogv.umd.min.js'))
    .pipe(gulpMinifyJs())
    .pipe(dest(join(DIST_MATERIAL_COMPONENTS_ROOT, 'bundles')));
});

// refresh the package immediately to simplify local testing with current version
task(':mt-build:components:copy-for-demo', () => {
  let target = './node_modules/@svogv/material';
  console.log(`** immediate copy from ${DIST_MATERIAL_COMPONENTS_ROOT}  to ${target}`);
  return src(join(DIST_MATERIAL_COMPONENTS_ROOT, '**/*.*')).pipe(dest(target));
});

/** Builds components with resources (html, css) inlined into the built JS (ESM output). */
task(':mt-build:components:inline', sequenceTask(
  ':mt-build:cleanup',
  ':mt-build:components:ts',
  ':mt-build:components:scss',
  ':mt-build:components:assets',
  ':mt-build:components:assets:minify',
  ':mt-build:inline-resources'
));

/** Builds components with minified HTML and CSS inlined into the built JS. */
task(':mt-build:components:inline:release', sequenceTask(
  ':mt-build:cleanup',
  ':mt-build:components:ts',
  ':mt-build:components:scss',
  ':mt-build:components:assets',
  ':mt-build:components:assets:minify',
  ':mt-build:inline-resources'
));

/** Inlines resources (html, css) into the JS output (for either ESM or CJS output). */
task(':mt-build:inline-resources', function () {
  return inlineResources(DIST_MATERIAL_COMPONENTS_ROOT);
});

/** Builds components to ESM output and UMD bundle. */
task('mt-build', sequenceTask(
  ':mt-build:components:inline',
  ':mt-build:components:rollup',
  ':mt-build:components:rollup-minify',
  ':mt-build:components:copy-for-demo'));

task('mt-build:components:release', sequenceTask(
  ':mt-build:components:inline:release',
  ':mt-build:components:rollup',
  ':mt-build:components:rollup-minify'
));

