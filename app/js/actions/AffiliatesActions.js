'use strict';

import React         from 'react/addons';
import McFly from 'McFly';
import AffiliatesStore        from '../stores/AffiliatesStore';

/** McFly */
var Flux = new McFly();

/** Actions */
var AffiliatesActions = Flux.createActions({
  addAffiliate: function(data){
    return {
      actionType: "ADD_AFFILIATE",
        name: data.name,
        username: data.username,
        company: data.company,
        email: data.email
    }
  }
});

export default AffiliatesActions;
