'use strict';

import React, { Component } from 'react';
import Store from '../stores/Store';
import MDSpinner from "react-md-spinner";
import Request from 'react-http-request';

export default class ViewCityComponent extends Component {
    constructor() {
        super();

        this.state = {
            cities: Store.getState().cities
        }
    }

    componentDidMount() {
        Store.listen(this.onChange.bind(this));
    };

    componentWillUnmount() {
        Store.unlisten(this.onChange.bind(this));
    }

    onChange(store) {
        this.setState({
            cities: store.cities
        });
    }

    render() {
        if (this.state.cities[0] == '') {
            this.state.cities.splice('', 1);
        }

        return(
            <div className="select-city-block">
                {this.state.cities.map((cities, i) => {
                    console.log(cities);
                    let url ='http://api.openweathermap.org/data/2.5/weather?id='+cities+'&appid=b67b2286d965a0d5112c75d319e4fde0';
                    return (
                        <div className="select-city-block__item" key={i}>
                            <Request
                                url={url}
                                method='get'
                                accept='application/json'
                                verbose={true}
                            >
                                {
                                    ({error, result, loading}) => {
                                        if (loading) {
                                            return <MDSpinner />;
                                        } else {
                                            let data = JSON.parse(result.text);
                                            return (
                                                <span>
                                                    <i>{data.name}</i> (<i>{(data.main.temp - 273.15).toFixed(1)}</i>, °C / <i>{data.main.pressure}</i>, мм рт. ст. / <i>{data.main.humidity}</i>, % / <i>{data.wind.speed}</i>, м/с)
                                                </span>
                                            );
                                        }
                                    }
                                }
                            </Request>
                        </div>
                    );
                })}
            </div>
        )
    }
}