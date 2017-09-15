﻿import { NgModule, enableProdMode } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
// access to WebAPI
import { SiteApiService } from './services/siteapiservice';
// custom components
import * as cmp from './components/index';
// routes' configuration
import routes from './configurations/routes';
// The SVOGV library (in the demo it's a hard link with paths info in tsconfig,
// resolves against node_modules without changes)
import * as wd from 'svogv';
import { FormValidatorService, DropdownService } from 'svogv';
import { WindowRef } from 'svogv';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [
    // Demo app
    cmp.SiteNavComponent
    , cmp.SiteRootComponent
    , cmp.SiteAboutComponent
    , cmp.DashboardComponent
    // Editor, Validation & Grid
    , cmp.EditorDemoComponent, cmp.EditAutoformEditorComponent
    , cmp.ListEditorComponent, cmp.NewEditorComponent
    , cmp.EditEditorComponent, cmp.DeleteEditorComponent
    // Widgets 
    , cmp.WidgetDemoComponent
    , cmp.ListWidgetsComponent
    , cmp.AnalogClockComponent, cmp.TreeviewComponent, cmp.LoaderIconComponent
    // Hud Demo
    , cmp.HudDashboardComponent
    // simple Bootstrap widgets
    , wd.AcTreeView, wd.AcTreeViewNode
    , wd.AcSideMenu, wd.AcDropMenu, wd.AcBreadCrumb
    , wd.AcDataGridPagination, wd.AcInfoBox, wd.AcTabs
    , wd.AcEditor, wd.AcAutoForm
    // SVG widgets, HUD widgets
    , wd.AcAnalogClock, wd.AcLoaderIcon, wd.HudClock
    // Supporting Directives
    , wd.Dropdown, wd.DropdownToggle
  ],
  bootstrap: [cmp.SiteRootComponent],
  providers: [
      SiteApiService        // just for demo to get some static data
    , FormValidatorService  // the forms support, manages the decorators
    , DropdownService       // supports the dropdown menu events 
    , { provide: LocationStrategy, useClass: HashLocationStrategy }
    , WindowRef]
})
export class RootModule {
}
// uncomment to use in production
enableProdMode();
platformBrowserDynamic().bootstrapModule(RootModule);
