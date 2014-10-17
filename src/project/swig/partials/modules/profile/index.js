require('utils/hello.js')('Init Profile', '.profile');

require('matthewlein-jQuery-widowFix/js/jquery.widowFix-1.3.2.js');

$(function(window) {
  $('.profile p').widowFix();
});