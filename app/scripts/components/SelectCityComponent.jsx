'use strict';

import React, { Component } from 'react';
import Select2 from 'react-select2';
import Actions from '../actions/Action';

export default class SelectCityComponent extends Component {
    constructor() {
        super();

        this.dataCity = [
            { text: 'Moskva', id: 524894 },
            { text: 'Sankt-Peterburg', id: 536203 },
            { text: 'Yekaterinburg', id: 1486209 },
            { text: 'Kazan', id: 551487 },
            { text: 'Novosibirsk', id: 1496747 },
            { text: 'Ufa', id: 479561 },
            { text: 'Chelyabinsk', id: 1508291 },
            { text: 'Samara', id: 499099 },
            { text: 'Omsk', id: 1496153 }
        ];

        this.selectDataCity = [];
    }

    changeCities(cities) {
        Actions.updateCities(cities);
    }

    onSelect(event) {
        if (localStorage.length > 0) {
            this.selectDataCity = localStorage.getItem('selectDataCity').split(',');
        }

        this.selectDataCity.push(event.params.data.id);
        this.changeCities(this.selectDataCity);
    }

    onUnselect(event) {
        if (localStorage.length > 0) {
            this.selectDataCity = localStorage.getItem('selectDataCity').split(',');
        }

        this.selectDataCity.splice(this.selectDataCity.indexOf(event.params.data.id), 1);
        this.changeCities(this.selectDataCity);
    }

    render() {
        return (
            <Select2
                multiple
                onSelect={this.onSelect.bind(this)}
                onUnselect={this.onUnselect.bind(this)}
                data={this.dataCity}
                value={localStorage.length > 0 ? localStorage.getItem('selectDataCity').split(',') : []}
                options={{
                    placeholder: 'Выберите город'
                  }}
            />
        );
    }
}