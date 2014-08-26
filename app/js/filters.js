(function() {
'use strict';

angular.module('vbrowser.filters', [])
  .filter('interpolate', interpolateFilter)

  .filter('mkExternalLinks', mkExternalLinksFilter)

  .filter('mkExternalLink4Uri', mkExternalLink4UriFilter)

  .filter('htmlifyTerm', htmlifyTermFilter)

;

interpolateFilter.$inject = ['version'];
function interpolateFilter(version) {
    return function(text) {
        return String(text).replace(/\%VERSION\%/mg, version);
    }
}

mkExternalLinksFilter.$inject = ['dataService'];
function mkExternalLinksFilter(dataService) {

    // regex to recognize potential vocabulary names within a text:
    // letters possibly having embedded underscores.
    var vocNameRegex = /\b(([a-z]+(_|[a-z])+)+)\b/gi;
    // TODO more general mechanism; the above was specifically for cf.

    /*
     * - Existing URLs are make external links.
     * - If vocNames is given, then those words are hyperlinked to corresponding term pages.
     */
    function mkExternalLinks(value, vocNames) {

        function mklinks4vocName(vocName, p1) {
            if ((vocNames && p1.toLowerCase() in vocNames)) {
                return '<a class="vocname" href="#/' + p1.toLowerCase() + '">' + p1 + '</a>';
            }
            //// the following was for cf:
            //else if (p1.indexOf('_') >= 0) {
            //    return '<a class="search" href="#/search/' + p1 + '">' + p1 + '</a>';
            //}
            else {
                return p1;
            }
        }

        if (/^<([^>]*)>$/.test(value)) {
            // it is an uri.
            value = mkExternalLink4Uri(value, true);
        }
        else {
            // TODO string with language tag?

            value = mklinks4text(value, mkExternalLink4Uri);

            value = value.replace(vocNameRegex, mklinks4vocName);
        }
        return value;
    }

    return function(text) {
        return mkExternalLinks(text, dataService.cachedTermDict());
    }
}

function mkExternalLink4UriFilter() {
    return mkExternalLink4Uri
}

htmlifyTermFilter.$inject = ['cfg'];
function htmlifyTermFilter(cfg) {
    return function(name, search) {
        var termName = vutil.getTermName(name, cfg.voc.prefix);
        var text = termName;
        //// TODO, highlight search string
        //var re = new RegExp(search, 'gi');
        //text = termName.replace(re, '<span class="highlight">$&</span>');
        return '<a class="termname" href="#/' + termName + '">' + text + '</a>';
    }
}

///////////////////////////////////////////////////////
// private
///////////////////////////////////////////////////////

function n2br(str) {
    str = str.replace(/\\n/g, "\n");
    str = str.replace(/\n/g, "<br />\n");
    return str;
}

var uriRegex = /\b(https?:\/\/[0-9A-Za-z-\.\/&@:%_\+~#=\?\(\)]+\b)/g;

function mklinks4text(str, uriReplacer) {
    // first, escape original text
    str = _.escape(str);
    // but restore any '&' for the links processing below:
    str = str.replace(/&amp;/g, "&");
    // then, add our re-formatting
    str = n2br(str);
    str = str.replace(uriRegex, uriReplacer);
    return str;
}

function mkExternalLink4Uri(uri, possibleBrackets) {
    var pre = "";
    var post = "";
    if (possibleBrackets === undefined || possibleBrackets) {
        var m = uri.match(/^(<)?([^>]*)(>)?$/);
        pre  = _.escape(m[1]);
        uri  = m[2];
        post = _.escape(m[3]);
    }
    var link = '<a target="_blank" title="open directly in a new browser window" href="'
        + uri + '">' + uri + '</a>';

    return '<span class="uriAndExternal">' +pre + link + post+ '</span>';
}

})();
