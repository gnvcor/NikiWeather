'use strict';

import ReactDOM from 'react-dom';
import KernelComponent from './components/KernelComponent.jsx'

let appId = document.getElementById('app');

if (appId) {
    ReactDOM.render(<KernelComponent />, appId);
}