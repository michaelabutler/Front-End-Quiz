/**
 * Created by michaela.butler on 6/13/14.
 */
'use strict';

var Enums = Backbone.Model.extend({
    url: 'json/enums.json',

    parse: function(response) {
        // Formatting unit values, exp.: "Centimeters (cm)"
        for (var unitKey in response.itemEnums.measurement.unit) {
            var unit = response.itemEnums.measurement.unit[unitKey];
            unit = unit.charAt(0).toUpperCase() + unit.slice(1) + ' (' + unitKey + ')';
            response.itemEnums.measurement.unit[unitKey] = unit;
        }

        return response.itemEnums;
    }
});

module.exports = Enums;