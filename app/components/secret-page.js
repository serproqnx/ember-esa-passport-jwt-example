import Ember from 'ember'
import Component from '@ember/component';

export default Component.extend({
  authManager: Ember.inject.service('session'),
  router: Ember.inject.service(),
  actions: {
    invalidateSession() {
      this.get('authManager').invalidate();
      this.get('router').transitionTo('/login')
    }
  }

});
