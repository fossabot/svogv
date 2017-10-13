import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { DemoTab, DemoTabData } from './index';

/**
 * User Manager, defines the tabs that hold the child-outlets.
 */
@Component({
  moduleId: module.id,
  selector: 'app-widgets',
  templateUrl: './app-widgets.component.html'
})
export class WidgetDemoComponent {

  widgetTabs: DemoTabData;

  constructor(private router: Router) {
    // we use the router as a global configuration point here
    let userRoutes: Array<DemoTab> = new Array<DemoTab>();
    router.config
      .filter((route, idx) => route.path === 'widgets')
      .shift()
      .children
      .filter((route, idx) => !route.redirectTo)
      .forEach(subroute => userRoutes.push(new DemoTab(['/widgets', subroute.path],
                                                     subroute.data['title'],
                                                    !!subroute.data['active'],
                                                    !!subroute.data['disabled'])));
    this.widgetTabs = new DemoTabData(userRoutes);
  }


}
