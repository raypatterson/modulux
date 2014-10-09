require('utils/hello.js')('Init Header', '.header');

$(function() {

  var $el;

  $('.header-menu li').each(function(idx, el) {
    $el = $(el);
    if (location.pathname === $el.children('a').attr('href')) {
      $el.addClass('active');
    }
  });

});