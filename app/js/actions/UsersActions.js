'use strict';

import React         from 'react/addons';
import McFly from 'McFly';
import UsersStore        from '../stores/UsersStore';

/** McFly */
var Flux = new McFly();

/** Actions */
var UsersActions = Flux.createActions({
  addAffiliate: function(data){
    return {
      actionType: "ADD_USER",
        name: data.name,
        username: data.username,
        company: data.company,
        email: data.email
    }
  }
});

export default UsersActions;
