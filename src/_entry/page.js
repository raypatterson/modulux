// Bootstrap
require('bootstrap-sass-official/assets/stylesheets/_bootstrap.scss');
require('bootstrap-material-design/sass/ripples.scss');
require('bootstrap-material-design/sass/material-wfont.scss');
require('bootstrap-material-design/scripts/ripples.js');
require('bootstrap-material-design/scripts/material.js');

// Custom
require('common/styles/variables.scss');
require('common/styles/mixins.scss');
require('common/styles/body.scss');

<% _.each(items, function(item) { %>
    require('<%= item %>'); <%
}) %>