import { observe } from "./observer/index.js";
import { proxy } from "./utils.js";

export function initState(vm) {
  let opts = vm.$options;
  // 判断
  if (opts.props) {
    initProps(vm);
  }
  if (opts.data) {
    initData(vm);
  }
  if (opts.computed) {
    initComputed(vm);
  }
  if (opts.watch) {
    initWatch(vm);
  }
  if (opts.methods) {
    initMethods(vm);
  }
}

function initProps(vm) {}

function initData(vm) {
  // 数据初始化
  let data = vm.$options.data;
  // 判断data是不是函数
  // 这里的initData是一个普通函数，不是Vue实例或原型链的方法，所以这里的this不是指向Vue实例
  data = vm._data = typeof data === "function" ? data.call(vm) : data;
  // 将data中的数据全部代理到vm实例上
  for (let key in data) {
    proxy(vm, "_data", key);
  }
  // 数据代理
  observe(data);
}

function initComputed(vm) {}

function initWatch(vm) {}

function initMethods(vm) {}
