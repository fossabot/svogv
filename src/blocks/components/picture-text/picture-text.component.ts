import { Component, Input, OnInit } from '@angular/core';
import { PictureViewModel } from '../picture/picture.vm';
import { TextViewModel } from '../text/text.vm';
import { PictureTextViewModel } from './picture-text.vm';

/**
 * A picture with text that consists of three parts, h1, h2, and paragraph.
 */
@Component({
	selector: 'ac-picture-text',
	templateUrl: 'picture-text.component.html',
	styleUrls: ['picture-text.component.scss']
})
export class PictureTextComponent implements OnInit {

	@Input() textVM: TextViewModel;
	@Input() pictureVM: PictureViewModel;
	@Input() vm: PictureTextViewModel;

	constructor() {
	}

	ngOnInit() {
	}
}
