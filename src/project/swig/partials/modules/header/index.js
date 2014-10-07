require('utils/hello.js')('Init Header', '.header');

require('bootstrap-sass-official/assets/javascripts/bootstrap/dropdown.js');

$(function() {

  var $el;

  $('.header-menu li').each(function(idx, el) {
    console.log('el', el);
    $el = $(el);
    if (location.pathname === $el.children('a').attr('href')) {
      $el.addClass('active');
    }
  });

  $el = $('.header-menu .dropdown-toggle')
  $el.dropdown();

});