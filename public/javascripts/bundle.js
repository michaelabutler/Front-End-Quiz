/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by michaela.butler on 6/9/14.
	 */
	    'use strict';

	    var EnumsModel = __webpack_require__(1);
	    var ItemModel = __webpack_require__(2);
	    var FormView = __webpack_require__(3);

	    var enums = new EnumsModel();
	    var item = new ItemModel();


	    $.when(item.fetch(), enums.fetch()).done(function() {
	        var data = {
	            model: item,
	            enums: enums
	        };

	        var form = new FormView(data);
	    });

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

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

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

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

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

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

/***/ }
/******/ ])