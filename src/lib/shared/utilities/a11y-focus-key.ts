/**
 * Adds/removes class for keyboard introduced focus.
 *
 * @module A11yFocusKey
 * @version v1.0.0
 *
 * @author Andy Gutsche
 * @author Sebastian Fitzner
 */

// Global dependencies
class A11yFocusKey {
	_isTabKeyPressed: boolean;
	options = {
		focusClass: 'a11y-focus-key'
	};

	/**
	 * Constructor for our class
	 *
	 */
	constructor() {

		this.initialize();
	}


	/**
	 * Getter for isTabKeyPressed
	 *
	 */
	get isTabKeyPressed() {
		return this._isTabKeyPressed;
	}


	/**
	 * Setter for isTabKeyPressed
	 *
	 */
	set isTabKeyPressed(bool) {
		this._isTabKeyPressed = bool;
	}


	/**
	 * Initialize the view
	 *
	 */
	initialize() {
		this.bindEvents();
	}


	/**
	 * Bind events
	 *
	 */
	bindEvents() {

		// Global events

		document.addEventListener('keydown', (e) => {
			this.isTabKeyPressed = (e.key === 'Tab' || e.keyCode === 9);

		}, false);

		document.addEventListener('focus', this.onFocus.bind(this), true);
		document.addEventListener('blur', this.onBlur.bind(this), true);
	}


	/**
	 * Focus handler
	 *
	 * @param {Object} e - event object
	 */
	onFocus(e) {

		if (!this.isTabKeyPressed) {
			return;
		}

		this.isTabKeyPressed = false;

		const target = e.target;

		target.classList.add(this.options.focusClass);
	}


	/**
	 * Focus handler
	 *
	 * @param {Object} e - event object
	 */
	onBlur(e) {
		const target = e.target;

		if (target.classList.contains(this.options.focusClass)) {
			target.classList.remove(this.options.focusClass);
		}
	}
}

export default A11yFocusKey;
