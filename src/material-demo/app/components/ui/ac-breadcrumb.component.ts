﻿import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, Params, PRIMARY_OUTLET } from '@angular/router';
import 'rxjs/add/operator/filter';

export interface IBreadcrumb {
    label: string;
    params: Params;
    url: string;
}

@Component({
    selector: 'ac-breadcrumb',
    template: `<mat-card>
                 <mat-card-content>
                 <a routerLink=""><mat-icon>{{ icon}} </mat-icon> {{ home }}</a>
                 <ng-container *ngFor="let breadcrumb of breadcrumbs; let lastItem=last">
                    <a [routerLink]="[breadcrumb.url, breadcrumb.params]">{{ breadcrumb.label }}</a>
                    <span *ngIf="!lastItem">&nbsp;/&nbsp;</span>
                 </ng-container>
                 </mat-card-content>
               </mat-card>`,
    styles: ['mat-card { width: 100%; }', 'mat-card a { text-decoration: none;}']
})
export class AcBreadCrumbComponent implements OnInit {
    @Input() icon: string;
    @Input() home: string;

    public breadcrumbs: Array<IBreadcrumb>;

    constructor(private activatedRoute: ActivatedRoute, private router: Router) {
        this.home = 'Home';
        this.icon = 'dashboard';
        this.breadcrumbs = new Array<IBreadcrumb>();
    }

    ngOnInit() {
        // put data: { "breadcrumb": true, "subtitle": "Sub Route Name" } in the router config for those items that shall appear in the breadcrumb 
        const ROUTE_DATA_BREADCRUMB = 'breadcrumb';
        const ROUTE_DATA_SUBTITLE = 'subtitle';

        // subscribe to the NavigationEnd event
        this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
            // reset breadcrumbs
            this.breadcrumbs = new Array<IBreadcrumb>();

            // get the root route
            let currentRoute: ActivatedRoute = this.activatedRoute.root;

            // set the url to an empty string
            let url = '';

            // iterate from activated route to children
            while (currentRoute.children.length > 0) {
                let childrenRoutes: ActivatedRoute[] = currentRoute.children;

                // iterate over each children
                childrenRoutes.forEach(route => {
                    // set currentRoute to this route
                    currentRoute = route;

                    // verify this is the primary route
                    if (route.outlet !== PRIMARY_OUTLET) {
                        return;
                    }

                    // verify the custom data property "breadcrumb" is specified on the route
                    if (!route.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
                        return;
                    }

                    // get the route's URL segment
                    let routeURL: string = route.snapshot.url.map(segment => segment.path).join("/");

                    // append route URL to URL
                    url += `/${routeURL}`;

                    // add breadcrumb
                    let breadcrumb: IBreadcrumb = {
                        label: route.snapshot.data[ROUTE_DATA_SUBTITLE],
                        params: route.snapshot.params,
                        url: url
                    };
                    this.breadcrumbs.push(breadcrumb);
                });
            }
        });
    }

}

