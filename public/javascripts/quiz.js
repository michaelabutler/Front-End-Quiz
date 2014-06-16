/**
 * Created by michaela.butler on 6/9/14.
 */
    'use strict';

    var EnumsModel = require('./models/enumsModel.js');
    var ItemModel = require('./models/itemModel.js');
    var FormView = require('./views/formView.js');

    var enums = new EnumsModel();
    var item = new ItemModel();


    $.when(item.fetch(), enums.fetch()).done(function() {
        var data = {
            model: item,
            enums: enums
        };

        var form = new FormView(data);
    });