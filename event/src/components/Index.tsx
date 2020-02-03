import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch
} from 'react-router-dom';

import App from './App';
import ProtectedRoute from './common/route/ProtectedRoute';
import '../styles/reset.scss';
import ContextProvider from '../context/ContextProvider';

const Root = () => {
  return (
    <Router>
      <ContextProvider>
        <Switch>
          <ProtectedRoute exact path="/" component={App}/>
        </Switch>
      </ContextProvider>
    </Router>
  );
};

ReactDOM.render(<Root />, document.getElementById("app"));