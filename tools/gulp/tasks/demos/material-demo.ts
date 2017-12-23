import { task, src, dest } from 'gulp';
import * as path from 'path';

import {
  MATERIAL_DEMO_ROOT, DIST_MATERIAL_DEMO_ROOT
} from '../../constants';

import {
  sequenceTask, execTask
} from '../../task_helpers';

const inlineResources = require('../../../../scripts/release/inline-resources');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const print = require('gulp-print');
const htmlmin = require('gulp-htmlmin');                      // minify HTML
const cssmin = require('gulp-clean-css');
const sass = require('gulp-sass');                            // transpile SASS
const gzip = require('gulp-zip');
const del = require('del');                                   // helper to delete paths
const systemBuilder = require('systemjs-builder');

// from Github structure copy static files to root/dist/demo and execute there

task(':mt-demo:clean:assets', function (cb) {
  return del(path.join(DIST_MATERIAL_DEMO_ROOT, 'assets/'), { force: true });
});
task(':mt-demo:clean:views', function (cb) {
  return del(path.join(DIST_MATERIAL_DEMO_ROOT, 'views/'), { force: true });
});
task(':mt-demo:clean:views:index', function (cb) {
  return del(path.join(DIST_MATERIAL_DEMO_ROOT, 'inex.html'), { force: true });
});
task(':mt-demo:clean', [':mt-demo:clean:assets', ':mt-demo:clean:views', ':mt-demo:clean:views:index']);

task(':mt-demo:copy:js', function () {
  return src([
    './node_modules/core-js/client/core.js',
    './node_modules/zone.js/dist/zone.js',
    './node_modules/reflect-metadata/Reflect.js',
    './node_modules/systemjs/dist/system.js',
    './node_modules/classlist.js/classList.js'
  ])
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(dest(path.join(DIST_MATERIAL_DEMO_ROOT, 'assets/')))
    .pipe(gzip('vendor.js.gz'))
    .pipe(dest(path.join(DIST_MATERIAL_DEMO_ROOT, 'assets/')));
});

// we write all css in sass
task(':mt-demo:sass', function () {
  return src([
    path.join(MATERIAL_DEMO_ROOT, '/styles/*.scss')
  ])
    .pipe(sass())
    .pipe(cssmin())
    .pipe(dest(path.join(DIST_MATERIAL_DEMO_ROOT, 'assets/styles')));
});

// icons and symbols are solely material
task(':mt-demo:copy:fonts', function () {
  return src([
    path.join(MATERIAL_DEMO_ROOT, '/fonts/*.*')
  ])
    .pipe(dest(path.join(DIST_MATERIAL_DEMO_ROOT, 'assets/fonts')));
});

task(':mt-demo:copy:favicon', function () {
  return src([
    path.join(MATERIAL_DEMO_ROOT, 'favicon.ico')
  ])
    .pipe(dest(DIST_MATERIAL_DEMO_ROOT));
});
// View HTML (component templates)
task(':mt-demo:copy:views:templates', function () {
  return src([MATERIAL_DEMO_ROOT + '**/*.html'], { base: path.join(MATERIAL_DEMO_ROOT, 'components/') })
    .pipe(print())
    .pipe(dest(path.join(DIST_MATERIAL_DEMO_ROOT, 'components/')));
});
task(':mt-demo:copy:views:index', function () {
  return src([path.join(MATERIAL_DEMO_ROOT, 'index.html')])
    .pipe(htmlmin())
    .pipe(dest(DIST_MATERIAL_DEMO_ROOT));
});
task(':mt-demo:copy:views', [':mt-demo:copy:views:index', ':mt-demo:copy:views:templates']);

task(':mt-demo:copy:images', function () {
  return src([path.join(MATERIAL_DEMO_ROOT, 'images/*.*')])
    .pipe(dest(path.join(DIST_MATERIAL_DEMO_ROOT, 'assets/images')));
});

task(':mt-demo:copy', [':mt-demo:copy:fonts', ':mt-demo:copy:favicon', ':mt-demo:copy:views', ':mt-demo:copy:images', ':mt-demo:copy:js']);

// complete setup and rollup
/** Builds components typescript for tests (CJS output). */
task(':mt-demo:build:components', execTask('tsc', ['-p', MATERIAL_DEMO_ROOT]));

/** Inlines resources (html, css) into the JS output (for either ESM or CJS output). */
task(':mt-demo:inline-resources', function () {
  return inlineResources(path.join(DIST_MATERIAL_DEMO_ROOT, 'app'));
});

task(':mt-demo:bundle:create', function () {
  var builder = new systemBuilder('.', {
    paths: { 'npm:': './node_modules/' },
    map: {
      '@angular/animations': 'npm:@angular/animations/bundles/animations.umd.js',
      '@angular/animations/browser': 'npm:@angular/animations/bundles/animations-browser.umd.js',
      '@angular/platform-browser/animations': 'npm:@angular/platform-browser/bundles/platform-browser-animations.umd.js',         
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/common/http': 'npm:@angular/common/bundles/common-http.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
      '@angular/material': 'npm:@angular/material/bundles/material.umd.js',
      '@angular/flex-layout': 'npm:@angular/flex-layout/bundles/flex-layout.umd.js',
      '@angular/cdk': 'npm:@angular/cdk/bundles/cdk.umd.js',
      '@angular/cdk/accordion': 'npm:@angular/cdk/bundles/cdk-accordion.umd.js',
      '@angular/cdk/a11y': 'npm:/@angular/cdk/bundles/cdk-a11y.umd.js',
      '@angular/cdk/bidi': 'npm:/@angular/cdk/bundles/cdk-bidi.umd.js',
      '@angular/cdk/observers': 'npm:/@angular/cdk/bundles/cdk-observers.umd.js',
      '@angular/cdk/overlay': 'npm:/@angular/cdk/bundles/cdk-overlay.umd.js',
      '@angular/cdk/portal': 'npm:/@angular/cdk/bundles/cdk-portal.umd.js',
      '@angular/cdk/stepper': 'npm:/@angular/cdk/bundles/cdk-stepper.umd.js',
      '@angular/cdk/scrolling': 'npm:/@angular/cdk/bundles/cdk-scrolling.umd.js',
      '@angular/cdk/platform': 'npm:/@angular/cdk/bundles/cdk-platform.umd.js',
      '@angular/cdk/keycodes': 'npm:/@angular/cdk/bundles/cdk-keycodes.umd.js',
      '@angular/cdk/coercion': 'npm:/@angular/cdk/bundles/cdk-coercion.umd.js',
      '@angular/cdk/collections': 'npm:/@angular/cdk/bundles/cdk-collections.umd.js',
      '@angular/cdk/layout': 'npm:/@angular/cdk/bundles/cdk-layout.umd.js',
      // '@angular/cdk/rxjs': 'npm:/@angular/cdk/bundles/cdk-rxjs.umd.js',
      '@angular/cdk/table': 'npm:/@angular/cdk/bundles/cdk-table.umd.js',
      'rxjs': 'npm:rxjs',
      '@svogv/core': 'npm:@svogv/core/bundles/svogv-core.umd.js',
      '@svogv/material': 'npm:@svogv/material/bundles/svogv.umd.js',
      'tslib': 'npm:tslib/tslib.js'
    },
    packages: {
      'app': { main: 'main.js', defaultExtension: 'js' },
      'rxjs': { main: 'Rx.js', defaultExtension: 'js' }
    }
  });
  // builder.reset();
  builder.loader.defaultJSExtensions = true;
  return builder
    .buildStatic(path.join(DIST_MATERIAL_DEMO_ROOT, 'app/app.js'),
      path.join(DIST_MATERIAL_DEMO_ROOT, './app.bundle.js'), {
      sourceMaps: true,
      minify: false,
      mangle: false,
      rollup: true
    })
    .then(function () {
      console.log('Bundle completed');
    });
});

task(':mt-demo:bundle:zip', function () {
  return src(path.join(DIST_MATERIAL_DEMO_ROOT, './app.bundle.js')).pipe(gzip('app.bundle.js.gz')).pipe(dest(DIST_MATERIAL_DEMO_ROOT));
});

task(':mt-demo:del:build-folder', function () {
  return del(path.join(DIST_MATERIAL_DEMO_ROOT, 'app/'));
});

task('mt-demo:build', sequenceTask(
  ':mt-demo:clean',
  ':mt-demo:sass',
  ':mt-demo:copy',
  ':mt-demo:build:components',
  ':mt-demo:inline-resources',
  ':mt-demo:bundle:create',
  ':mt-demo:bundle:zip',
  ':mt-demo:del:build-folder'));
