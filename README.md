# tablesorter-pagercontrols

This jQuery plug-in is an add-on for [mottie's tablesorter plug-in][tablesorter], more explicitly its pager add-on. It programmatically adds pager controls below a table and applies the pager add-on for large HTML tables, so that you don't have to insert the controls to the HTML manually any more.

[Project Home Page][HOME]

[HOME]: https://www.isg-software.de/tspagercontrols/indexe.html

## What's new?

V1.6 (Sept. 2023): 
* introduced Aria-Labels to the pager buttons for better accessibility,
* introduced new option `buttonLabelClass`,
* added new classes `flipLeft` and `rotateLeft` to default CSS which both can be used as values for the new `buttonLabelClass` option if the button label for the left buttons (first and prev) are in fact right-pointing arrows of some kind,
* updated the template `triangleIcons` to use the same right-pointing arrow icon for all button labels and flip the left buttons using the aforementioned options and class. 

V1.5 (Sept. 2023): Introduced the additional options `forcePager` and `pagerOptions`, see default options below. These were mainly added in order to support Ajax-based Pagers.

## Motivation

The “normal” usage of the tablesorter's pager add-on requires you to manually create a user interface (control buttons to skip pages, page size selection and page display) in your HTML document (in addition to the table). The following HTML fragment is taken from an original example page:

```html
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
```

When calling the `tablesorterPager` plug-in, you may then “connect” these controls with the pager by setting corresponding options to the classes of the controls. This way, the plug-in is “wired” to your controls and adds the application logic to your UI.

While that is a clear separation of logic (in javascript) and user interface (in HTML) and offers you great freedom of UI design, I personally was looking for a solution which (just like the main `tablesorter` functionality) is directly applicable to any table in my web application's output without requiring the web app itself to include controls into its output.

So, the goal of _this_ plug-in is to get rid of pager-specific HTML mark-up in the document. If you, too, want to dynamically apply a table sorter and pager to one or more tables inside some HTML document via JavaScript, while the HTML really only holds the data table, have a look at this plug-in.

Instead of manually adding controls like those shown above to your HTML document and calling the `tablesorterPager` plug-in, you simply call this `appendTablesorterPagerControls` plug-in on your jQuery resultset. It automatically appends a `div` element beneath the table holding the default controls and then internally applies the `tablesorterPager`, ‘wiring’ it to the inserted controls.

## Features

* Checks whether the table is larger than the smallest page size option. Only adds the pager if that's the case, i.e. non-pageable tables will not be equipped with a useless pager.
	* This can now be overruled by the option `forcePager: true`, if you want to insert the pager regardless of the table size. This is especially useful if you insert an empty table and want it to be filled by partial data via Ajax requests (which is am optional feature of the Tablesorter Pager Plug-in).
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

```html
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
```

The minified (distribution) script files include the main plug-in code as well as the tooltip definitions in one language. Therefore you'll find the script file in different versions, named after the tooltip language.

If you want to include the unminified source scripts (e.g. for debugging purposes or if you've created a new language file and not yet compiled a new distribution file using it), you'll have to first load the main script file (`jquery.tablesorter.pager.appendcontrols.js`) followed by the various other files like `defaults.js` and lastly the language pack file (e.g. `jquery.tablesorter.pager.appendcontrols.english.js`).


The `appendTablesorterPagerControls()` method optionally takes one or more objects as arguments which each may override default options. This means:

* Calling the function without arguments applies the default options,
* calling the function with one argument, this has to be an option containing all those options which you want to differ from the defaults.
* If you call the function with more than one argument (e.g. one object with user-defined options and one or more so-called templates, globally defined option sets overriding some specific options), all these options objects will be merged into a copy of the defaults. I.e. the options in the first argument override defaults, options in the second argument may override options of the first argument and so on.

The default options are defined as follows (and may also be globally overwritten):

```javascript
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
		 * CSS class for a div element wrapped around the table only (inside the optional innerWrapper).
		 * Defaults to null, in which case no such table wrapper is added.
		 * If non-null, the table will be wrapped like this:
		 * <div class='classWrapper'><div class='classTableWrapper'><table>...</table></div><div class='classControls'>...</div></div>.
		 * Or, if the classInnerWrapper is also non-null:
		 * <div class='classWrapper'><div class='classInnerWrapper'><div class='classTableWrapper'><table>...</table></div><div class='classControls'>...</div></div></div>.
		 * So, by default this table wrapper won't be added, but it may be added for some CSS formatting.
		 * It's especially useful if you may have very wide table and want them to be horizontally scrollable.
		 * In this case, you may set this option and introduce a CSS rule setting overflow-x: scroll for the table wrapper.
		 * That way, the table itself will be scrollable (if wider that the viewport) while the table pager controls beneath
		 * it (as well as content above the table or beneath the pager controls) will stay fixed and won't scroll left or right
		 * with the table, i.e. the user will always see and will always be able to operate the pager regardless of
		 * the horizontal scroll position of the table.
		 */
		classTableWrapper: null,
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
		labelLast: "&gt;&gt;",
		/**
		 * If this is a string, each button label will be wrapped in a span with a class attribute, and this property defines
		 * the latter's value.
		 * This may e.g. be used to add the class "flipLeft" to each button label. The default CSS will then horizontally flip
		 * these button labels for the left two buttons (prev and first).
		 * Alternatively, you may use the class "rotateLeft", which will by default rotate the button labels of the prev- and first-
		 * buttons by 180 degrees.
		 */
		buttonLabelClass: null,
		/**
		 * If false, pager buttons are only added to a table if that table contains more rows than
		 * the smallest page size (i.e. actual row count < sizes[0]).
		 * Set this to true to force appending pager controls regardless of actual table size (e.g. if the
		 * table is still empty and will be populated via ajax requests).
		 */
		forcePager: false,
		/**
		 * Any properties of this object will be passed directly to the original tablesorterPager plugin.
		 * This is empty by default, as usually all needed pager options are automatically generated by this plug-in.
		 * May be used, e.g., to add ajax options (ajaxUrl, ajaxProcessing, etc.).
		 */
		pagerOptions: {}
};
```

[defaults.js](src/js/defaults.js)

As you can see in the example call above, you don't apply the tablesorter's pager plug-in directly, but you only apply the `tablesorter()` plug-in method, followed directly by the `appendTablesorterPagerControls()` call. The latter will apply the `tablesorterPager()`-call automatically for you. The options to this `tablesorterPager()` are calculated by this plug-in.

There might be situations where you want to specify your own options to pass to `tablesorterPager()`, like e.g. several of the `ajax*` properties which enable getting pages of table rows via Ajax calls from a server. You can now do so by collecting these in the `pagerOptions` property. Such a call would thus look something like this:

```javascript
$("table")
    .tablesorter({
        … options for tablesorter …
    })
    .appendTablesorterPagerControls({
        … options for appendTablesorterPagerControls …
        pagerOptions: {
            … additional options for tablesorterPager …
            (besides those automatically calculated)
        }
    });
```


### Templates

As said, you may call the jQuery plug-in with an object as argument holding those options you wish to override. If you want to repeatedly override a whole subset of options, you may aggregate these into template objects. 
Four predefined templates are included, see [templates.js](src/js/templates.js).

The application of these templates is demonstrated in the examples.

## Examples

If you download the package from GitHub or NPM, you'll find it includes some example pages.

Online views of these examples can also be found on the [project's home page][HOME].

## License: BSD 2-clause

Copyright (c) 2023, Immo Schulz-Gerlach, www.isg-software.de   
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.


[tablesorter]: https://github.com/Mottie/tablesorter
[npm_tablesorter]: https://www.npmjs.com/package/tablesorter
[npm_jquery]: https://www.npmjs.com/package/jquery