import { Routes } from '@angular/router';
import * as cmp from '../components/index';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  // app paths
  {
    path: 'dashboard',
    component: cmp.DashboardComponent,
    data: { 'title': 'Dashboard', 'subtitle': 'Dashboard', 'icon': 'fa-dashboard' }
  },
  {
    path: 'widgets',
    component: cmp.WidgetDemoComponent,
    data: { 'title': 'Widget Demo', 'subtitle': 'Diverse Components', 'icon': 'fa-clock-o', 'breadcrumb': true },
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      // actual child routes for studies, components will land in the inner <router-outlet> of studies' view
      {
        path: 'list',
        component: cmp.ListWidgetsComponent,
        data: {
          'title': 'Overview', 'subtitle': 'Show other widgets',
          'active': true, 'disabled': false, 'breadcrumb': true, order: 10
        }
      },
      {
        path: 'comm',
        component: cmp.CommonComponent,
        data: {
          'title': 'Common', 'subtitle': 'Simple widgets',
          'active': false, 'disabled': false, 'breadcrumb': true, order: 20
        }
      },
      {
        path: 'clock',
        component: cmp.AnalogClockComponent,
        data: {
          'title': 'Analog Clock', 'subtitle': 'Clock Demo',
          'active': false, 'disabled': false, 'breadcrumb': true, order: 30
        }
      },
      {
        path: 'icon',
        component: cmp.LoaderIconComponent,
        data: {
          'title': 'Loader Icon', 'subtitle': 'Living Icons',
          'active': false, 'disabled': false, 'breadcrumb': true, order: 40
        }
      },
      {
        path: 'tree',
        component: cmp.TreeviewComponent,
        data: {
          'title': 'Tree View', 'subtitle': 'Tree Demo',
          'active': false, 'disabled': false, 'breadcrumb': true, order: 50
        }
      }
    ]

  },
  {
    path: 'editor',
    component: cmp.EditorDemoComponent,
    data: { 'title': 'Editor Demo', 'subtitle': 'Editor and Grid', 'icon': 'fa-edit', 'breadcrumb': true },
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: cmp.ListEditorComponent,
        data: {
          'title': 'List Elements', 'subtitle': 'Editor Demo', 'active': true, 'disabled': false, 'breadcrumb': true 
        }
      },
      {
        path: 'new',
        component: cmp.NewEditorComponent,
        data: {
          'title': 'Create Element', 'subtitle': 'Editor Demo', 'active': false, 'disabled': false, 'breadcrumb': true 
        }
      },
      {
        path: 'edit/:id',
        component: cmp.EditEditorComponent,
        data: {
          'title': 'Edit Regular Form', 'subtitle': 'Editor Demo', 'active': false, 'disabled': true, 'private': true 
        }
      },
      {
        path: 'edit-autoform/:id',
        component: cmp.EditAutoformEditorComponent,
        data: {
          'title': 'Edit Autoform',
          'subtitle': 'Editor Autoform Demo', 'active': false, 'disabled': true, 'private': true
        }
      },
      {
        path: 'delete/:id',
        component: cmp.DeleteEditorComponent,
        data: {
          'title': 'Delete Element', 'subtitle': 'Editor Demo', 'active': false, 'disabled': true, 'private': true 
        }
      },
      {
        path: '**',
        redirectTo: 'list'
      }
    ]

  },
  // HuD
  {
    path: 'huddashboard',
    component: cmp.HudDashboardComponent,
    data: { 'title': 'HUD Widgets', 'subtitle': 'Head Up Display', 'icon': 'fa-vcard-o', 'breadcrumb': true }
  },
  // standard component paths
  {
    path: 'about',
    component: cmp.SiteAboutComponent,
    data: { 'title': 'About', 'subtitle': 'About this app', 'icon': 'fa-user-circle', 'breadcrumb': true, 'header': 'Info' }
  }
];

