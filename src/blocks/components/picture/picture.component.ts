import { Component, Input, OnInit } from '@angular/core';
import { PictureViewModel } from './picture.vm';

/**
 * A styled picture.
 */
@Component({
	selector: 'ac-picture',
	templateUrl: 'picture.component.html',
	styleUrls: ['picture.component.scss'],
})
export class PictureComponent implements OnInit {

	@Input() vm: PictureViewModel;

	ngOnInit() {
	}
}
