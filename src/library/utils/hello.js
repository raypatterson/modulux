module.exports = function(msg, selectors) {
  $(function() {
    console.log(msg, $(selectors));
  });
};