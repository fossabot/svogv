import { NgModule, ModuleWithProviders } from '@angular/core';

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
  wd.AcAnalogClock,
  wd.HudClock
];

/**
 * The root module with the global exports.
 */
@NgModule({
  declarations: SVOGV_MODULES,
  providers: [FormValidatorService],
  exports: SVOGV_MODULES
})
export class SvOGvRootModule { }


/**
 * The actual SVOGV Module definition using the root module.
 */
@NgModule()
export class SvOGvModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: SvOGvRootModule };
  }
}
