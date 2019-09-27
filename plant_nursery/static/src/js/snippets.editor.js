odoo.define('plant_nursery.snippets.editor', function (require) {
    'use strict';

    var sOptions = require('web_editor.snippets.options');

    sOptions.registry.sPromoPlant = sOptions.Class.extend({
        xmlDependencies: ['/plant_nursery/static/src/xml/promo_plants.xml'],

        init: function() {
            this._super.apply(this, arguments)
            this.fakeRender();
        },
        start: function () {
            return Promise.all([
                this.fakeRender(),
                this._super.apply(this, arguments)
            ]);
        },
        selectCount: function (previewMode, value, $opt) {
            this.$target.attr('data-limit', value);
            this.fakeRender();
        },
        fakeRender: function() {
            var value = parseInt(this.$target.attr('data-limit'));
            var $row = this.$target.find('.row');
            $row.empty();
            for (var i = 0; i < value; i++) {
                this.$target.find('.row').append($('<div class="col-md-3">Fake Plant</div>'))
            }
        },
        cleanForSave: function () {
            this.$target.find('.row').empty();
        },
    });
});
