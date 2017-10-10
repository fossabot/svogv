import {join} from 'path';

export const SVOGV_VERSION = require('../../package.json').version;

export const PROJECT_ROOT = join(__dirname, '../..');
export const SOURCE_ROOT = join(PROJECT_ROOT, 'src/');
export const DEMO_ROOT = join(PROJECT_ROOT, 'src/demo/');

export const DIST_ROOT = join(PROJECT_ROOT, 'dist/');
// We can generate all three parts in one step
export const DIST_COMPONENTS_ROOT_FORMS = join(DIST_ROOT, '@svogv/forms/');
export const DIST_COMPONENTS_ROOT_HUD = join(DIST_ROOT, '@svogv/hud/');
export const DIST_COMPONENTS_ROOT_BLOCK = join(DIST_ROOT, '@svogv/blocks/');

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
  * 
  * Copyright (c) 2011-2018 Joerg <IsAGeek> Krause, Berlin https://www.joergkrause.de/
  * License: ICS
  *
  * For documentation and further instructions see http://www.svogv.com   
  */`;

export const NPM_VENDOR_FILES = [
  '@angular', 'core-js/client', 'rxjs', 'systemjs/dist', 'zone.js/dist'
];
// This is the forms project that is the components foundation
export const COMPONENTS_DIR_FORMS = join(SOURCE_ROOT, 'forms/');
// The projects consists of two submodules, which are independent of each other
export const COMPONENTS_DIR_HUD = join(SOURCE_ROOT, 'hud/');
export const COMPONENTS_DIR_BLOCKS = join(SOURCE_ROOT, 'blocks/');
export const COMPONENTS_DIR_MAPS = join(SOURCE_ROOT, 'maps/');

// Testing is not yet splitted, so we keep this as a placeholder
export const COMPONENTS_DIR = SOURCE_ROOT;
