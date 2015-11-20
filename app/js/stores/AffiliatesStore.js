'use strict';

import React         from 'react/addons';
import McFly from 'McFly';
import AffiliatesActions      from '../actions/AffiliatesActions';

/** McFly */
var Flux = new McFly();

var _affiliates = [];

var _affiliateList = [
  {
    index: 65655,
    name: "Some Name",
    username: "stranger",
    email: "stranger@danger.com",
    company: "Station"
  },
  {
    index: 6432,
    name: "Some Name2",
    username: "stranger2",
    email: "stranger2@danger.com",
    company: "Go Pro"
  },
  {
    index: 65235,
    name: "Some Name3",
    username: "stranger3",
    email: "stranger3@danger.com",
    company: "Redbull"
  }
];

/** Store */
function addAffiliate(data) {
    _affiliateList.push(data);
}

var AffiliatesStore = Flux.createStore({
  getAffiliates: function(){
     return _affiliates;
  },
  getAffiliatesList: function(){
    return _affiliateList;
  }
}, function(payload) {
  if(payload.actionType === "ADD_AFFILIATE") {
    var newAffiliate = {
      name: payload.name,
      username: payload.username,
      company: payload.company,
      email: payload.email
    };
    addAffiliate(newAffiliate);
    AffiliatesStore.emitChange();
  }
});

export default AffiliatesStore;
