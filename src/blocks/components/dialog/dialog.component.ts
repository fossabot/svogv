import {Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { State } from '../../../../../store';

import { TranslateService } from 'ng2-translate';
import { UiDialogState } from '../../../../../store/ui/common/ui.common.state';
import { getDialog } from '../../../../../store/ui/ui.selectors';
import { SweetAlertService } from '../../../../services/sweetAlert.service';

import {UiCommonChangeDialog, UiCommonOpenOverlay} from '../../../../../store/ui/common/ui.common.actions';

@Component({
	selector: 'bb-dialog',
	templateUrl: 'dialog.component.html',
	styleUrls: ['dialog.component.scss']
})

/**
 * Create a generic dialog component
 */
export class BBDialogComponent implements OnInit {

	/**
	 * The dialog info observable
	 * @type {"../../Observable".Observable<R>}
	 */
	private dialog$: Observable<UiDialogState> = this.store.select(getDialog);

	/**
	 * Emit the result of the dialog, when it's not an error
	 * @type {EventEmitter<any>}
	 */
	@Output()
	dialogOutput = new EventEmitter<any>();

	/**
	 * Construct the dialog component
	 * @param store
	 * @param sweetAlertService
	 * @param translate
	 */
	constructor(private store: Store<State>,
				private sweetAlertService: SweetAlertService,
				private translate: TranslateService) {
	}

	ngOnInit() {

		/**
		 * Get the Ui Dialog State
		 */
		this.dialog$.subscribe(dialog => {
			/**
			 * Trigger the dialog
			 */
			if ( dialog.open ) {
				this.openDialog(dialog, dialog.service);
			}
		});
	}

	/**
	 * Open the dialog
	 * @param dialogService
	 */
	openDialog (dialogConf: UiDialogState, dialogService: string) {

		// TODO: try to be more service agnostic
		switch (dialogService) {
			// case : 'ourCustomDialogRenderer?'
			// 	break;
			default:
				this.useSweetAlert(dialogConf);
		}
	}

	/**
	 * Handle confirm button, emit an event for it
	 * @param data
	 */
	confirmed (data) {
		this.dialogOutput.emit(data);
		this.store.dispatch(new UiCommonChangeDialog({ open: false }));
	}

	canceled (data) {
		// TODO: hardcoded behavior here, registration component should hold this logic
		this.store.dispatch(new UiCommonOpenOverlay({ alertBeforeCloseOverlay: false }));
		this.dialogOutput.emit(data);
		this.store.dispatch(new UiCommonChangeDialog({ open: false }));
	}

	/**
	 * Render the dialog using the sweet alert service
	 */
	useSweetAlert (conf) {
		this.sweetAlertService.createPrompt({
			text: this.translate.instant(conf.bodyMessage),
			showCancelButton: conf.showCancelButton,
			cancelButtonText: this.translate.instant(conf.buttonConfirm),
			confirmButtonText: this.translate.instant(conf.buttonCancel)
		}).then((data) => {
			this.confirmed(data);
		}).catch(error => {
			// TODO: review the way sweetalert throws errors, it could differ from what we might need
			this.canceled(error);
			console.log('Dialog error: ', error);
		});
	}

}
