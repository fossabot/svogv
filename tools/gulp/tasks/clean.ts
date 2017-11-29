import {task} from 'gulp';
import {cleanTask} from '../task_helpers';


task('clean:svogv', cleanTask('dist/svogv'));

task('clean:svogv-material', cleanTask('dist/svogv-material'));

task('clean', ['clean:svogv', 'clean:svogv-material']);
