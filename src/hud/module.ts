import { NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import * as wd from './widgets/index';


const SVOGV_HUD_MODULES = [
  wd.HudClock
];

/**
 * The root module with the global exports.
 */
@NgModule({
  imports: [BrowserModule, RouterModule, ReactiveFormsModule],
  declarations: SVOGV_HUD_MODULES,
  exports: SVOGV_HUD_MODULES
})
export class SvogvHudRootModule { }


/**
 * The actual SVOGV Module definition using the root module.
 */
@NgModule()
export class SvogvHudModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: SvogvHudRootModule };
  }
}
