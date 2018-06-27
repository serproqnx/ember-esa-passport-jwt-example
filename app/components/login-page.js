import Component from '@ember/component'
import { inject } from '@ember/service'

export default Component.extend({

  authManager: inject('session'),
  router: inject(),

  actions: {
    authenticate() {
      const { login, password } = this.getProperties('login', 'password');
      this.get('authManager').authenticate('authenticator:oauth2', login, password).then(() => {
        this.get('router').transitionTo('/')
        // alert('Success! Click the top link!');
      }, (err) => {
        alert('Error obtaining token: ' + err.responseText);
      });
    },
    invalidateSession() {
      this.get('authManager').invalidate();
    }

  }
});