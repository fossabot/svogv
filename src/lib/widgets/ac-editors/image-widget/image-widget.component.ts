import { Component, ElementRef, HostBinding, OnInit, ViewChild } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { WidgetErrorMessages } from '../../../shared/models/widget-error-messages.m';
import { WidgetFieldProperties } from '../../../shared/models/widget-field-properties.m';
import { WidgetUiOptions } from '../../../shared/models/widget-ui-options.m';

@Component({
	selector: 'app-image-widget',
	templateUrl: 'image-widget.component.html',
	styleUrls: ['image-widget.component.scss']
})
export class ImageWidgetComponent implements OnInit {
	/**
	 * Passed props which will be added by widget-selector.component.
	 * Important note: You can not use the props in the constructor() function.
	 */
	public props: WidgetFieldProperties;

	/**
	 * Abstract Control
	 * The value will be assigned by using props.formControl
	 */
	public formControl: AbstractControl;

	/**
	 * UI options which you can update by using props.ui (UISchema).
	 */
	public ui: WidgetUiOptions;

	/**
	 * Standard error message object which can be easily used to set custom error message.
	 */
	private errorMessages: WidgetErrorMessages;

	/**
	 * Error message which will be displayed.
	 */
	public errorMessage: string;

	/**
	 * Show inline error message by using UISchema.
	 */
	public showErrorMessage: boolean;

	/**
	 * Fallback Image
	 */
	public fallbackImage: string;

	/**
	 * Image
	 */
	public image: string;

	/**
	 * Preview Image
	 */
	public previewImage: string;

	/**
	 * Input
	 */
	public inputHidden = true;

	/**
	 * Add widget classes via host binding by using props.ui['ui:classes']
	 */
	@HostBinding('class') widgetClasses = '';

	/**
	 * Reference to generic list wrapper element
	 */
	@ViewChild('fileInput') fileInput: ElementRef;

	/**
	 * Initialize component and set default values
	 */
	ngOnInit() {
		this.errorMessages = {
			required: `Das Feld ${this.props.title} ist erforderlich.`
		};
		this.previewImage = this.props.formData.value || '';
		this.formControl = this.props.formControl;
		this.ui = this.props.ui;
		this.widgetClasses = this.ui['ui:classes'] || '';
		this.fallbackImage = this.ui['ui:options'] !== undefined ? this.ui['ui:options']['fallback-image'] : '';
		this.showErrorMessage = this.ui['ui:inline-errors'] || false;

		this.setValue();
		this.subscribes();
	}

	/**
	 * Subscribe to current formControl value change
	 */
	subscribes(): void {
		this.formControl.valueChanges.subscribe(value => {
				this.setPreviewImage(value);
				this.setErrorMessage(this.formControl);
			}
		);
	}

	/**
	 * Set value by using formControl
	 */
	setValue(): void {
		if (this.props.formData.value) {
			this.formControl.setValue(this.props.formData.value);
		}
	}

	/**
	 * Generic error message setter function
	 *
	 * @param {AbstractControl} control - Check current control
	 */
	setErrorMessage(control: AbstractControl): void {
		this.errorMessage = '';

		if ((control.touched || control.dirty) && control.errors) {
			this.errorMessage = Object.keys(control.errors).map((errorMsg) => {
				return this.errorMessages[errorMsg];
			}).join(' ');
		}
	}

	/**
	 * Custom Methods
	 */

	/**
	 * Handles the file upload
	 */
	handleFileUpload(): void {
		const reader = new FileReader();
		const file = this.fileInput.nativeElement.files[0];

		reader.addEventListener('load', () => {
			this.setPreviewImage(reader.result);
			this.props.formData.value = reader.result;
		}, false);

		if (file) {
			reader.readAsDataURL(file);
		}
	}

	/**
	 * Set preview image
	 *
	 * @param {string} image - the url for the preview image
	 */
	setPreviewImage(image: string): void {
		this.previewImage = image;
	}

	/**
	 * Delete image
	 */
	deleteImage(): void {
		this.previewImage = '';
		this.formControl.setValue('');
	}

	/**
	 * Show preview image
	 */
	showPreviewImage(): void {
		this.inputHidden = true;
	}

	/**
	 * Show upload input
	 */
	showUpload(): void {
		this.inputHidden = false;
	}
}
