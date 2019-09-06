(function( $ ) {
	"use strict";
	
	/**
	 * Default options.
	 */
	$.fn.appendTablesorterPagerControls.defaults = {
			/**
			 * The table sizes (number of visible rows) selectable by the user. 
			 * Array of numbers, must be sorted (ascending) and not empty.
			 */
			sizes: [20, 30, 40, 50, 100],
			/**
			 * Initial table size.
			 * This must be a single element (number) of the sizes array to be preselected 
			 * when loading the page / applying the plug-ing.
			 */
			initialSize: 20,
			/**
			 * Prefix string used for generated element IDs.
			 * The ID for the DIV element holding the pager controls will consist of this prefix plus a number.
			 * Form elements within that DIV will get an ID starting identically, but with a further suffix:
			 * "sel" for the table size select box and "pgnr" for the input with the page number display.
			 */
			prefix: "tableSorterPager",
			/**
			 * Pattern for the arrangement of the control elements. 
			 * {first}, {prev}, {next}, and {last} are placeholders for the navigation buttons,
			 * {size} will be replaced with the select box for selecting the number of visible rows,
			 * {display} stands for the status display as formatted with the output option.
			 */
			controlsOutput: '{first}{prev}{display}{next}{last}{size}',
			/**
			 * This output option is passed directly to the tablesorter pager plug-in. 
			 * Defines the pattern of information to be displayed in the page display.
			 * (For details see the pager documentation.)
			 * Please note, that if you change this pattern, it's recommended to also change the
			 * corresponding tooltip text (see language-specific files).
			 */
			output: '{page}/{totalPages} ({startRow}-{endRow}/{totalRows})',
			/**
			 * second output pattern only used when the 'filter' widget is applied to the table and the user
			 * entered a filter, i.e. the table does not show all rows.
			 * If null, the output pattern will not change for filtered tables. But you may use this option
			 * to define a separate output pattern containing the {filteredRows} or {filteredPages} placeholders.
			 */
			outputFiltered: null,
			/**
			 * Size (width) for the input holding the page display. You may change this option 
			 * corresponding to the output option.
			 * Or set to 0 or null in order to disable the input field completely and render the display
			 * as styleable text (in a span field).
			 */
			pagedisplayInputSize: null,
			/**
			 * CSS class for the 'next page' button, defaults to 'next'.
			 */
			classNext: "next",
			/**
			 * CSS class for the 'previous page' button, defaults to 'prev'.
			 */
			classPrev: "prev",
			/**
			 * CSS class for the 'first page' button, defaults to 'first'.
			 */
			classFirst: "first",
			/**
			 * CSS class for the 'last page' button, defaults to 'last'.
			 */
			classLast: "last",
			/**
			 * CSS class for the span or input for displaying the current page, page count etc. (see output option for formatting this display).
			 * Defaults to 'pagedisplay'.
			 * NOTE: If you change this value, the included CSS files will not work completely, but will have to be adapted to the new class name.
			 */
			classPagedisplay: "pagedisplay",
			/**
			 * CSS class for the page size selection (select element, defaults to 'pagesize').
			 */
			classPagesize: "pagesize",
			/**
			 * CSS class for a div element wrapped around the table and its pager controls. 
			 * Defaults to 'tablesorterPagerWrapper'.
			 * May also be space-separated list of class names like in any class attribute of an HTML element.
			 */
			classWrapper: "tablesorterPagerWrapper",
			/**
			 * CSS class for a div element wrapped around the table and its pager controls within the
			 * wrapper of class 'classWrapper'. Defaults to null, in which case no inner wrapper is added.
			 * If non-null, the table and its conrols will be wrapped doubly like:
			 * <div class='classWrapper'><div class='classInnerWrapper'><table>...</table><div class='classControls'>...</div></div></div>.
			 * By default, this inner div won't be added, but it can be used for some CSS tricks: So the outer wrapper
			 * may be displayed as a block while the inner's display style may be set to 'inline-block' which
			 * allows for example to align the controls to the right with the table even if the table is not full-width.
			 * May also be space-separated list of class names like in any class attribute of an HTML element.
			 */
			classInnerWrapper: null,
			/**
			 * CSS class for a div element containing the table pager controls (inserted below the table). 
			 * Defaults to 'tablesorterPagerControls'.
			 * NOTE: If you change this value, the included CSS files will not work completely, but will have to be adapted to the new class name.
			 */
			classControls: "tablesorterPagerControls",
			/**
			 * button label for the 'first page' button.
			 */
			labelFirst: "&lt;&lt;",
			/**
			 * button label for the 'previous page' button.
			 */
			labelPrev: "&lt;",
			/**
			 * button label for the 'next page' button.
			 */
			labelNext: "&gt;",
			/**
			 * button label for the 'last page' button.
			 */
			labelLast: "&gt;&gt;"
	};
 
}( jQuery ));
