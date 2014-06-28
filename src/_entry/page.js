require('pure/pure.css');
require('pure/grids-responsive.css');
require('common/styles/body.scss');

<% _.each(items, function(item) { %>
    require('<%= item %>'); <%
}) %>