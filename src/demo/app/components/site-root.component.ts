import { Component, OnInit } from '@angular/core';
// private
import { ActivatedRoute, Router } from '@angular/router';
import { SiteApiService, EmitterService } from '../services/index';
import { DemoMenu, DemoMenuItem, DemoMenuHeaderItem, DemoMenuLinkItem } from './ui/demo-menu/models/index';

interface AppState {
  counter: number;
}

@Component({
  
  selector: 'site-root',
  templateUrl: './site-root.component.html'
})
export class SiteRootComponent implements OnInit {
  user: string;
  currentRoute: { [key: string]: any };
  dynamicMenu: DemoMenu;
  currentYear: string;

  constructor(public apiService: SiteApiService, private route: ActivatedRoute, private router: Router) {
    // default on boot
    this.currentRoute = {
      'title': 'Dashboard', 'subtitle': 'SVOGV Demo'
    };
    // subscribe to router to change title
    this.route.data.subscribe(data => {
      console.log(`SUBSCRIBE Route ${data} ${data['title']}`);
      this.currentRoute = data;
    });
    this.currentYear = new Date().getFullYear().toString();
    this.user = 'Fake User';
  }

  private loadData(): void {
    // create menu, this might be come from the server to handle rights & roles
    // the menu is forwarded to the sideMenu component through binding
    // we use the router as a global configuration point here
    let menuitems: Array<DemoMenuItem> = new Array<DemoMenuItem>();
    menuitems.push(new DemoMenuHeaderItem('Tasks'));
    this.router.config
      .filter(route => route.data)
      .forEach(route => {
        if (route.data && route.data['header']) {
          menuitems.push(new DemoMenuHeaderItem(route.data['header']));
        }
        menuitems.push(new DemoMenuLinkItem(route.data['title'], [route.path], route.data['icon']));
      });
    this.dynamicMenu = new DemoMenu(...menuitems);
    // get dashboard data on load and distribute to all listening components
    this.apiService.getUsers().subscribe(data => {
      EmitterService.get('BROADCAST_Users').emit(data);
    });
  }

  ngOnInit() {
    this.loadData();
  }

}
