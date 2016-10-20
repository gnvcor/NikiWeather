'use strict';

import alt from '../alt';
import Action from '../actions/Action';

class Store {
    constructor() {
        this.cities = [];
        this.loadCities();

        this.bindListeners({
            handleUpdateCities: Action.UPDATE_CITIES
        });
    }

    loadCities() {
        if (localStorage.length > 0) {
            this.cities = localStorage.getItem('selectDataCity').split(',');
        }
    };

    handleUpdateCities(cities) {
        this.cities = cities;
        localStorage.setItem('selectDataCity', this.cities);

        console.log(localStorage);
    }
}

export default alt.createStore(Store, 'Store');