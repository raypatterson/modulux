require('utils/hello.js')('Init Header', '.header');

require('bootstrap-sass-official/assets/javascripts/bootstrap/dropdown.js');

$(function() {

  var $el;

  $('.header-menu li').each(function(idx, el) {
    $el = $(el);
    if (location.pathname === $el.children('a').attr('href')) {
      $el.addClass('active');
    }
  });

  $el = $('.dropdown-toggle');

  $el.click(function() {
    window.location.href = $(this).attr('href');;
    return false;
  });

});