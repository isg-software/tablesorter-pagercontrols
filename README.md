# tablesorter-pagercontrols

This jQuery plug-in is an add-on for [mottie's tablesorter plug-in][tablesorter], more explicitly its pager add-on. It programmatically adds pager controls below a table and applies the pager add-on for large HTML tables, so that you don't have to insert the controls to the HTML manually any more.

[Project Home Page][HOME]

[HOME]: https://www.isg-software.de/tspagercontrols/indexe.html

## Motivation

The “normal” usage of the tablesorter's pager add-on requires you to manually create a user interface (control buttons to skip pages, page size selection and page display) in your HTML document (in addition to the table). The following HTML fragment is taken from an original example page:

    <table class="tablesorter">
    <!-- view page source to see the entire table -->
    </table>

    <!-- pager -->
    <div id="pager" class="pager">
      <form>
        <img src="first.png" class="first"/>
        <img src="prev.png" class="prev"/>
        <!-- the "pagedisplay" can be any element, including an input -->
        <span class="pagedisplay" data-pager-output-filtered="{startRow:input} &ndash; {endRow} / {filteredRows} of {totalRows} total rows"></span>
        <img src="next.png" class="next"/>
        <img src="last.png" class="last"/>
        <select class="pagesize">
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="40">40</option>
          <option value="all">All Rows</option>
        </select>
      </form>
    </div>

When calling the `tablesorterPager` plug-in, you may then “connect” these controls with the pager by setting corresponding options to the classes of the controls. This way, the plug-in is “wired” to your controls and adds the application logic to your UI.

While that is a clear separation of logic (in javascript) and user interface (in HTML) and offers you great freedom of UI design, I personally was looking for a solution which (just like the main `tablesorter` functionality) is directly applicable to any table in my web application's output without requiring the web app itself to include controls into its output.

So, the goal of _this_ plug-in is to get rid of pager-specific HTML mark-up in the document. If you, too, want to dynamically apply a table sorter and pager to one or more tables inside some HTML document via JavaScript, while the HTML really only holds the data table, have a look at this plug-in.

Instead of manually adding controls like those shown above to your HTML document and calling the `tablesorterPager` plug-in, you simply call this `appendTablesorterPagerControls` plug-in on your jQuery resultset. It automatically appends a `div` element beneath the table holding the default controls and then internally applies the `tablesorterPager`, ‘wiring’ it to the inserted controls.

## Features

* Checks whether the table is larger than the smallest page size option. Only adds the pager if that's the case, i.e. non-pageable tables will not be equipped with a useless pager.
* In difference to the typical examples like the source code shown above, this plug-in does not insert images but real HTML 5 buttons (`<button>…</button>` elements).
	* By default these look like any button of the user's OS, but the buttons can also be styled. This plug-in contains a `pillbuttons.css` stylesheet demonstrating styling capabilities by creating flat buttons with hover effect shaped with semicircles on the left- and righthand side.
	* Unavailable buttons (previous/first page buttons on page one or next/last page buttons on the last page) get disabled.
* Button labels are configurable via options.
* All controls support tooltips (via the `title` attribute). 
	* Default tooltips are available in english or german.
	* On source level, tooltips are defined in separate scripts files for easy localization. 
	* Tooltips may also be overridden locally via the plug-in options.
* More options include selectable page sizes, initial page size and CSS class names for the generated HTML elements.
* The page display element may be _either_ 
	* a disabled text input element (sporting fixed width and the standard form font also used for the button labels and page size select box) _or_
	* normal document text.
		* Only in this case, the following pager plug-in's optional feature is available: The current page number and/or current number of the first line may be inserted as input fields. The user can then enter a number and press return in order to directly switch to the desired page (resp. page holding the desired line).


## Dependencies

* Needs [tablesorter][npm_tablesorter]. Tested with 2.28.4, and requires at least this version for the option `outputFiltered` to work. If you don't use the filter widget or you don't need a different page display for filtered tables, this should also be compatible with earlier versions of tablesorter.
* Needs [jQuery][npm_jquery]. Tested with jQuery 3 (the NPM module definces a dependency to jquery V3.x.x), but should also be compatible with some earlier versions.

## Usage

Include the script files for jQuery, tablesorter, the pager and this plug-in to your HTML as well as the desired CSS files (you may use the bundled style sheets or create your own).

Select your tables via jQuery and apply the `tablesorter` and `appendTablesorterPagerControls` (instead of `tablesorterPager`) to the result set.

Your HTML's head might look like this:

    <!DOCTYPE html>
    <html>
    <head>
        <title>…</title>
        <meta charset="utf-8">
        <link rel="stylesheet" href="node_modules/tablesorter/dist/css/theme.blue.css" type="text/css">
        
        <script type="text/javascript" src="node_modules/jquery/dist/jquery.js"></script>
        <script type="text/javascript" src="node_modules/tablesorter/dist/js/jquery.tablesorter.min.js"></script>
        <script type="text/javascript" src="node_modules/tablesorter/dist/js/extras/jquery.tablesorter.pager.min.js"></script>
        <script type="text/javascript" src="js/jquery.tablesorter.pager.appendcontrols.english.min.js"></script>
        <link rel="stylesheet" href="css/jquery.tablesorter.pager.appendcontrols.css" type="text/css">
        
        <script type="text/javascript">
            $(function() {
                $("table")
                    .tablesorter({widthFixed: true, widgets: ['zebra']})
                    .appendTablesorterPagerControls();
            });
        </script>
    </head>

The minified (distribution) script files include the main plug-in code as well as the tooltip definitions in one language. Therefore you'll find the script file in different versions, named after the tooltip language.

If you want to include the unminified source scripts (e.g. for debugging purposes or if you've created a new language file and not yet compiled a new distribution file using it), you'll have to first load the main script file (`jquery.tablesorter.pager.appendcontrols.js`) followed by the language pack file (e.g. `jquery.tablesorter.pager.appendcontrols.english.js`).

The `appendTablesorterPagerControls()` method optionally takes an object as argument which overrides default options. The default options are defined as follows (and may also be globally overwritten):

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

## Examples

If you download the package from GitHub or NPM, you'll find it includes some example pages.

Online views of these examples can also be found on the [project's home page][HOME].

## License: BSD 2-clause

Copyright (c) 2017, Immo Schulz-Gerlach, www.isg-software.de   
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.


[tablesorter]: https://github.com/Mottie/tablesorter
[npm_tablesorter]: https://www.npmjs.com/package/tablesorter
[npm_jquery]: https://www.npmjs.com/package/jquery