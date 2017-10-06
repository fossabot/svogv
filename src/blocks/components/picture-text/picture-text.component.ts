import { Component, Input, OnInit } from '@angular/core';
import { PictureVM } from '../picture/picture.vm';
import { TextVM } from '../text/text.vm';
import { PictureTextVM } from './picture-text.vm';

@Component({
	selector: 'bb-picture-text',
	templateUrl: 'picture-text.component.html',
	styleUrls: ['picture-text.component.scss']
})
export class BBPictureTextComponent implements OnInit {

	@Input() textVM: TextVM;
	@Input() pictureVM: PictureVM;
	@Input() vm: PictureTextVM;

	constructor() {
	}

	ngOnInit() {
	}
}
