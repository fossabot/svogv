import { join } from 'path';

export const SVOGV_VERSION = require('../../package.json').version;

export const PROJECT_ROOT = join(__dirname, '../..');
export const SOURCE_ROOT = join(PROJECT_ROOT, 'src/');
export const BOOTSTRAP_DEMO_ROOT = join(PROJECT_ROOT, 'src/bootstrap-demo/');
export const MATERIAL_DEMO_ROOT = join(PROJECT_ROOT, 'src/material-demo/');

export const DIST_ROOT = join(PROJECT_ROOT, 'dist/');
export const DIST_BOOTSTRAP_DEMO_ROOT = join(PROJECT_ROOT, 'dist/bootstrap-demo');
export const DIST_MATERIAL_DEMO_ROOT = join(PROJECT_ROOT, 'dist/material-demo');
export const DIST_BOOTSTRAP_COMPONENTS_ROOT = join(DIST_ROOT, '@svogv/bootstrap');
export const DIST_MATERIAL_COMPONENTS_ROOT = join(DIST_ROOT, '@svogv/material');

export const SASS_AUTOPREFIXER_OPTIONS = {
  browsers: [
    'last 2 versions',
    'not ie <= 10',
    'not ie_mob <= 10',
  ],
  cascade: false,
};

export const HTML_MINIFIER_OPTIONS = {
  collapseWhitespace: true,
  removeComments: true,
  caseSensitive: true,
  removeAttributeQuotes: false
};

export const LICENSE_BANNER = `/**
  * @license SVOGV v${SVOGV_VERSION}
  * Copyright (c) 2011-2018 Joerg <IsAGeek> Krause, Berlin https://www.joergkrause.de/
  * License: ICS
  */`;

export const NPM_VENDOR_FILES = [
  '@angular', 'core-js/client', 'rxjs', 'systemjs/dist', 'zone.js/dist'
];

export const BOOTSTRAP_COMPONENTS_DIR = join(SOURCE_ROOT, 'bootstrap-lib/');
export const MATERIAL_COMPONENTS_DIR = join(SOURCE_ROOT, 'material-lib/');
