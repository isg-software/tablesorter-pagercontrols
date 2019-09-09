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
 
	$.fn.appendTablesorterPagerControls = function() {
	
		var settings = $.extend({}, $.fn.appendTablesorterPagerControls.defaults);
		var tooltips = $.extend({}, $.fn.appendTablesorterPagerControls.tooltips);
		for (var i = 0; i < arguments.length; i++) {
			var args = arguments[i];
			$.extend(settings, args);
			if (args.tooltips) {
				$.extend(tooltips, args.tooltips);
			}
		}
		
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
			var t = $(this); //table
			
			var cntLines = $("tbody tr", t).length;
			if (!Array.isArray(settings.sizes)) {
				throw "option 'sizes' must be an array!";
			} else if (settings.sizes.length === 0) {
				throw "array 'sizes' must not be empty!";
			}
			
			var wt = t; //optionally wrapped table (div of classTableWrapper containing the table, or t itself if classTW is null)
			if (typeof settings.classTableWrapper === 'string') {
				t.wrap('<div class="' + settings.classTableWrapper + '"></div>');
				wt = t.parent();
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
				wt.wrap('<div class="' + settings.classWrapper + '"></div>');
				if (typeof settings.classInnerWrapper === 'string') {
					wt.wrap('<div class="' + settings.classInnerWrapper + '"></div>');
				}
				
				wt.after(controls);
				
				var container = $("#" + id);
				t.on("pagerComplete", function(ev, opts) {
					var pageCnt = typeof opts.filteredPages === 'number' ? opts.filteredPages : opts.totalPages;
					$("#" + id + " button." + settings.classPrev + ", #" + id + " button." + settings.classFirst)
						.prop("disabled", opts.page === 0);
					$("#" + id + " button." + settings.classNext + ", #" + id + " button." + settings.classLast)
						.prop("disabled", opts.page >= pageCnt - 1);
						//use >= instead of ===
						//reason: if table is empty (e.g. filtered), pageCnt may be 0, pageCnt-1 thus negative, while opts.page is 0 (greater -1)!
				}).tablesorterPager({
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
				});
			}
		});
 
		return this;
 
	};
 
}( jQuery ));
