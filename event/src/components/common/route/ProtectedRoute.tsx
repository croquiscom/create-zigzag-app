import React, { useContext } from 'react';
import Context from '../../context/appReducerContext';
import { Route, Redirect } from 'react-router-dom';
import ZigzagAppAction from '../../../utils/ZigzagAppAction';

const zigzag_app_store_url = 'https://zigzag.onelink.me/4107287618/30d5a1a8';

const ProtectedRoute = ({ component: Component, ...rest }: any) => {
  const { state } = useContext(Context);
  const is_zigzag_app = ZigzagAppAction.isZigzag();
  if(is_zigzag_app) {
    window.location.href = zigzag_app_store_url;
  }  

  const { is_authorized_user } = state;
  if(!is_authorized_user) {
    //인증된 유저가 아닐 때 다른 라우팅 설정이 필요한 경우 <Redirect to={...} />
  }

  return(
    <Route render={props => <Component {...props} {...rest} />} />
  )
};

export default ProtectedRoute;
