// Bootstrap
require('bootstrap-sass-official/assets/stylesheets/_bootstrap.scss');
require('bootstrap-sass-official/assets/javascripts/bootstrap.js');

// Custom
require('common/styles/body.scss');

<% _.each(items, function(item) { %>
    require('<%= item %>'); <%
}) %>