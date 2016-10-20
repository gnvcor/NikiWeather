'use strict';

import React, { Component } from 'react';
import MDSpinner from "react-md-spinner";
import Request from 'react-http-request';
import MyCityComponent from './MyCityComponent.jsx';
import SelectCityComponent from './SelectCityComponent.jsx';
import ViewCityComponent from './ViewCityComponent.jsx';

export default class KernelComponent extends Component {
    constructor() {
        super();

        this.state = {
            lat: 0,
            lng: 0,
            spinner: 0,
            search: '',
            selectedCoordinate: null
        }
    }

    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.successFunction.bind(this), this.errorFunction);
        }
    }

    successFunction(position) {
        if (position != null) {
            this.setState({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                spinner: 1
            });
        }
    }

    errorFunction() {
        console.log("Ошибка!");
    }

    componentDidMount() {
        this.getLocation();
    }

    render() {
        let content;

        if (this.state.spinner == 0) {
            content = <MDSpinner />;
        } else {
            let url ='http://api.openweathermap.org/data/2.5/weather?lat='+this.state.lat+'&lon='+this.state.lng+'&appid=b67b2286d965a0d5112c75d319e4fde0';
            content = <Request
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
                                        return (
                                            <div className="blocks-component">
                                                <div className="blocks-component__item blocks-component__item--left">
                                                    <MyCityComponent data={result} />
                                                </div>
                                                <div className="blocks-component__item blocks-component__item--right">
                                                    <div className="blocks-component__item-top">
                                                        <SelectCityComponent />
                                                    </div>
                                                    <div className="blocks-component__item-bottom">
                                                        <ViewCityComponent />
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    }
                                }
                            }
                        </Request>
        }

        return (
            <div className="cont">
                {content}
            </div>
        )
    }
};