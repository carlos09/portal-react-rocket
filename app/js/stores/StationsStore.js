'use strict';

import React         from 'react';
import McFly from 'McFly';
import StationsActions      from '../actions/StationsActions';

/** McFly */
var Flux = new McFly();

var _stations = [];

var _stationsList = [
  {
    index: 65655,
    station_name: "Some Name",
    station_url: "stranger@danger.com",
    station_title: "Station",
    description: "Cras ut nunc elementum, egestas tortor nec, dignissim turpis. Integer ex nisi, commodo sit amet erat vitae, sagittis mollis nisi. Curabitur sed leo pretium ex maximus ornare. In rhoncus posuere eros, non sollicitudin diam tristique in.",
    coverImg: "http://a.espncdn.com/media/motion/2010/1228/actionsports20101227chadreed.jpg",
    privacy: true,
    public_posting: false
  },
  {
    index: 6432,
    station_name: "Some Name2",
    station_url: "stranger2@danger.com",
    station_title: "Go Pro",
    description: "Morbi leo erat, auctor eget dui vel, suscipit ullamcorper velit. Praesent vulputate, felis a lobortis efficitur, diam neque ornare lacus, id hendrerit ante lacus vel justo.",
    coverImg: "http://latimesblogs.latimes.com/photos/uncategorized/2008/07/30/x_games.jpg",
    privacy: true,
    public_posting: false
  },
  {
    index: 65235,
    station_name: "Some Name3",
    station_url: "stranger3@danger.com",
    station_title: "Redbull",
    description: "Proin quis arcu at sapien molestie suscipit eu ut metus. Etiam at pretium arcu, eu vehicula nibh. Cras nec nunc ullamcorper, gravida leo quis, egestas sem.",
    coverImg: "http://image.redbull.com/rbx00390/0001/1/800/465/files/2613/8668/3825/ss_131130_BCONE_WING_HONG_0044.jpg",
    privacy: false,
    public_posting: true
  }
];

/** Store */
function addStation(data) {
    _stationsList.push(data);
}

var StationsStore = Flux.createStore({
  getStations: function(){
     return _stations;
  },
  getStationsList: function(){
    return _stationsList;
  }
}, function(payload) {
  if(payload.actionType === "ADD_STATION") {
    var newStation = {
      station_name: payload.station_name,
      station_title: payload.station_title,
      station_url: payload.station_url,
      description: payload.description,
      coverImg: payload.coverImg,
      privacy: payload.privacy,
      public_posting: payload.public_posting
    };
    addStation(newStation);
    StationsStore.emitChange();
  }
});

export default StationsStore;
