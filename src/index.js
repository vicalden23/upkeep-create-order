import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';

import WorkOrders from './components/workOrders';
import WorkForm from './components/workForm';

import './index.css';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

ReactDOM.render(
	<BrowserRouter>
		<Switch>
			<Route exact path='/' component={WorkForm} />
			<Route exact path='/orders' component={WorkOrders} />
		</Switch>
	</BrowserRouter>, 
	document.getElementById('root'));
registerServiceWorker();
