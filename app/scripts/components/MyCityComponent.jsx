'use strict';

import React, { Component } from 'react';

export default class MyCityComponent extends Component {
    constructor(props) {
        super();

        this.data = JSON.parse(props.data.text);
    }


    render() {
        return(
            <div className="data">
                <div className="data__item">
                    <div className="data__title">Ваш город:</div>
                    <div className="data__value">{this.data.name}</div>
                </div>

                <div className="data__item">
                    <div className="data__title">Температура воздуха:</div>
                    <div className="data__value">{(this.data.main.temp - 273.15).toFixed(1)}, °C</div>
                </div>

                <div className="data__item">
                    <div className="data__title">Давление воздуха:</div>
                    <div className="data__value">{this.data.main.pressure}, мм рт. ст.</div>
                </div>

                <div className="data__item">
                    <div className="data__title">Влажность воздуха:</div>
                    <div className="data__value">{this.data.main.humidity}, %</div>
                </div>

                <div className="data__item">
                    <div className="data__title">Скорость ветра:</div>
                    <div className="data__value">{this.data.wind.speed}, м/с</div>
                </div>
            </div>
        );
    }
}