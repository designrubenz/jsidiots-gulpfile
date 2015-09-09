var gutil = require('gulp-util');

var conn = {
host:     'example.com',
user:     'user',
password: 'make_sure_to_exclude_this_file_from_your_version_control_(.gitignore!)',
parallel: 1,
log:      gutil.log
};

module.exports = conn;
