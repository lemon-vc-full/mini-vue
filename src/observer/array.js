// 获取原来数组方法
let oldArrayProtoMethods = Array.prototype;

// 继承一下
export let arrayMethods = Object.create(oldArrayProtoMethods);

// 要重写的方法
let methods = ["push", "shift", "unshift", "pop", "reverse", "sort", "splice"];

methods.forEach((method) => {
  arrayMethods[method] = function (...args) {
    // 调用原来的方法,这里的this指向的是数组
    let result = oldArrayProtoMethods[method].call(this, ...args);
    // 如果用户调用的是push、unshift、splice这三个方法，那么插入的值也有可能是对象，应该被观测
    let inserted;
    switch (method) {
      // push、unshift都是追加，所以args就是插入的值
      case "push":
      case "unshift":
        inserted = args;
        break;
      // splice(start, deleteCount, inserted) 从第三个参数开始才是插入的值
      case "splice":
        inserted = args.slice(2);
        break;
    }
    // 获取这个数组对应的Observer实例
    let ob = this.__ob__;
    // 如果有插入的值，那么需要观测
    if (inserted) {
      ob.observeArray(inserted);
    }
    return result;
  };
});
