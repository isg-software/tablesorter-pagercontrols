//requires jquery.tablesorter.pager.js
//(c) 2014, Immo Schulz-Gerlach, FeU-Anwendungen, ZMI, FernUni-Hagen.de

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
 
        this.filter("table").each(function() {
            var t = $(this);
            
            var cntLines = $("tbody tr", t).length;
            
			if (cntLines > settings.sizes[0]) { //Es wird vorausgesetzt (s.o.), dass sizes nicht leer und aufsteigend sortiert ist, sizes[0] also definiert und das Minimum des Arrays ist!
				//Füge Table-Pager nur ein, wenn die Zeilenzahl der Tabelle größer als die kleinste Pager-Größe ist (unabhängig von initialSize)!		
	            var id = settings.prefix + idCounter++;
	            var selectId = id+"sel";

				var controls = '<div id="' + id + '" class="tablesorterPagerControls">' +
					'<button type="button" class="first" title="zum Anfang">&lt;&lt;</button>' +
					'<button type="button" class="prev" title="eine Seite zur&uuml;ck">&lt;</button>' +
					'<input type="text" size="15" class="pagedisplay" readonly name="'+id+'pgnr" title="angezeigte Seite/Seitenzahl gesamt (angezeigte Zeilen/Zeilenzahl gesamt)"/>' +
					'<button type="button" class="next" title="eine Seite weiter">&gt;</button>' +
					'<button type="button" class="last" title="zum Ende">&gt;&gt;</button>' +
					'<select class="pagesize" id="'+selectId+'" name="'+selectId+'" title="Anzahl anzuzeigender Tabellenzeilen">';
				for (var i = 0, o = settings.sizes.length; i < o; i++) {
					var size = settings.sizes[i];
					controls += '<option value="' + size + '"';
					if (size === settings.initialSize) {
						controls += ' selected';
					}
					controls += '>' + size + '</option>';
				}
				controls += '<option value="all">Alle</option>' +
					'</select> ' +
					'<label for="'+selectId+'">Zeilen</label></div>';
				
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
