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
    
    	var settings = $.extend({
    		//Defaults
    		sizes: [20, 30, 40, 50, 100], 	//In options kann ein alternatives sizes-Array übergeben werden. Es muss dann nicht-leer und aufsteigend sortiert sein!
    		initialSize: 20,				//In options kann eine andere initialSize (Anfangsgröße) übergeben werden. Der Wert muss in sizes vorkommen!
    		prefix: "tableSorterPager"		//Beginn der IDs und Names von Form-Elementen, jeweils mit Counter-Suffix (beginnend bei 1) und "sel" für 
    										//die Size-Select oder "pgnr" für die aktuelle Seitennr versehen, durchgezählt pro Tabelle.
    										//Eine aufrufende Seite kann diesen Text selbst festlegen, falls sie z.B. Form-Elemente beim Post auswerten möchte, um dann nicht
    										//von einer Plugin-internen Default-Benennung abhängig zu sein.
    	}, options);
 
 		var tooltips = $.fn.appendTablesorterPagerControls.tooltips;
 
        this.filter("table").each(function() {
            var t = $(this);
            
            var cntLines = $("tbody tr", t).length;
            
			if (cntLines > settings.sizes[0]) { //Es wird vorausgesetzt (s.o.), dass sizes nicht leer und aufsteigend sortiert ist, sizes[0] also definiert und das Minimum des Arrays ist!
				//Füge Table-Pager nur ein, wenn die Zeilenzahl der Tabelle größer als die kleinste Pager-Größe ist (unabhängig von initialSize)!		
	            var id = settings.prefix + idCounter++;
	            var selectId = id+"sel";

				var controls = '<div id="' + id + '" class="tablesorterPagerControls">' +
					'<button type="button" class="first" title="' + tooltips.first + '">&lt;&lt;</button>' +
					'<button type="button" class="prev" title="' + tooltips.prev + '">&lt;</button>' +
					'<input type="text" size="15" class="pagedisplay" readonly name="'+id+'pgnr" title="' + tooltips.pagedisplay + '"/>' +
					'<button type="button" class="next" title="' + tooltips.next + '">&gt;</button>' +
					'<button type="button" class="last" title="' + tooltips.last + '">&gt;&gt;</button>' +
					'<select class="pagesize" id="'+selectId+'" name="'+selectId+'" title="' + tooltips.pagesize + '">';
				for (var i = 0, o = settings.sizes.length; i < o; i++) {
					var size = settings.sizes[i];
					controls += '<option value="' + size + '"';
					if (size === settings.initialSize) {
						controls += ' selected';
					}
					controls += '>' + size + '</option>';
				}
				controls += '<option value="all">' + tooltips.all + '</option>' +
					'</select> ' +
					'<label for="'+selectId+'">' + tooltips.rows + '</label></div>';
				
				//Erst die Tabelle in ein DIV einfassen, dann hinter der Tabelle (vor dem </div>)
				//die Controls einfügen.
				//Das Div dient dazu, CSS-Formatierungen wie display:inline-block zu ermöglichen, so dass
				//in diesem inline-block die Controls z.B. rechtsbündung unter dem rechten Tabellenrand 
				//angeordnet werden können.
				t.wrap('<div class="tablesorterPagerWrapper"></div>').after(controls);
				//TODO class "tablesorterPagerWrapper" konfigurierbar machen
				
				t.tablesorterPager({container: $("#" + id),
					size: settings.initialSize,
					offset: 0,
					page: 0,
					cssNext: '.next',
					cssPrev: '.prev',
					cssFirst: '.first',
					cssLast: '.last',
					cssPageDisplay: '.pagedisplay',
					cssPageSize: '.pagesize',
					output: '{page}/{totalPages} ({startRow}-{endRow}/{totalRows})', 
					positionFixed: false}
					//TODO Diese Options (zumindest die ganzen css- und output-Options) in ein Default-Option-Objekt auslagern 
					//und für den Nutzer meines Plugins änderbar gestalten
					//Wenn konfigurierbar, dann natürlich auch unten den Selector im Eventhandler anpassen!
					//Und in der HTML-Erzeugung oben müssten dann auch die Klassenbezeichner aus den Options
					//genommen werden. Aber wozu eigentlich? Eventuell die css-Bezeichner doch hartverdrahten?
					//Aber zumindest in einem zentralen Objekt wären sie doch wartungsfreundlicher – und dann
					//auch überstimmbar…
					
				).on("pageMoved", function(ev, opts) {
					$("#" + id + " button.prev, #" + id + " button.first")
						.prop("disabled", opts.page === 0);
					$("#" + id + " button.next, #" + id + " button.last")
						.prop("disabled", opts.page === opts.totalPages - 1);
				}).trigger("pageMoved", [{page: 0, totalPages: cntLines / settings.initialSize}]);
			}
        });
 
        return this;
 
    };
 
}( jQuery ));
