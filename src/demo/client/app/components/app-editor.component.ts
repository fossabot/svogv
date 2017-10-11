import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { DemoTab, DemoTabData } from './index';

/**
 * User Manager, defines the tabs that hold the child-outlets.
 */
@Component({
  moduleId: module.id,
  selector: 'app-editor',
  templateUrl: './app-editor.component.html'
})
export class EditorDemoComponent {

  editorTabs: DemoTabData;

  constructor(private router: Router) {
    // we use the router as a global configuration point here
    let userRoutes: Array<DemoTab> = new Array<DemoTab>();
    router.config
      .filter((route, idx) => route.path === 'editor')
      .shift()
      .children
      .filter((route, idx) => !route.redirectTo)
      .filter((route, idx) => !route.data['private'])
      .forEach(subroute => userRoutes.push(new DemoTab(['/editor', subroute.path],
        subroute.data['title'],
        !!subroute.data['active'],
        !!subroute.data['disabled'])));

    this.editorTabs = new DemoTabData(userRoutes);
  }


}
