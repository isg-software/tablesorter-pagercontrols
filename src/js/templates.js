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
		 * Note: This template has been updated in Version 1.6.0 to use exactly the same Labels for First and Last
		 * resp. Prev and Next and using CSS to flip the First and Prev button's labels horizontally via CSS.
		 * The reason for this decision is that the previous solution (using the unicode character ◀︎ as left-pointing
		 * counterpart for the right-pointing ▶︎) did often result in differently sized buttons, since both symbols
		 * seemed to be rendered in different sizes depending on font face, browser or platform (not quite shure why).
		 * This solution renders the same character for all buttons and simply flips it around for half of the buttons,
		 * which should now create equally sized buttons with exactly mirrored icons on them.
		 * Keep in mind, that this CSS transformation is only available for seeing users, but Version 1.6.0 also 
		 * introduced aria-label attributes for the buttons in order for screen readers not to read these arrow symbol labels,
		 * but the alternative aria-label. Still: If users should opt to disable CSS, they will see right-pointing arrows
		 * on all buttons, but at least the Button titles are correct.
		 * Still: If you should encounter problems with this solution and want to revert to the previous version of the
		 * template, it's still available under the name "triangeIconsOld"
		 */
		triangleIcons: {
			labelFirst: '▶︎|',
			labelLast: '▶︎|',
			labelPrev: '▶︎',
			labelNext: '▶︎',
			buttonLabelClass: 'flipLeft'
		},
		/**
		 * Older version of the "triangleIcons" template, see above.
		 */
		triangleIconsOld: {
			labelFirst: '|◀︎',
			labelLast: '▶︎|',
			labelPrev: '◀︎',
			labelNext: '▶︎'
		},
		/**
		 * Wraps the table into a DIV of class 'scroll'. The included 'scrolling.css' is loaded,
		 * this will result in the addition of a horizontal scrollbar for the table in case it should
		 * be too wide for the viewport. (While normally the whole page would get wider and horizontally scrollable,
		 * now the page keeps its normal width and the table scrolls inside the page. The pager controls
		 * added beneath the table won't scroll with it but will always stay in viewport.)
		 * If the table fits the page width, this won't change anything.
		 * Requires CSS file scrolling.css to work.
		 */
		scrolling: {
			classTableWrapper: "tablesorterPagerScrollWrapper"
		}
	};
 
}( jQuery ));