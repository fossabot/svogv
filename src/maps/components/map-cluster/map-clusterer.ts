
declare const MarkerClusterer: any;
declare const ClusterIcon: any;


ClusterIcon.prototype.setSums = function(sums) {
	this.sums_ = sums;
	this.text_ = sums.text;
	this.index_ = sums.index;

	if (sums.text > 9) {
		sums.text = '9+';
	}

	if (this.div_) {
		this.div_.innerHTML = sums.text;
	}

	this.useStyle();
};

export const MapMarkerClusterer = MarkerClusterer;