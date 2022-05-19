const fs = require('fs')

exports.isExists = function (file) {
  return fs.existsSync(file)
}

