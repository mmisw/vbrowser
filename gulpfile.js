var gulp     = require('gulp');
var gutil    = require('gulp-util');
var replace  = require('gulp-replace');
var _        = require('lodash');
var fs       = require('fs');


if (!gutil.env.config) {
    gutil.log(gutil.colors.red("error:"), "missing config. Use --config ./config/someconfig.js");
    process.exit(1);
}

var configFile = gutil.env.config;

//if (configFile.indexOf('./') !== 0) configFile = './' + configFile;

var cfg = require(configFile);

gutil.log("using config " +configFile);

var commonCfg = require('./config/tpl/common.js');

var headerFields = (function(){
    var lis = _.map(cfg.termList.fields, function(field) {
        return '<th field-name="' +field.name+ '" enable-filtering="true"></th>';
    });
    return '\n' + lis.join('\n');
})();

var valueFields = (function(){
    var lis = _.map(cfg.termList.fields, function(field, idx) {
        var pipe = idx === 0 ? ' | htmlifyTerm:termListFilter'
                 : ' | mkExternalLinks';
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
    if (cfg.mapping === undefined) {
        cfg.mapping = commonCfg.mapping;
    }
    fs.writeFile("app/js/config.js", "var vrowserConfig = " + JSON.stringify(cfg, null, '  ') + ";", function (err) {
        cb(err);
    });
});
