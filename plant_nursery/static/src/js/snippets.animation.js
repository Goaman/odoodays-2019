odoo.define('plant_nursery.snippets.animation', function (require) {
    "use strict";

    var core = require('web.core');
    var publicWidget = require('web.public.widget');

    publicWidget.registry.sPromoPlant = publicWidget.Widget.extend({
        selector: ".s_promo_plants",
        xmlDependencies: ['/plant_nursery/static/src/xml/promo_plants.xml'],

        init: function () {
            this._super.apply(this, arguments);
            this.plantsInPromo = [];
        },
        start: function () {
            return Promise.all([
                this._loadPlants(),
                this._super.apply(this, arguments)
            ]);
        },
        destroy: function () {
            this._super.apply(this, arguments);
        },
        _loadPlants: function () {
            var self = this;
            return this._rpc({
                model: 'nursery.plant',
                method: 'search_read',
                domain: [['website_published', '=', true]],
                fields: ['name', 'description', 'image', 'price'],
                limit: this.$el.data('limit'),
            }).then(function (result) {
                self.plantsInPromo = result;
                self._renderPlants();
            });
        },
        _renderPlants: function () {
            this.$('.row').html(core.qweb.render('plant_nursery.promo_plants', {
                plantsInPromo: this.plantsInPromo,
            }));
        },
    });
});
