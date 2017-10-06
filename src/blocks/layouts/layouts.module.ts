import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FilteringPanelComponent } from './filtering-panel.component';
import { MainPanelComponent } from './main-panel.component';
import { PanelWrapperComponent } from './panel-wrapper.component';
import { SidePanelComponent } from './side-panel.component';


@NgModule({
	declarations: [
		FilteringPanelComponent,
		MainPanelComponent,
		PanelWrapperComponent,
		SidePanelComponent
	],
	imports: [
		CommonModule,
	],
	exports: [
		FilteringPanelComponent,
		MainPanelComponent,
		PanelWrapperComponent,
		SidePanelComponent
	],
	providers: []
})
export class LayoutsModule {}
