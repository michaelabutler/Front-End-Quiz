/**
 * Created by michaela.butler on 6/13/14.
 */
'use strict';

var FormView = Backbone.View.extend({
    el: '#itemForm',

    initialize: function(options) {
        this.enums = options.enums;
        this.templates = [
            _.template($('#itemCondition').html()),
            _.template($('#itemMeasurements').html()),
            _.template($('#itemMaterials').html()),
            _.template($('#itemText').html())
        ];
        this.render();
    },

    events: {
        'change input[name="restricted"]': 'restrictedChanged',
        'change input, textarea, select': 'inputChange',
        'change input[name="unit"]': 'changeUnit',
        'change input[name="shape"]': 'enableMeasurements',
        'click button': 'itemSave'
    },

    inputChange: function(e) {
        var $this = $(e.currentTarget);
        var parameter = $this.attr('name');
        var value = $this.val();

        // Multi level object property
        if ($this.data('property')) {
            var property = $this.data('property');
            var data = this.model.get(property);
            data[parameter] = value;

            this.model.set(property, data);
            console.log(property, data);
        } else {
            this.model.set(parameter, value);
            console.log(parameter, value);
        }
    },

    restrictedChanged: function(e) {
        var $this = $(e.currentTarget);
        $this.val($this.is(':checked') ? 'Y' : 'N');
    },

    changeUnit: function(e) {
        this.$el.find('.add-on').text(e.currentTarget.value);
    },

    enableMeasurements: function() {
        this.$el.find('.item-measurement').removeAttr('disabled');
    },

    itemSave: function() {
        console.log(this.model.toJSON());
    },

    render: function() {
        var self = this;
        var data = {
            item: this.model.toJSON(),
            enums: this.enums.toJSON(),
            disabled: this.model.get('measurement').shape.length ? '' : 'disabled',
            measurementInputs: {
                length: 'Length',
                depth: 'Depth',
                height: 'Height',
                diameter: 'Diameter'
            }
        };

        _.each(this.templates, function(template) {
            self.$el.prepend(template(data));
        });

        return this;
    }
});

module.exports = FormView;