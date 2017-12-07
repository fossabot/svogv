import { NgModule, ModuleWithProviders, Injector } from '@angular/core';

import { FormValidatorService } from './services/formvalidator.service';
import { FormValidatorFromJsonService } from './services/formvalidator-fromjson.service';

import * as d from '../core/decorators/index';

const SVOGV_EXPORTS = [
  [ d.Compare, d.Display, d.DisplayGroup, d.Email, d.Format, d.Range, d.Readonly, d.Required,
    d.Hidden, d.MaxLength, d.MinLength, d.StringLength, d.Pattern, d.TemplateHint]
];

/**
 * The actual SVOGV Module definition using the root module.
 */
@NgModule({
  providers: [FormValidatorService, FormValidatorFromJsonService],
  exports: SVOGV_EXPORTS
})
export class SvogvCoreModule {

  // store this for access to custom pipes in the model's helper classes, which are not injectable
  static injector: Injector;

  constructor(injector: Injector) {
    SvogvCoreModule.injector = injector;
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SvogvCoreModule,
      providers: [ FormValidatorService, FormValidatorFromJsonService ]
    }
  }

}

