interface ZpayHandler {
  handleBackClick: () => void;
  handleCloseClick: () => void;
  onMessage: (message: string, origin?: string) => void;
}

type callZPayFunctionName = 'toast' | 'login' | 'loginWithRedirectUrl' | 'open' | 'back' | 'close' | 'addOrder' | 'deleteOrder' | 'updateOrder' | 'addCart' | 'deleteCart' | 'sendMarketingEvent' | 'setTitle' | 'createOrderSheet' | 'postMessage';

export enum ZpayPostMessageType {
  TEST = 'test',
  REFRESH_SIMPLE_BANK_ACCOUNT_LIST = 'refresh_simple_bank_account_list',
  PURCHASE_BY_SIMPLE_PAY = 'purchase_by_simple_pay',
  PURCHASE_ORDER_SHEET_BY_SIMPLE_PAY = 'purchase_order_sheet_by_simple_pay',
}

function getZpayHandler() {
  if (window) {
    const browser_window: any = window;

    if (!browser_window.zpayHandler) {
      browser_window.zpayHandler = {
        handleBackClick: () => callZPayFunction('back'),
        handleCloseClick: () => callZPayFunction('close'),
        onMessage: () => { /** */ },
      };
    }
    if (browser_window.zpayHandler) {
      return browser_window.zpayHandler as ZpayHandler;
    }
  }

  return null;
}

export function overwriteBack(callback: (back: () => void) => void) {
  const zpayHandler = getZpayHandler();
  if (zpayHandler) {
    zpayHandler.handleBackClick = () => {
      callback(() => callZPayFunction('back'));
      return true;
    };
  }
}

export function overwriteClose(callback: (close: () => void) => void) {
  const zpayHandler = getZpayHandler();
  if (zpayHandler) {
    zpayHandler.handleCloseClick = () => {
      callback(() => callZPayFunction('close'));
      return true;
    };
  }
}

export function overwriteOnMessage(callback: (type: ZpayPostMessageType, message: any, origin?: string) => void) {
  const zpayHandler = getZpayHandler();
  if (zpayHandler) {
    zpayHandler.onMessage = (message, origin) => {
      if (origin === '*' || window.location.origin === origin) {
        const data = JSON.parse(message);
        const type = data.type as ZpayPostMessageType;
        callback(type, data, origin);
      }
    };
  }
}

export function callZPayFunction(
  function_name: callZPayFunctionName,
  args?: object,
) {
  try {
    if (window) {
      const browser_window: any = window;
      if (browser_window.zpay && browser_window.zpay[function_name]) {
        browser_window.zpay[function_name](...Object.values(args || {}));
        return true;
      }
      if (browser_window.webkit && browser_window.webkit.messageHandlers && browser_window.webkit.messageHandlers.zpay) {
        if (function_name === 'createOrderSheet' && !canZpayAppVersion('6.0.1')) {
          return false;
        }
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

interface MarketingEventParam {
  item_list: Array<{ shop_main_domain: string, product_no: string }>;
}

function sendMarketingEvent(type: string, params: MarketingEventParam) {
  params.item_list = params.item_list.map((i) => {
    const product_no = `${i.shop_main_domain}$${i.product_no}`;
    delete i.shop_main_domain;
    return { ...i, product_no };
  });
  callZPayFunction('sendMarketingEvent', { data: JSON.stringify({ type, ...params }) });
}

export const ZpayMarketingEvent = {
  addCart: (params: {
    item_list: Array<{ shop_main_domain: string, product_no: string, product_item_id: string, quantity: number }>,
  }) => sendMarketingEvent('ADD_CART', params),
  addOrder: (params: {
    order_number: string,
    item_list: Array<{ shop_main_domain: string, product_no: string, product_item_id: string, quantity: number, price: number }>,
    total_amount: number,
    points_used: number,
  }) => sendMarketingEvent('ADD_ORDER', params),
};

function sendPostMessageEvent(type: ZpayPostMessageType, data: any = {}) {
  const targetOrigin = window ? location.origin : '';
  return callZPayFunction('postMessage', { message: JSON.stringify({ type, ...data }), targetOrigin });
}

export const ZpayEvent = {
  back: () => callZPayFunction('back'),
  loginWithRedirectUrl: (url: string) => callZPayFunction('loginWithRedirectUrl', { url }),
  login: () => callZPayFunction('login'),
  addCart: () => callZPayFunction('addCart'),
  deleteCart: () => callZPayFunction('deleteCart'),
  addOrder: (order_number: string) => callZPayFunction('addOrder', { order_number }),
  close: () => callZPayFunction('close'),
  deleteOrder: (order_number: string) => callZPayFunction('deleteOrder', { order_number }),
  updateOrder: (order_number: string) => callZPayFunction('updateOrder', { order_number }),
  setTitle: (title: string) => callZPayFunction('setTitle', { title }),
  refreshSimpleBankAccountList: () => sendPostMessageEvent(ZpayPostMessageType.REFRESH_SIMPLE_BANK_ACCOUNT_LIST),
  purchaseBySimplePay: (password: string) => sendPostMessageEvent(ZpayPostMessageType.PURCHASE_BY_SIMPLE_PAY, { password }),
  purchaseOrderSheetBySimplePay: (order_sheet_uuid: string, password: string) => sendPostMessageEvent(ZpayPostMessageType.PURCHASE_ORDER_SHEET_BY_SIMPLE_PAY, { order_sheet_uuid, password }),
  testPostMessage: (text: string) => sendPostMessageEvent(ZpayPostMessageType.TEST, { text }),
};

function callZigzagFunction(
  function_name: 'se' | 'sual' | 'st' | 'tt',
  message: string,
) {
  try {
    if (window) {
      const browser_window: any = window;
      if (browser_window.zigzag && browser_window.zigzag[function_name]) {
        browser_window.zigzag[function_name](message);
      } else if (browser_window.webkit && browser_window.webkit.messageHandlers && browser_window.webkit.messageHandlers.zigzag) {
        const args = {
          ...(function_name === 'se' && { event: message }),
          ...(function_name === 'sual' && { log: message }),
          ...(function_name === 'st' && { title: message }),
          ...(function_name === 'tt' && { message }),
        };
        browser_window.webkit.messageHandlers.zigzag.postMessage(`js2ios://${JSON.stringify({ functionname: function_name, args })}`);
      }
    }
  } catch (error) {
    console.log('callZigzagFunction error', error);
  }
}

export const ZigzagEvent = {
  sual: (message: string) => callZigzagFunction('sual', `action/${message}`),
  sual_app: (message: string) => callZigzagFunction('sual', `app/${message}`),
  st: (title: string) => callZigzagFunction('st', title),
  tt: (message: string) => callZigzagFunction('tt', message),
};

export function checkZPayFunctionExists(browser_window: any) {
  return Boolean(browser_window.zpay || (browser_window.webkit && browser_window.webkit.messageHandlers && browser_window.webkit.messageHandlers.zpay));
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

export function isAndroid() {
  return navigator.userAgent && /(android)/i.test(navigator.userAgent);
}

export function canZpayAppVersion(version: string): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  if (!(window as any).zigzagAppVersion) {
    return false;
  }

  return compareVersion((window as any).zigzagAppVersion, version) >= 0;
}

function alertOrLog(function_name: string, message: string) {
  if (typeof alert !== 'undefined') {
    alert(message);
  } else {
    console.log(`${function_name}: ${message}`);
  }
}

const Toast = {
  show: (message: string) => {
    if (!callZPayFunction('toast', { message })) {
      alertOrLog('callZPayToast', message);
    }
  },
};

type DialogMessage = string | { title?: string, message: string, ok?: string, cancel?: string, type?: 'complete' };

function getDialogMessage(message: DialogMessage): string {
  if (typeof message === 'object') {
    if (window && checkZPayFunctionExists(window)) {
      return JSON.stringify(message);
    } else {
      return message.message;
    }
  } else {
    return message;
  }
}

const Dialog = {
  alert: (message: DialogMessage) => {
    if (window) {
      alert(getDialogMessage(message));
    }
  },
  confirm: (message: DialogMessage) => {
    if (window) {
      return confirm(getDialogMessage(message));
    }
    return true;
  },
};

export { Dialog, Toast };
