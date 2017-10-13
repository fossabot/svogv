import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import * as wd from './widgets/index';
import { WindowRef } from './utils/windowref';

const SVOGV_HUD_MODULES = [
  wd.HudClock
];

/**
 * The root module with the global exports.
 */
@NgModule({
  imports: [BrowserModule, RouterModule, ReactiveFormsModule],
  declarations: SVOGV_HUD_MODULES,
  providers: [WindowRef],
  exports: SVOGV_HUD_MODULES
})
export class SvogvHudModule {
}
