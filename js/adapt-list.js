define(function(require) {

  var ComponentView = require('coreViews/componentView');
  var Adapt = require('coreJS/adapt');

  var List = ComponentView.extend({

    preRender: function() {
      this.checkIfResetOnRevisit();
    },

    postRender: function() {
      /* option to animate list items - excpet when accessibility is enabled or touch device */
      if (this.model.get('_animateList') === true) {
        if (!Adapt.config.get("_accessibility")._isActive && !$('html').hasClass('touch')) {
          this.$el.addClass('is-animated-list');
          this.checkIfOnScreen();
        }
      }

      this.setReadyStatus();

      this.setupInview();
    },

    setupInview: function() {
      var selector = this.getInviewElementSelector();

      if (!selector) {
        this.setCompletionStatus();
      } else {
        this.model.set('inviewElementSelector', selector);
        this.$(selector).on('inview', _.bind(this.inview, this));
      }
    },

    /**
     * determines which element should be used for inview logic - body, instruction or title - and returns the selector for that element
     */
    getInviewElementSelector: function() {
      if(this.model.get('body')) return '.component__body';

      if(this.model.get('instruction')) return '.component__instruction';

      if(this.model.get('displayTitle')) return '.component__title';

      return null;
    },

    checkIfResetOnRevisit: function() {
      var isResetOnRevisit = this.model.get('_isResetOnRevisit');

      // If reset is enabled set defaults
      if (isResetOnRevisit) {
        this.model.reset(isResetOnRevisit);
      }
    },

    inview: function(event, visible, visiblePartX, visiblePartY) {
      if (visible) {
        if (visiblePartY === 'top') {
          this._isVisibleTop = true;
        } else if (visiblePartY === 'bottom') {
          this._isVisibleBottom = true;
        } else {
          this._isVisibleTop = true;
          this._isVisibleBottom = true;
        }

        if (this._isVisibleTop && this._isVisibleBottom) {
          this.$(this.model.get('inviewElementSelector')).off('inview');
          this.setCompletionStatus();
        }
      }
    },

    checkIfOnScreen: function() {
      this.$('.list__container').on('onscreen', _.bind(this.calculate, this));
    },


    calculate: function(event, listContainer) {
      var $listContainer = this.$(event.currentTarget);
      var triggerPercentage = 70;

      if (listContainer.percentFromTop < triggerPercentage) {
        if (!$listContainer.hasClass('is-inview')) {
          $listContainer.addClass('is-inview');
          /* animate list items on loop */
          var allListItems = this.$('.list__item');
          var count = allListItems.length;
          for (var i = 0; i < count; i++) {
            (function(i){
              setTimeout(function(){
                this.$(allListItems[i]).addClass('is-animating');
              }, 200 * i);
            }(i));
          }
        }
      }
    },

    remove: function() {
      if (this.model.has('inviewElementSelector')) {
        this.$(this.model.get('inviewElementSelector')).off('inview');
      }

      ComponentView.prototype.remove.call(this);
    }
  },
  {
    template: 'list'
  });

  Adapt.register('list', List);

  return List;

});
