const crypto = require('crypto');

module.exports = {
  new_UUID: () => {

    var length = 19;
    var chars = 'A#';
    var mask = '';
    var mask = '';
    if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (chars.indexOf('#') > -1) mask += '0123456789';

    var result = '';
    for (var i = length; i > 0; --i) result += mask[Math.round(Math.random() * (mask.length - 1))];
    return result;
  }

}







