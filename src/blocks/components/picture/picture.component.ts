import { Component, Input, OnInit } from '@angular/core';
import { PictureVM } from './picture.vm';

@Component({
	selector: 'bb-picture',
	templateUrl: 'picture.component.html',
	styleUrls: ['picture.component.scss'],
})
export class BBPictureComponent implements OnInit {

	@Input() vm: PictureVM;

	ngOnInit() {
	}
}
