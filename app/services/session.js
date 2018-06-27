import DS from 'ember-data';
import ESASession from "ember-simple-auth/services/session";
import { inject } from '@ember/service'
import { computed } from '@ember/object'

export default ESASession.extend({

  store: inject(),

  currentUser: computed('isAuthenticated', function() {
    if (this.get('isAuthenticated')) {
      const promise = this.get('store').queryRecord('user', {})
      return DS.PromiseObject.create({ promise: promise })
    }
  })

});