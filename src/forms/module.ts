import { NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import * as wd from './widgets/index';

import {
  FormValidatorService
} from './services/formvalidator.service';

const SVOGV_FORMS_COMPONENTS = [
  wd.AcInfoBox,
  wd.AcDataGridPagination,
  wd.AcTreeView,
  wd.AcTreeViewNode,
  wd.AcEditor,
  wd.AcAutoForm,
  wd.AcLoaderIcon,
  wd.AcAnalogClock,
  wd.CheckboxWidgetComponent,
  wd.DatepickerWidgetComponent,
  wd.FieldsetWidgetComponent,
  wd.ImageWidgetComponent,
  wd.RadioWidgetComponent,
  wd.SelectWidgetComponent,
  wd.StringWidgetComponent,
  wd.SwitcherWidgetComponent
];

/**
 * The root module with the global exports.
 */
@NgModule({
  imports: [BrowserModule, RouterModule, ReactiveFormsModule],
  declarations: SVOGV_FORMS_COMPONENTS,
  providers: [FormValidatorService],
  exports: SVOGV_FORMS_COMPONENTS
})
export class SvogvFormsModule {
}
