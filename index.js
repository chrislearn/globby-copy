var fs = require('fs-extra'),
    path = require('path'),
    globby = require('globby'),
    globbyRelative = require('globby-relative');

var copy = function(files, pattern, destFolder) {
  files.forEach(function(filename) {
      var relPath = globbyRelative(filename, pattern).path;
    // var out = fs.createWriteStream(path.join(destFolder, relPath));
    // fs.createReadStream(filename).pipe(out);
    fs.copySync(filename, path.join(destFolder, relPath));
  });
}

var cp = function(pattern, destFolder, cb) {
  globby(pattern, function(err, files) {
    copy(files, pattern, destFolder);
    if (cb) cb(err, files);
  });
}

var cpSync = function(pattern, destFolder) {
  copy(globby.sync(pattern), pattern, destFolder);
}

module.exports = {copy: cp, copySync: cpSync};
