require('utils/hello.js')('Init Tout', '.tout');

require('matthewlein-jQuery-widowFix/js/jquery.widowFix-1.3.2.js');

$(function(window) {
  $('.tout p').widowFix();
});