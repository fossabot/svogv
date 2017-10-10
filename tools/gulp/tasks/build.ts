import {task} from 'gulp';

/** Builds all components to ESM output and UMD bundle. */
task('build', [
  'build:forms',
  // 'build:blocks',
  // 'build:maps',
  // 'build:hud'
]
);