require('bootstrap-sass-official/assets/javascripts/bootstrap/dropdown.js');

require('utils/hello.js')('Init Dropdown', '.dropdown-toggle');

$(function() {

  var $el = $('.dropdown-toggle');

  $el.click(function() {
    window.location.href = $(this).attr('href');;
    return false;
  })

});