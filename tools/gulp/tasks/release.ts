import {spawn} from 'child_process';
import {existsSync, statSync} from 'fs';
import {task} from 'gulp';
import gulpRunSequence = require('run-sequence');
import path = require('path');
import minimist = require('minimist');

import {execTask, cleanTask} from '../task_helpers';
import {DIST_BOOTSTRAP_COMPONENTS_ROOT, DIST_MATERIAL_COMPONENTS_ROOT} from '../constants';

const argv = minimist(process.argv.slice(3));


task(':build:release:clean-spec', cleanTask('dist/**/*.spec.*'));


task('build:release', function(done: () => void) {
  // Synchronously run those tasks.
  gulpRunSequence(
    'clean',
    'bt-build:components:release',
    'mt-build:components:release',
    ':build:release:clean-spec',
    done
  );
});


/** Make sure we're logged in. */
task(':publish:whoami', execTask('npm', ['whoami'], {
  silent: true,
  errMessage: 'You must be logged in to publish.'
}));

task(':publish:logout', execTask('npm', ['logout']));


function _execNpmPublish(label: string, packageDir: string): Promise<{}> {
  if (!statSync(packageDir).isDirectory()) {
    return;
  }

  if (!existsSync(path.join(packageDir, 'package.json'))) {
    throw new Error(`"${packageDir}" does not have a package.json.`);
  }

  process.chdir(packageDir);
  console.log(`Publishing @SVOGV...`);

  const command = 'npm';
  const args = ['publish', '--access', 'public', label ? `--tag` : undefined, label || undefined];
  return new Promise((resolve, reject) => {
    console.log(`  Executing "${command} ${args.join(' ')}"...`);
    if (argv['dry']) {
      resolve();
      return;
    }

    const childProcess = spawn(command, args);
    childProcess.stdout.on('data', (data: Buffer) => {
      console.log(`  stdout: ${data.toString().split(/[\n\r]/g).join('\n          ')}`);
    });
    childProcess.stderr.on('data', (data: Buffer) => {
      console.error(`  stderr: ${data.toString().split(/[\n\r]/g).join('\n          ')}`);
    });

    childProcess.on('close', (code: number) => {
      if (code == 0) {
        resolve();
      } else {
        reject(new Error(`SVOGV did not publish, status: ${code}.`));
      }
    });
  });
}

task(':publish:@bootstrap', function(done: (err?: any) => void) {
  const label = argv['tag'];
  const currentDir = process.cwd();

  if (!label) {
    console.log('You can use a label with --tag=labelName.');
    console.log('Publishing using the latest tag.');
  } else {
    console.log(`Publishing using the ${label} tag.`);
  }
  console.log('\n\n');

  // Publish both the SVOGV packages.
  return _execNpmPublish(label, DIST_BOOTSTRAP_COMPONENTS_ROOT)
    .then(() => done())
    .catch((err: Error) => done(err))
    .then(() => process.chdir(currentDir));
});

task(':publish:@material', function(done: (err?: any) => void) {
  const label = argv['tag'];
  const currentDir = process.cwd();

  if (!label) {
    console.log('You can use a label with --tag=labelName.');
    console.log('Publishing using the latest tag.');
  } else {
    console.log(`Publishing using the ${label} tag.`);
  }
  console.log('\n\n');

  // Publish both the SVOGV packages.
  return _execNpmPublish(label, DIST_MATERIAL_COMPONENTS_ROOT)
    .then(() => done())
    .catch((err: Error) => done(err))
    .then(() => process.chdir(currentDir));
});

task('publish', function(done: () => void) {
  gulpRunSequence(
    ':publish:whoami',
    'build:release',
    ':publish@bootstrap',
    ':publish@material',
    ':publish:logout',
    done
  );
});
