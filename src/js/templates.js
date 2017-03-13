(function( $ ) {
	"use strict";
	
	var fullwidth = {
		controlsOutput: '<div>{first}{prev}</div><div>{display} {size}</div><div>{next}{last}</div>',
		classControls: "tablesorterPagerControls fullwidth"
	};
	
	$.fn.appendTablesorterPagerControls.templates = {
		/**
		 * Template for full-width controls: Backwards controls on the left,
		 * forwards controls on the right, size selection and display centered in between.
		 * Merge this object with you options object passed to the jQuery plug-in for a single call
		 * or into $.fn.appendTablesorterPagerControls.defaults in order to make this the default template.
		 * Your tables themselves should always be full width (100% width), otherwise the right buttons
		 * won't be aligned with the right side of the table! (See also: tablewidth template for smaller tables)
		 * Requires CSS file fullwidth.css.
		 */
		fullwidth: fullwidth,
		/**
		 * Template similar to 'fullwidth' but made for tables not horizontally spanning the whole block.
		 * With this template, the table and its pager controls are wrapped into two wrapper DIVs.
		 * The corresponding CSS file tablewidth.css then assings the style 'display: inline-block' to the
		 * inner wrapper, which causes the table to only use minimum width and the controls to be correctly
		 * aligned with the table.
		 * The outer div stays a block element by default such that content before and after the table
		 * is correctly positioned in separate blocks and not in one line with the table.
		 * Optionally, you might set the text-align style for the outer wrapper DIV in order to e.g.
		 * center the table
		 */
		tablewidth: $.extend( {
			classInnerWrapper: "tablewidthInnerWrapper"
		}, fullwidth),
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