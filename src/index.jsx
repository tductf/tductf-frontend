import React from 'react';
import Router from 'react-router';
import {Provider} from 'react-redux';
import Store from './js/store'
import Login from './js/login';
import Dashboard from './js/dashboard';
import Problems from './js/problems';
import Problem from './js/problem';
import Ranking from './js/ranking';
import Announcements from './js/announcements';
import Main from './js/main';
import {Top} from './js/top';

var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;

var routes = (
		<Route path="/" handler={Top}>
			<Route path="/login" handler={Login} />
			<Route name="main" handler={Main}>
				<Route name="dashboard" handler={Dashboard}/>
				<Route name="problems" path="/problems" handler={Problems}>
				</Route>
					<Route name="problem" path="/problems/:id" handler={Problem}/>
				<Route name="ranking" handler={Ranking}/>
				<Route name="announcements" handler={Announcements}/>
				<DefaultRoute handler={Dashboard}/>
			</Route>
			<DefaultRoute handler={Login}/>
		</Route>
		);

Router.run(routes, (Handler, routerState) => {
	React.render((
			<Provider store={Store}>
				{() => <Handler routerState={routerState} />}
			</Provider>
		), document.getElementById("content"));
})
