import React from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import './reset.scss';
import Header from './header/Header';
import Footer from './footer/Footer';
import Home from './pages/home/Home';
import Menu1 from './pages/menu1/Menu1';
import Menu2 from './pages/menu2/Menu2';
import Menu3 from './pages/menu3/Menu3';
import Menu4 from './pages/menu4/Menu4';

render((
  <Router>
    <Header />
    <article style={{ paddingTop: '5rem', minHeight: 'calc(100% - 5rem)' }}>
      <Switch>
        <Route path='/menu1'>
          <Menu1 />
        </Route>
        <Route path='/menu2'>
          <Menu2 />
        </Route>
        <Route path='/menu3'>
          <Menu3 />
        </Route>
        <Route path='/menu4'>
          <Menu4 />
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </article>
    <Footer />
  </Router>
), document.getElementById('app'));
