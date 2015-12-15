'use strict';

import React         from 'react';
import McFly from 'McFly';
import StationsStore        from '../stores/StationsStore';

/** McFly */
var Flux = new McFly();

/** Actions */
var StationsActions = Flux.createActions({
  addStation: function(data){
    return {
      actionType: "ADD_STATION",
      station_name: data.station_name,
      station_title: data.station_title,
      station_url: data.station_url,
      description: data.description,
      coverImg: data.coverImg,
      privacy: data.privacy,
      public_posting: data.public_posting
    }
  }
});

export default StationsActions;
