import {task} from 'gulp';
import {cleanTask} from '../task_helpers';

task('clean:package', cleanTask(['./dist/material-package', './dist/bootstrap-package', './dist/core-package']));

task('clean:demo', cleanTask(['./dist/material-demo', './dist/bootstrap-demo']));

task('clean', ['clean:demo', 'clean:package']);
