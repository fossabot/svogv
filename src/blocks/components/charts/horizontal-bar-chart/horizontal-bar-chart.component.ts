import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'ac-horizontal-bar-chart',
	templateUrl: 'horizontal-bar-chart.component.html',
	styleUrls: ['horizontal-bar-chart.component.scss']
})
export class BBHorizontalBarChartComponent implements OnInit {
	@Input() percentageAmount = 0;
	@Input() maxValueReference = 0;
	@Input() filterType: string;

	constructor() {
	}

	ngOnInit() {
	}

}
