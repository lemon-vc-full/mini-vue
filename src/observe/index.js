import { arrayMethods } from "./array";

export function observe(value) {
  // 如果value不是对象，什么都不做
  if (typeof value !== "object") return;
  // 如果value是对象，创建Observer实例，对数据进行监控
  return new Observer(value);
}

class Observer {
  constructor(value) {
    // 判断数据类型，如果是数组，调用数组的方法进行重写
    if (Array.isArray(value)) {
      // 重写数组的方法
      Object.setPrototypeOf(value, arrayMethods);
      // 对数组中的每一项进行监控
      this.observeArray(value);
    } else {
      // 如果是对象，调用walk方法进行监控
      this.walk(value);
    }
  }
  // 遍历对象的所有属性，依次进行监控
  walk(obj) {
    Object.keys(obj).forEach((key) => {
      defineReactive(obj, key, obj[key]);
    });
  }
  // 遍历数组中的每一项，依次进行监控
  observeArray(arr) {
    arr.forEach((item) => observe(item));
  }
}

function defineReactive(obj, key, val) {
  // 如果val是对象，递归调用observe
  observe(val);
  Object.defineProperty(obj, key, {
    get() {
      return val;
    },
    set(newVal) {
      if (newVal === val) return;
      // 如果newVal是对象，递归调用observe
      observe(newVal);
      val = newVal;
    },
  });
}
