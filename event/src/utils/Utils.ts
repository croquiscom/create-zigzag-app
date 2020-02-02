require('es6-shim');

import _ from 'lodash-es';

export default class Utils {

  static getValidatedPhoneNumber(inputNumberWithDash: string): { validated: boolean, phoneNumber: string } {
    let result = '';
    const phoneNumber = inputNumberWithDash.replace(/\-/g, '');
    if (phoneNumber.length > 0) {
      const weakTestRegExp = /^([0-9]{0,11})$/;
      const tested = weakTestRegExp.test(phoneNumber);
      if (!tested) {
        throw new Error(inputNumberWithDash + ', phone number is not valid.');
      }

      let updatedNumber = phoneNumber.substring(0, 3);
      if (phoneNumber.length > 3) {
        updatedNumber += '-';
      }

      const secondPartLastPos = 7;
      updatedNumber += phoneNumber.substring(3, secondPartLastPos);
      if (phoneNumber.length > 7) {
        updatedNumber += '-';
      }

      if (phoneNumber.length > secondPartLastPos) {
        updatedNumber += phoneNumber.substring(secondPartLastPos, 11);
      }
      result = updatedNumber;

    }

    const regExp = /(01[016789])([1-9]{1}[0-9]{2,3})([0-9]{4})$/;
    return { validated: regExp.test(phoneNumber), phoneNumber: result };
  }

  static isZigzag() {
    const w: any = window;
    return w.zigzag
      || (w.webkit && w.webkit.messageHandlers && w.webkit.messageHandlers.zigzag);
  }

  static isFacebookIosApp() {
    let ua = navigator.userAgent;
    ua = ua.toLowerCase();
    return _.includes(ua, 'ios') && _.includes(ua, 'fban');
  }

  static isFacebookAndroidApp() {
    let ua = navigator.userAgent;
    ua = ua.toLowerCase();
    return _.includes(ua, 'android') && _.includes(ua, 'fbav');
  }

  static padDate(d: number) {
    return (d < 10) ? '0' + d.toString() : d.toString();
  }

  static getTransitionEndEvent(dom: HTMLElement | null) {
    let transition;
    if ('ontransitionend' in window) {
      // Firefox
      transition = 'transitionend';
    } else if ('onwebkittransitionend' in window) {
      // Chrome/Saf (+ Mobile Saf)/Android
      transition = 'webkitTransitionEnd';
    } else if ((dom && 'onotransitionend' in dom) || navigator.appName === 'Opera') {
      // Opera
      // As of Opera 10.61, there is no "onotransitionend" property added to DOM elements,
      // so it will always use the navigator.appName fallback
      transition = 'oTransitionEnd';
    } else {
      // IE - not implemented (even in IE9) :(
      transition = '';
    }
    return transition;
  }
}
