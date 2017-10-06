import { Component, Input, OnInit } from '@angular/core';
import { PictureVM } from '../picture/picture.vm';
import { TextVM } from '../text/text.vm';
import { PictureTextViewModel } from './picture-text.vm';

@Component({
	selector: 'ac-picture-text',
	templateUrl: 'picture-text.component.html',
	styleUrls: ['picture-text.component.scss']
})
export class PictureTextComponent implements OnInit {

	@Input() textVM: TextVM;
	@Input() pictureVM: PictureVM;
	@Input() vm: PictureTextViewModel;

	constructor() {
	}

	ngOnInit() {
	}
}
