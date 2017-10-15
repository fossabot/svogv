import { task, watch, src, dest } from 'gulp';
import * as path from 'path';

import {
  SOURCE_ROOT, DEMO_ROOT, DIST_ROOT
} from '../constants';

import {
  execNodeTask, copyTask, sequenceTask, triggerLivereload
} from '../task_helpers';

var htmlmin = require('gulp-htmlmin');                      // minify HTML
var ts = require('gulp-typescript');                        // transpile TS
var sass = require('gulp-sass');                            // transpile SASS
var del = require('del');                                   // helper to delete paths
var systemBuilder = require('systemjs-builder');            // create a rx bundle because the provided did not work

// from Github structure copy static files to root/dist/demo and execute there

// The project's structure
var paths = {
  root: DIST_ROOT + 'demo/',
  assets: DIST_ROOT + 'demo/assets/',
  views: DIST_ROOT + 'demo/views/',
  npm: 'node_modules/',
  app: DEMO_ROOT + 'client/app/'
};

task('clean:assets', function (cb) {
  return del(paths.assets, { force: true });
});
task('clean:views', function (cb) {
  return del(paths.views, { force: true });
});
task('clean:views:index', function (cb) {
  return del(paths.root + 'index.html', { force: true });
});
task('clean', ['clean:assets', 'clean:views', 'clean:views:index']);
