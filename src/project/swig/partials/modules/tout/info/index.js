require('utils/hello.js')('Init Info', '.info');

require('matthewlein-jQuery-widowFix/js/jquery.widowFix-1.3.2.js');

$(function(window) {
  $('.info p').widowFix();
});