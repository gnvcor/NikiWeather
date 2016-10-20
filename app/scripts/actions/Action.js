'use strict';

import alt from '../alt';

class Action {
    updateCities(cities) {
        return cities;
    }
}

export default alt.createActions(Action);