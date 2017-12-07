import { task, src, dest } from 'gulp';
import { sequenceTask } from '../task_helpers';
import { join } from 'path';

import {
  SOURCE_ROOT, DIST_ROOT
} from '../constants';

// The placeholder is here just to point users of the formder svogv version to the new @svogv structure
task('placeholder', function () {
  return src(join(SOURCE_ROOT, 'svogv-lib-placeholder/**/*'))
    .pipe(dest(join(DIST_ROOT, 'svogv')));
});

task('build', sequenceTask('core-build', ['bt-build', 'mt-build', 'placeholder']));
