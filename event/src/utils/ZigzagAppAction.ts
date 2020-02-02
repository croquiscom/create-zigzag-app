
type callZPayFunctionName = 'toast' | 'login' | 'fual' | 'sual';

export default class ZigzagAppAction {

  static fual() {
    callZigzagFunction('fual');
  }

  static login() {
    callZpayFunction('login');
  }

  static toast(message: string) {
    if (!callZpayFunction('toast', { message })) {
      alertOrLog('callZPayToast', message);
    }
  }

  static showConfirmDialog(type: 'warning' | 'confirm', title: string, message: string, confirm_text: string, cancel_text: string) {
    const confirm_data = {
      type,
      title,
      message,
      ok: confirm_text,
      cancel: cancel_text,
    };
    return window.confirm(JSON.stringify(confirm_data));
  }

  static showAlertDialog(type: 'warning' | 'confirm', title: string, message: string, confirm_text: string = '확인') {
    const confirm_data = {
      type,
      title,
      message,
      ok: confirm_text,
    };
    return window.alert(JSON.stringify(confirm_data));
  }

  static isZigzag() {
    const w: any = window;
    return w.zigzag
      || (w.webkit && w.webkit.messageHandlers && w.webkit.messageHandlers.zigzag);
  }

  static fualLogEvent() {
    if (typeof window !== 'undefined') {
      const browser_window: any = window;
      if (browser_window.zigzag && browser_window.zigzag.fual) {
        browser_window.zigzag.fual();
      } else if (browser_window.webkit && browser_window.webkit.messageHandlers && browser_window.webkit.messageHandlers.zigzag && browser_window.webkit.messageHandlers.zigzag.postMessage) {
        const callInfo = { functionname: 'fual' };
        const url = 'js2ios://' + JSON.stringify(callInfo);
        browser_window.webkit.messageHandlers.zigzag.postMessage(url);
      } else {
        console.log('zigzag://fual 호출');
      }
    }
  }

  static logEvent(log: string) {
    if (typeof window !== 'undefined') {
      const browser_window: any = window;
      if (browser_window.zigzag && browser_window.zigzag.sual) {
        browser_window.zigzag.sual(log);
      } else if (browser_window.webkit && browser_window.webkit.messageHandlers && browser_window.webkit.messageHandlers.zigzag && browser_window.webkit.messageHandlers.zigzag.postMessage) {
        const args = { log };
        const callInfo = { functionname: 'sual', args };
        const url = 'js2ios://' + JSON.stringify(callInfo);
        browser_window.webkit.messageHandlers.zigzag.postMessage(url);
      } else {
        console.log('zigzag://' + log);
      }
    }
  }

  static canUseZigZagFunction(): boolean {
    if (typeof window !== 'undefined') {
      const browser_window: any = window;
      if (browser_window.zigzag) {
        return true;
      }
      if (browser_window.webkit && browser_window.webkit.messageHandlers && browser_window.webkit.messageHandlers.zigzag) {
        return true;
      }
    }

    return false;
  }

  static canUseZpayFunction(): boolean {
    if (typeof window !== 'undefined') {
      const browser_window: any = window;
      if (browser_window.zpay) {
        return true;
      }
      if (browser_window.webkit && browser_window.webkit.messageHandlers && browser_window.webkit.messageHandlers.zpay) {
        return true;
      }
    }

    return false;
  }

  static isAndroid() {
    return navigator.userAgent && /(android)/i.test(navigator.userAgent);
  }
}

export function callZigzagFunction(
  function_name: callZPayFunctionName,
  args?: object,
) {
  try {
    if (typeof window !== 'undefined') {
      const browser_window: any = window;
      if (browser_window.zigzag && browser_window.zigzag[function_name]) {
        browser_window.zigzag[function_name](...Object.values(args || {}));
        return true;
      }
      if (browser_window.webkit && browser_window.webkit.messageHandlers && browser_window.webkit.messageHandlers.zigzag) {
        const data = {
          function_name,
          ...(args && { args }),
        };
        browser_window.webkit.messageHandlers.zigzag.postMessage(data);
        return true;
      }
    }
    return false;
  } catch (error) {
    console.log('callZPayFunction error', error);
  }
}

export function callZpayFunction(
  function_name: callZPayFunctionName,
  args?: object,
) {
  try {
    if (typeof window !== 'undefined') {
      const browser_window: any = window;
      if (browser_window.zpay && browser_window.zpay[function_name]) {
        browser_window.zpay[function_name](...Object.values(args || {}));
        return true;
      }
      if (browser_window.webkit && browser_window.webkit.messageHandlers && browser_window.webkit.messageHandlers.zpay) {
        const data = {
          function_name,
          ...(args && { args }),
        };
        browser_window.webkit.messageHandlers.zpay.postMessage(data);
        return true;
      }
    }
    return false;
  } catch (error) {
    console.log('callZPayFunction error', error);
  }
}

export function canZigzagAppVersion(version: string): any {

  if (typeof window === 'undefined') {
    return false;
  }

  if (!(window as any).zigzagAppVersion) {
    return false;
  }

  return compareVersion((window as any).zigzagAppVersion, version) > -1;
}

function compareVersion(v1: string, v2: string) {
  const v1_parts = v1.split('.').map((v) => Number(v.replace(/\D+/g, '')));
  const v2_parts = v2.split('.').map((v) => Number(v.replace(/\D+/g, '')));

  for (let i = 0; i < v2_parts.length; i++) {
    if (v2_parts.length === i) {
      return 1;
    }

    if (v1_parts[i] === v2_parts[i]) {
      continue;
    } else if (v1_parts[i] > v2_parts[i]) {
      return 1;
    } else {
      return -1;
    }
  }

  if (v1_parts.length !== v2_parts.length) {
    return -1;
  }

  return 0;
}

function alertOrLog(function_name: string, message: string) {
  if (typeof alert !== 'undefined') {
    alert(message);
  } else {
    console.log(`${function_name}: ${message}`);
  }
}
