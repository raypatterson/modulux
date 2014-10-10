// Bootstrap
require('bootstrap-sass-official/assets/stylesheets/_bootstrap.scss');

// Custom
require('common/styles/variables.scss');
require('common/styles/mixins.scss');
require('common/styles/body.scss');

<% _.each(items, function(item) { %>
    require('<%= item %>'); <%
}) %>