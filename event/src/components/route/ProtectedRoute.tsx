import React from 'react';
import { Route } from 'react-router-dom';
import ZigzagAppAction from '../../utils/ZigzagAppAction';
import { ZIGZAG_APP_STORE_URL } from '../../constants/urls';

const toZigzagBridge = (url: string) => url && window.location.replace(url);
const toZigzagAppStore = () => {
  if(STAGE !== 'development') {
    //개발모드일 때를 제외하고 웹으로 접근 시 스토어 url로 강제이동
    window.location.href = ZIGZAG_APP_STORE_URL;
  } 
};

const ProtectedRoute = ({ toBridge = false, bridge_url = '', component: Component, ...rest }: any) => {
  const is_zigzag_app = ZigzagAppAction.isZigzag();
  if(!is_zigzag_app) { 
    //TODO: 브릿지 페이지 이동이 필요한 경우 분기처리하는 내용 추가예정.
    toBridge ?  toZigzagBridge(bridge_url) : toZigzagAppStore(); 
  }

  return(
    <Route render={props => <Component {...props} {...rest} />} />
  )
};

export default ProtectedRoute;
