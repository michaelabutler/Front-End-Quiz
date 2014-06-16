/**
 * Created by michaela.butler on 6/13/14.
 */
'use strict';

var Item = Backbone.Model.extend({
    url: 'json/item.json',

    parse: function(response) {
        return response.result.item;
    }
});

module.exports = Item;