/**
 * Created by sven.friedemann on 26.06.17.
 */


export interface TextVM {
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