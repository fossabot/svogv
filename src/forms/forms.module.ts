import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// Internal
import * as wd from './widgets/index';
import * as d from './directives/validate-on-blur.directive';

import {
  FormValidatorService
} from './services/formvalidator.service';

const SVOGV_FORMS_COMPONENTS = [
  wd.AcInfoBoxComponent,
  wd.AcDataGridPaginationComponent,
  wd.AcTreeViewComponent,
  wd.AcTreeViewNode,
  wd.AcEditorComponent,
  wd.AcAutoFormComponent,
  wd.AcLoaderIconComponent,
  wd.AcAnalogClockComponent,
  wd.CheckboxWidgetComponent,
  wd.DatepickerWidgetComponent,
  wd.FieldsetWidgetComponent,
  wd.ImageWidgetComponent,
  wd.RadioWidgetComponent,
  wd.SelectWidgetComponent,
  wd.StringWidgetComponent,
  wd.SwitcherWidgetComponent,
  wd.CalendarNavComponent,
  wd.DatePickerComponent,
  wd.DayCalendarComponent,
  wd.DayTimeCalendarComponent,
  wd.TimeSelectComponent,
  wd.MonthCalendarComponent,
  d.ValidateOnBlurDirective,
  wd.DatePickerDirective
];

/**
 * The root module with the global exports.
 */
@NgModule({
  imports: [BrowserModule, RouterModule, ReactiveFormsModule, FormsModule],
  declarations: SVOGV_FORMS_COMPONENTS,
  providers: [FormValidatorService],
  exports: SVOGV_FORMS_COMPONENTS
})
export class SvogvFormsModule {
}
