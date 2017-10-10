import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';

@Component({
	selector: 'ac-dialog',
	templateUrl: 'dialog.component.html',
	styleUrls: ['dialog.component.scss']
})

/**
 * Create a generic dialog component
 */
export class DialogComponent implements OnInit {

	/**
	 * Emit the result of the dialog, when it's not an error
	 * @type {EventEmitter<any>}
	 */
	@Output()
	dialogOutput = new EventEmitter<any>();

	@Input()
	open: boolean;

	/**
	 * Construct the dialog component
	 */
	constructor() {
	}

	ngOnInit() {
		if (this.open) {
			this.openDialog();
		}
	}

	/**
	 * Open the dialog
	 * @param dialogService
	 */
	openDialog(dialogService = '') {

		// TODO: try to be more service agnostic
		switch (dialogService) {
			case 'customDialogRenderer':
				break;
		}
	}

	/**
	 * Handle confirm button, emit an event for it
	 * @param data
	 */
	confirmed(data: any) {
		this.dialogOutput.emit(data);
	}

	canceled(data: any) {
		this.dialogOutput.emit(data);
	}


}
