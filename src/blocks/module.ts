import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

/*tslint:disable-next-line*/
import { DataSetModule } from './components/data-set/data-set.module';

// Components
import {
	  AccordionComponent
	, AccordionItemComponent
	, ButtonComponent
	, CtaComponent
	, DescriptionItemComponent
	, DialogComponent
	, FlyOutItemComponent
	, FlyOutComponent
	, IconComponent
	, LinkComponent
	, ListFooterComponent
	, ListHeaderComponent
	, ListItemComponent
	, ListViewComponent
	, OrderWidgetComponent
	, PictureTextComponent
	, PictureComponent
	, PillComponent
	, PreloaderComponent
	, TabsComponent
	, TextComponent
	, UiSwitchComponent
} from './components/index';

import { LinksToRouterDirective, TooltipDirective, ShowAtDirective } from './directives/index';

// Services
import { WindowSizeService } from './services/window-size.service';

// Pipes
import { ArrayToStringConverter
	, CalculateThreshold
	, OrderBy
	, ReverseOrderPipe
	, ShowNumberOfChars } from './pipes/index';

@NgModule({
	imports: [
		RouterModule,
		CommonModule,
		BrowserModule,
		FormsModule,
		// Module
		ReactiveFormsModule,
  	HttpModule,
		DataSetModule
	],
	declarations: [
		// Components
		CtaComponent,
		PictureComponent,
		PictureTextComponent,
		TextComponent,
		IconComponent,
		ListViewComponent,
		ListItemComponent,
		ListFooterComponent,
		ListHeaderComponent,
		OrderWidgetComponent,
		LinkComponent,
		UiSwitchComponent,
		FlyOutComponent,
		FlyOutItemComponent,
		DescriptionItemComponent,
		ButtonComponent,
		PillComponent,
		TabsComponent,
		AccordionComponent,
		AccordionItemComponent,
		// Directives & Pipes
		ReverseOrderPipe,
		OrderBy,
		ArrayToStringConverter,
		CalculateThreshold,
		TooltipDirective,
		ShowAtDirective,
		ShowNumberOfChars,
		LinksToRouterDirective,
		PreloaderComponent,
		DialogComponent
	],
	entryComponents: [
		DialogComponent
	],
	providers: [
		WindowSizeService
	],
	exports: [
		// Components
		CtaComponent,
		PictureComponent,
		PictureTextComponent,
		TextComponent,
		IconComponent,
		FlyOutComponent,
		FlyOutItemComponent,
		ListViewComponent,
		ListItemComponent,
		ListFooterComponent,
		ListHeaderComponent,
		OrderWidgetComponent,
		OrderWidgetComponent,
		ButtonComponent,
		PillComponent,
		LinkComponent,
		TabsComponent,
		UiSwitchComponent,
		DescriptionItemComponent,
		AccordionComponent,
		AccordionItemComponent,
		// Directives & Pipes
		ReverseOrderPipe,
		OrderBy,
		ArrayToStringConverter,
		CalculateThreshold,
		TooltipDirective,
		ShowAtDirective,
		ShowNumberOfChars,
		LinksToRouterDirective,
		DataSetModule,
		PreloaderComponent,
		DialogComponent
	]
})
export class BlocksModule {

	constructor() {
	}
}
