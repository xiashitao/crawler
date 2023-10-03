const fs = require("fs");

const pathModule = require("path");

const path1 = pathModule.resolve(__dirname, "../static/美女");
// const files = fs.readdirSync("../static");

function walk(path, callback) {
  const files = fs.readdirSync(path);

  files.forEach(function (file, index) {
    if (fs.statSync(path + "/" + file).isFile()) {
      callback(path, file, index);
    }
  });
}

function rename(oldPath, newPath) {
  fs.rename(oldPath, newPath, function (err) {
    if (err) {
      throw err;
    }
  });
}

walk(path1, function (path, fileName, index) {
  const oldPath = path + "/" + fileName;
  const newPath = path + "/" + (index + 1) + pathModule.extname(fileName);
  rename(oldPath, newPath);
});
