import React, { useReducer, useContext } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch
} from 'react-router-dom';

import App from './App';
import ProtectedRoute from './common/route/ProtectedRoute';
import { Context } from './context/appContext';
import ReducerContext from './context/appReducerContext';
import reducer from './reducer/appReducer';
import '../styles/reset.scss';

const Root = () => {

  const initialState = useContext(Context);
  const [state, dispatch] = useReducer(reducer, initialState);
  const initContextValue = { state, dispatch };

  return (
    <Router>
      <ReducerContext.Provider value={initContextValue}>
        <ProtectedRoute exact path="/" component={App}/>
      </ReducerContext.Provider>
    </Router>
  );
};

ReactDOM.render(<Root />, document.getElementById("app"));