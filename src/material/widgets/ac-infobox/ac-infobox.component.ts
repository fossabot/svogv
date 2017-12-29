import { Component, Input, OnInit } from '@angular/core';
import { InputConverter, EnumConverter } from '../../../core/utils/convert-inputconverter';
import { AcInfoBoxOptions } from '@svogv/core';
import { Meaning } from '../../../core/utils/enum-colors';

/**
 * The InfoBox is a rectangle area to show dynamic data. It has icon, text, and additional information.
 * 
 * @param icon The name of an Material icon, such as "circle"
 * @param text The text that appears prominently
 * @param number A number that covers the element as the value
 * @param footerText A smaller explanation text at the end
 * @param footerLink A link, suitable for [routerLink] that is being invoked from the footerText
 * @param progressValue A progress Value that creates a progress bar position
 * @param progressText A progress Text that replaces the footerText
 * @param color The background color
 */
@Component({
    selector: 'ac-infobox',
    styles: [
        '.rotate { transform: rotate(45deg); font-size: 125%; }',
        '.text-uppercase { text-transform: uppercase; }',
        '.progress-description { text-align: left; font-size: 75%; }'
    ],
    template: `<mat-card [ngClass]="getColor('card')">
                  <mat-card-header [ngClass]="getColor('bg')">
                    <mat-icon class="rotate">{{ icon }}</mat-icon>
                    <h5 class="text-uppercase">{{ text }}</h5>
                  </mat-card-header>
                  <mat-card-content>
                    <h1 class="display-1">{{ number }}</h1>
                    <mat-progress-bar *ngIf="options.hasProgress" [value]="progressValue" mode="determinate">
                    </mat-progress-bar>
                    <span class="progress-description" *ngIf="options.hasProgress">
                        {{progressText}}
                    </span>
                  </mat-card-content>
                  <mat-card-footer *ngIf="options.hasFooter">
                      <button mat-button [routerLink]="footerLink">{{footerText}}</button>
                  </mat-card-footer>
                </mat-card>`
}) //
export class AcInfoBox implements OnInit {
    @Input() icon: string;
    @Input() text: string;
    @Input() number: string;
    @Input() footerText: string;
    @Input() footerLink: string;
    @Input() progressValue: number;
    @Input() progressText: string;
    @Input()
    @InputConverter(EnumConverter, Meaning) // need EnumConverter, as otherwise metadata returns Number
    color?: Meaning;

    @Input() options: AcInfoBoxOptions;

    constructor() {
        this.color = Meaning.Info;
        this.text = 'Demo';
        this.progressValue = 0;
        this.progressText = '';
        this.footerLink = '/';
        this.footerText = '';
        this.icon = 'user';
    }

    ngOnInit(): void {
        if (!this.options) {
            this.options = new AcInfoBoxOptions();
            this.options.hasFooter = !!this.footerLink || !!this.footerText;
            this.options.hasProgress = !!this.progressValue || !!this.progressText;
        }
    }

    getColor(type: string): string {
        if (this.color) {
            let color: string = (<string>EnumConverter(this.color, Meaning)).toLowerCase();
            return `${type}-${color}`;
        }
    }

}


