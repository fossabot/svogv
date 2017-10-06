import { Component, Input, OnInit } from '@angular/core';
import { PictureVM } from './picture.vm';

@Component({
	selector: 'ac-picture',
	templateUrl: 'picture.component.html',
	styleUrls: ['picture.component.scss'],
})
export class PictureComponent implements OnInit {

	@Input() vm: PictureVM;

	ngOnInit() {
	}
}
