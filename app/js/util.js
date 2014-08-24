/* some utilities */

var vutil = (function() {
    'use strict';

    return {
        getTermName:         getTermName,
        cleanQuotes:         cleanQuotes,
        globToRegex:         globToRegex,
        options:             {pageSize: scvConfig.termList.pageSize || 40}
    };

    // removes the prefix
    function getTermName(name) {
        var termName = name.replace(/^<(.*)>$/, '$1');
        var prefix = scvConfig.voc.prefix;
        if (termName.indexOf(prefix) == 0) {
            termName = termName.substring(prefix.length);
        }
        return termName;
    }

    function cleanQuotes(value) {
        // \"foo bar\" etc...  -->  "foo bar" etc...
        value = value.replace(/\\"/g, '"');
        value = value.replace(/^"(.*)"$/, '$1');
        return value;
    }

    // From: http://stackoverflow.com/a/5575892
    function globToRegex(glob) {
        var specialChars = "\\^$*+?.()|{}[]";
        var regexChars = ["^"];
        for (var i = 0; i < glob.length; ++i) {
            var c = glob.charAt(i);
            switch (c) {
                case '?':
                    regexChars.push(".");
                    break;
                case '*':
                    regexChars.push(".*");
                    break;
                default:
                    if (specialChars.indexOf(c) >= 0) {
                        regexChars.push("\\");
                    }
                    regexChars.push(c);
            }
        }
        regexChars.push("$");
        return regexChars.join("");
    }

})();
