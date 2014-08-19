var gulp     = require('gulp');
var replace  = require('gulp-replace');
var _        = require('lodash');
var fs       = require('fs');

var cfg      = require('./config/ioos_param.js');
//var cfg      = require('./config/cf.js');

var headerFields = (function(){
    var lis = _.map(cfg.termList.fields, function(field) {
        return '<th field-name="' +field.name+ '" enable-filtering="true"></th>';
    });
    return '\n' + lis.join('\n');
})();

var valueFields = (function(){
    var lis = _.map(cfg.termList.fields, function(field, idx) {
        var pipe = idx === 0 ? ' | htmlifyTerm:termListFilter'
                 : idx === 1 ? ' | htmlifyDefinition:termListFilter'
                 : '';
        return '<td field-name="' +field.name+ '">\n' +
               '  <div ng-bind-html="gridItem.' +field.name + pipe +'"></div>\n' +
               '</td>';
    });
    return '\n' + lis.join('\n');
})();


gulp.task('default', ['genConfig'], function(){
    return gulp.src('config/tpl/main.html')
        .pipe(replace(/@@headerFields/, headerFields))
        .pipe(replace(/@@valueFields/, valueFields))
        .pipe(gulp.dest('app/views'));
});

gulp.task('genConfig', function(cb) {
    fs.writeFile("app/js/config.js", "var scvConfig = " + JSON.stringify(cfg, null, '  '), function (err) {
        cb(err);
    });
});
