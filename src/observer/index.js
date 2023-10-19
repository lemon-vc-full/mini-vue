import { arrayMethods } from "./array";

class Observer {
  constructor(value) {
    /**
     * 给value添加一个__ob__属性，这个属性不能被枚举，防止死循环
     * __ob__属性的值是Observer实例，类中的this指向的就是实例
     */
    Object.defineProperty(value, "__ob__", {
      value: this,
      enumerable: false,
    });
    // 如果是数组的话并不会对索引进行观测，因为会导致性能问题
    if (Array.isArray(value)) {
      // 设置原型，让数组通过原型链查找的方法变成重写后的方法
      Object.setPrototypeOf(value, arrayMethods);
      // 遍历数组中的每一项进行递归观测
      this.observeArray(value);
    } else {
      this.walk(value);
    }
  }
  // 对象的观测，对每个属性进行观测
  walk(data) {
    let keys = Object.keys(data);
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      let value = data[key];
      defineReactive(data, key, value);
    }
  }
  // 数组的特殊遍历，如果是对象类型会被直接观测
  observeArray(value) {
    for (let i = 0; i < value.length; i++) {
      observe(value[i]);
    }
  }
}

// 观测数据
export function observe(data) {
  // 如果不是对象或者数组，就不用观测了，直接返回
  if (typeof data !== "object" || data === null) {
    return data;
  }
  // 如果是对象或者数组，就创建一个Observer实例
  return new Observer(data);
}

// 定义响应式数据
function defineReactive(data, key, value) {
  // 递归，如果value是对象的话，继续观测
  observe(value);
  Object.defineProperty(data, key, {
    get() {
      return value;
    },
    set(newValue) {
      if (newValue === value) return;
      // 如果用户设置的是对象，那么继续观测
      observe(newValue);
      value = newValue;
    },
  });
}
