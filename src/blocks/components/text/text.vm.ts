export interface TextViewModel {
	settings: {
		headlineClasses?: string;
		subheadlineClasses?: string;
		copyClasses?: string
	};

	content: {
		headline?: string;
		subheadline?: string;
		copy?: string;
	};
}