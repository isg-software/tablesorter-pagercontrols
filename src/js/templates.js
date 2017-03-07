(function( $ ) {
	"use strict";
	
	$.fn.appendTablesorterPagerControls.templates = {
		/**
		 * Template for full-width controls: Backwards controls on the left,
		 * forwards controls on the right, size selection and display centered in between.
		 * Merge this object with you options object passed to the jQuery plug-in for a single call
		 * or into $.fn.appendTablesorterPagerControls.defaults in order to make this the default template.
		 * Requires CSS file fullwidth.css.
		 */
		fullwidth: {
			controlsOutput: '<div>{first}{prev}</div><div>{display} {size}</div><div>{next}{last}</div>',
			classControls: "tablesorterPagerControls fullwidth"
		},
		/**
		 * Alternative set of button labels using Unicode left or right pointing triangles.
		 * Merge this object with you options object passed to the jQuery plug-in for a single call
		 * or into $.fn.appendTablesorterPagerControls.defaults in order to make this the default template.
		 */
		triangleIcons: {
			labelFirst: '|◀︎',
			labelLast: '▶︎|',
			labelPrev: '◀︎',
			labelNext: '▶︎'
		}
	};
 
}( jQuery ));