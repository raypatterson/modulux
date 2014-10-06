require('utils/hello.js')('Init Header', '.header');

$(function() {
  var $el;
  console.log('location.pathname', location.pathname);
  $('.header-menu-list-item ').each(function(idx, el) {
    console.log('el', el);
    $el = $(el);
    if (location.pathname === $el.children('a').attr('href')) {
      $el.addClass('active');
    }
  });
});