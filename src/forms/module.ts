import { NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import * as wd from './widgets/index';

import {
  FormValidatorService
} from './services/formvalidator.service';

const SVOGV_MODULES = [
  wd.AcInfoBox,
  wd.AcDataGridPagination,
  wd.AcTreeView,
  wd.AcTreeViewNode,
  wd.AcEditor,
  wd.AcAutoForm,
  wd.AcLoaderIcon,
  wd.AcAnalogClock
];

/**
 * The root module with the global exports.
 */
@NgModule({
  imports: [BrowserModule, RouterModule, ReactiveFormsModule],
  declarations: SVOGV_MODULES,
  providers: [FormValidatorService],
  exports: SVOGV_MODULES
})
export class SvogvFormsRootModule { }


/**
 * The actual SVOGV Module definition using the root module.
 */
@NgModule()
export class SvogvFormsModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: SvogvFormsRootModule };
  }
}
