import { NgModule, enableProdMode } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
// access to WebAPI
import { SiteApiService } from './services/index';
// custom components
import * as cmp from './components/index';
// routes' configuration
import { routes } from './configurations/routes';
// The SVOGV library (in the demo it's a copy from build process so one can build and run without updating npm)
import { SvogvFormsModule, FormValidatorService } from '@svogv/forms';
import { SvogvBlocksModule } from '@svogv/blocks';
import { SvogvMapsModule } from '@svogv/maps';
import { SvogvHudModule } from '@svogv/hud';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    SvogvFormsModule,
    SvogvBlocksModule,
    SvogvMapsModule,
    SvogvHudModule
  ],
  declarations: [
    // Demo app
    cmp.SiteNavComponent
    , cmp.SiteRootComponent
    , cmp.SiteAboutComponent
    , cmp.DashboardComponent
    // Editor, Validation & Grid
    , cmp.EditorDemoComponent
    , cmp.EditAutoformEditorComponent
    , cmp.ListEditorComponent
    , cmp.NewEditorComponent
    , cmp.EditEditorComponent
    , cmp.DeleteEditorComponent
    // Widget Demos
    , cmp.CommonComponent
    , cmp.WidgetDemoComponent
    , cmp.ListWidgetsComponent
    , cmp.AnalogClockComponent
    , cmp.TreeviewComponent
    , cmp.LoaderIconComponent
    // Custom Widgets just for Demo
    , cmp.DemoSideMenuComponent
    , cmp.DemoBreadCrumbComponent
    , cmp.DemoTabsComponent
    // Hud Demo
    , cmp.HudDashboardComponent
  ],
  bootstrap: [cmp.SiteRootComponent],
  providers: [
      SiteApiService        // just for demo to get some static data
    , FormValidatorService  // the forms support, manages the decorators
    , { provide: LocationStrategy, useClass: HashLocationStrategy }]
})
export class RootModule {
}
// uncomment to use in production
enableProdMode();

platformBrowserDynamic().bootstrapModule(RootModule);
