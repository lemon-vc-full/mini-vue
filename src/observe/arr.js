// 重写数组方法
let oldArrayProtoMethods = Array.prototype;
// 创建一个全新的对象，可以找到数组原型上的方法
export let arrayMethods = Object.create(oldArrayProtoMethods);
// 要重写的7个数组方法
let methods = ["push", "shift", "unshift", "pop", "reverse", "sort", "splice"];

methods.forEach((method) => {
  arrayMethods[method] = function (...args) {
    // 调用数组原生的方法
    let result = oldArrayProtoMethods[method].apply(this, args);
    return result;
  };
});
