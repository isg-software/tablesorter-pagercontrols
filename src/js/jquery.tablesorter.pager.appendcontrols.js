/**
 * @license 
 * Copyright (c) 2017, Immo Schulz-Gerlach, www.isg-software.de 
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification, are 
 * permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this list of
 * conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice, this list
 * of conditions and the following disclaimer in the documentation and/or other materials
 * provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT 
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, 
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED 
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; 
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN 
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY
 * WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function( $ ) {
	"use strict";
 
	var idCounter = 1;
 
	$.fn.appendTablesorterPagerControls = function( options ) {
	
		var settings = $.extend({}, $.fn.appendTablesorterPagerControls.defaults, options);
		var tooltips = options ? $.extend({}, $.fn.appendTablesorterPagerControls.tooltips, options.tooltips) : $.fn.appendTablesorterPagerControls.tooltips;
		
		var btnFirst = '<button type="button" class="' + settings.classFirst + '" title="' + tooltips.first + '">' + settings.labelFirst + '</button>';
		var btnPrev  = '<button type="button" class="' + settings.classPrev + '" title="' + tooltips.prev + '">' + settings.labelPrev + '</button>';
		var btnNext  = '<button type="button" class="' + settings.classNext + '" title="' + tooltips.next + '">' + settings.labelNext + '</button>';
		var btnLast  = '<button type="button" class="' + settings.classLast + '" title="' + tooltips.last + '">' + settings.labelLast + '</button>';

		var display = function(id) {
			var displayCommonAttribs = ' class="' + settings.classPagedisplay + '" id="' + id + '" title="' + tooltips.pagedisplay + '"';
			if (settings.outputFiltered) {
				displayCommonAttribs += ' data-pager-output-filtered="' + settings.outputFiltered + '"';
			}		
			return typeof settings.pagedisplayInputSize === 'number' && settings.pagedisplayInputSize > 0 ?
					'<input type="text" size="' + settings.pagedisplayInputSize+ '" readonly name="'+id+'pgnr"' + displayCommonAttribs + '/>'
					: '<span ' + displayCommonAttribs + '></span>';
		};
		
		var sizeSelect = function(id) {
			var selectId = id+"sel";
			var s = '<select class="' + settings.classPagesize + '" id="'+selectId+'" name="'+selectId+'" title="' + tooltips.pagesize + '">';
			for (var i = 0, o = settings.sizes.length; i < o; i++) {
				var size = settings.sizes[i];
				s += '<option value="' + size + '"';
				if (size === settings.initialSize) {
					s += ' selected';
				}
				s += '>' + size + '</option>';
			}
			s += '<option value="all">' + tooltips.all + '</option>' +
				'</select> ' + 
				'<label for="'+selectId+'">' + tooltips.rows + '</label>';
			return s;
		};
 
		this.filter("table").each(function() {
			var t = $(this);
			
			var cntLines = $("tbody tr", t).length;
			if (!Array.isArray(settings.sizes)) {
				throw "option 'sizes' must be an array!";
			} else if (settings.sizes.length === 0) {
				throw "array 'sizes' must not be empty!";
			}

			//Precondition: sizes is not emtpy and is sorted ascending, i.e. settings.sizes[0] is defined and minimal.
			//Only insert table pager if the table has more rows than this minimal pager size:
			if (cntLines > settings.sizes[0]) {
				var id = settings.prefix + idCounter++;

				var controls = '<div id="' + id + '" class="' + settings.classControls + '">' +
					settings.controlsOutput
						.replace('{first}', btnFirst)
						.replace('{prev}', btnPrev)
						.replace('{next}', btnNext)
						.replace('{last}', btnLast)
						.replace('{display}', display(id))
						.replace('{size}', sizeSelect(id)) +
					'</div>';
				
				//Erst die Tabelle in ein DIV einfassen, dann hinter der Tabelle (vor dem </div>)
				//die Controls einfügen.
				//Das Div dient dazu, CSS-Formatierungen wie display:inline-block zu ermöglichen, so dass
				//in diesem inline-block die Controls z.B. rechtsbündung unter dem rechten Tabellenrand 
				//angeordnet werden können.
				t.wrap('<div class="' + settings.classWrapper + '"></div>').after(controls);
				
				var container = $("#" + id);
				t.tablesorterPager({
					container: container,
					size: settings.initialSize,
					offset: 0,
					page: 0,
					cssNext: '.' + settings.classNext,
					cssPrev: '.' + settings.classPrev,
					cssFirst: '.' + settings.classFirst,
					cssLast: '.' + settings.classLast,
					cssPageDisplay: '.' + settings.classPagedisplay,
					cssPageSize: '.' + settings.classPagesize,
					output: settings.output, 
					positionFixed: false
				}).on("pagerComplete", function(ev, opts) {
					var pageCnt = typeof opts.filteredPages === 'number' ? opts.filteredPages : opts.totalPages;
					$("#" + id + " button." + settings.classPrev + ", #" + id + " button." + settings.classFirst)
						.prop("disabled", opts.page === 0);
					$("#" + id + " button." + settings.classNext + ", #" + id + " button." + settings.classLast)
						.prop("disabled", opts.page >= pageCnt - 1);
						//use >= instead of ===
						//reason: if table is empty (e.g. filtered), pageCnt may be 0, pageCnt-1 thus negative, while opts.page is 0 (greater -1)!
				}).trigger("pagerComplete", [{page: 0, totalPages: cntLines / settings.initialSize}]);
			}
		});
 
		return this;
 
	};
	
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
