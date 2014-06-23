require('common/styles/body.scss');

<% _.each(items, function(item) {  %>
require('<%= item %>');
<% }) %>