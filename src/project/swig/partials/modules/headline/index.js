require('utils/hello.js')('Init Headline', '.headline');

require('slabText/css/slabtext.css');
require('slabText/js/jquery.slabtext.js');

$(function(window) {
  $('.headline').slabText();
});