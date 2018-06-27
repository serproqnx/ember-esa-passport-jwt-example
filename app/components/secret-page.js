import { inject } from '@ember/service'
import Component from '@ember/component';

export default Component.extend({
  authManager: inject('session'),
  router: inject(),
  actions: {
    invalidateSession() {
      this.get('authManager').invalidate();
      this.get('router').transitionTo('/login')
    }
  }

});
