import { NgModule, ModuleWithProviders, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './modules/material.module';

import * as wd from './widgets/index';

import { FormValidatorService } from '../core/services/formvalidator.service';
import { FormValidatorFromJsonService } from '../core/services/formvalidator-fromjson.service';

export * from '../core/decorators/index';

const SVOGV_COMPONENTS = [
  wd.AcInfoBox,
  wd.AcDataGridPagination,
  wd.AcTreeView,
  wd.AcTreeViewNode,
  wd.AcEditor,
  wd.AcAutoForm,
  wd.AcLoaderIcon,
  wd.AcAnalogClock,
  wd.AcFormatDataPipe
];

/**
 * The actual SVOGV Module definition using the root module.
 */
@NgModule({
  imports: [BrowserModule, RouterModule, ReactiveFormsModule, FormsModule, MaterialModule],
  declarations: SVOGV_COMPONENTS,
  providers: [FormValidatorService, FormValidatorFromJsonService],
  exports: SVOGV_COMPONENTS
})
export class SvogvModule {

  // store this for access to custom pipes in the model's helper classes, which are not injectable
  static injector: Injector;

  constructor(injector: Injector) {
    SvogvModule.injector = injector;
  }

}
