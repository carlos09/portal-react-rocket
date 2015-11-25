'use strict';

import React         from 'react/addons';
import McFly from 'McFly';
import UsersActions      from '../actions/UsersActions';

/** McFly */
var Flux = new McFly();

var _affiliates = [];

var _users = [
  {
    "_id": "GP5655",
    "appName": "GoPro",
    "index": 0,
    "guid": "83a3d1af-718b-4434-920a-185580eb4d44",
    "isActive": false,
    "username": "@Meagan",
    "name": "Chambers Delgado",
    "stationTitle": "MAGNAFONE",
    "email": "chambersdelgado@magnafone.com",
    "phone": "+1 (937) 490-2622",
    "role": "",
    "tags": [
      "voluptate",
      "magna",
      "duis",
      "labore",
      "nostrud",
      "dolor",
      "amet"
    ],
    "listeningTo": [
      {
        "station": "NETILITY"
      },
      {
        "station": "CYTRAK"
      },
      {
        "station": "QUANTALIA"
      }
    ]
  },
  {
    "_id": "GP5653",
    "appName": "GoPro",
    "index": 1,
    "guid": "c441f4e9-631e-43a7-bd1f-a0efe552f551",
    "isActive": false,
    "username": "@Blanche",
    "name": "Nora Cooley",
    "stationTitle": "FRANSCENE",
    "email": "noracooley@franscene.com",
    "phone": "+1 (899) 554-3946",
    "role": "",
    "tags": [
      "adipisicing",
      "sint",
      "irure",
      "anim",
      "exercitation",
      "proident",
      "id"
    ],
    "listeningTo": [
      {
        "station": "CYCLONICA"
      },
      {
        "station": "QUARMONY"
      },
      {
        "station": "JETSILK"
      }
    ]
  },
  {
    "_id": "GP2313",
    "appName": "GoPro",
    "index": 2,
    "guid": "823d8be5-7403-4e45-90e1-ace7e346795f",
    "isActive": false,
    "username": "@Esmeralda",
    "name": "Mavis Brooks",
    "stationTitle": "CALLFLEX",
    "email": "mavisbrooks@callflex.com",
    "phone": "+1 (939) 532-3130",
    "role": "",
    "tags": [
      "sit",
      "in",
      "veniam",
      "ipsum",
      "nostrud",
      "aliqua",
      "nostrud"
    ],
    "listeningTo": [
      {
        "station": "EURON"
      },
      {
        "station": "IMAGEFLOW"
      },
      {
        "station": "COMSTAR"
      }
    ]
  },
  {
    "_id": "GP23r5",
    "appName": "GoPro",
    "index": 3,
    "guid": "dd8270e7-4354-4cd5-b2be-ef105c1484c9",
    "isActive": false,
    "username": "@Powers",
    "name": "Holcomb Montoya",
    "stationTitle": "UNI",
    "email": "holcombmontoya@uni.com",
    "phone": "+1 (876) 422-3482",
    "role": "",
    "tags": [
      "culpa",
      "reprehenderit",
      "ad",
      "ea",
      "nostrud",
      "ullamco",
      "dolore"
    ],
    "listeningTo": [
      {
        "station": "ORBAXTER"
      },
      {
        "station": "SIGNITY"
      },
      {
        "station": "DIGIPRINT"
      }
    ]
  },
  {
    "_id": "GP5557",
    "appName": "GoPro",
    "index": 4,
    "guid": "00d4200d-bb6f-43cf-93de-17d4d52ba6da",
    "isActive": false,
    "username": "@Lucile",
    "name": "Lilly Ross",
    "stationTitle": "CYTREK",
    "email": "lillyross@cytrek.com",
    "phone": "+1 (889) 429-2333",
    "role": "",
    "tags": [
      "ullamco",
      "ullamco",
      "quis",
      "dolore",
      "ipsum",
      "velit",
      "minim"
    ],
    "listeningTo": [
      {
        "station": "SURELOGIC"
      },
      {
        "station": "LOVEPAD"
      },
      {
        "station": "IMPERIUM"
      }
    ]
  },
  {
    "_id": "GP6834",
    "appName": "GoPro",
    "index": 5,
    "guid": "1df2c9b9-3216-4174-83d2-d8c6039e0a28",
    "isActive": true,
    "username": "@Simmons",
    "name": "Hazel Carpenter",
    "stationTitle": "DADABASE",
    "email": "hazelcarpenter@dadabase.com",
    "phone": "+1 (837) 499-2105",
    "role": "",
    "tags": [
      "laboris",
      "nisi",
      "tempor",
      "ex",
      "sit",
      "irure",
      "nisi"
    ],
    "listeningTo": [
      {
        "station": "SUPREMIA"
      },
      {
        "station": "APEXIA"
      },
      {
        "station": "EMTRAC"
      }
    ]
  },
  {
    "_id": "GP9928",
    "appName": "GoPro",
    "index": 6,
    "guid": "b1ea4667-c4aa-4cd4-b760-f2fba90a0e16",
    "isActive": true,
    "username": "@Eileen",
    "name": "Goff Vazquez",
    "stationTitle": "LINGOAGE",
    "email": "goffvazquez@lingoage.com",
    "phone": "+1 (850) 573-2550",
    "role": "",
    "tags": [
      "ullamco",
      "excepteur",
      "amet",
      "Lorem",
      "est",
      "labore",
      "anim"
    ],
    "listeningTo": [
      {
        "station": "ACCEL"
      },
      {
        "station": "CORPORANA"
      },
      {
        "station": "INJOY"
      }
    ]
  }
];

/** Store */
function addUser(data) {
    _users.push(data);
}

var UsersStore = Flux.createStore({
  getAffiliates: function(){
     return _affiliates;
  },
  getUsers: function(){
    return _users;
  }
}, function(payload) {
  if(payload.actionType === "ADD_USER") {
    var newUser = {
      name: payload.name,
      username: payload.username,
      company: payload.company,
      email: payload.email
    };
    addUser(newUser);
    UsersStore.emitChange();
  }
});

export default UsersStore;
