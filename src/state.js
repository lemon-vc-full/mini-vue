import { observe } from "./observe/index.js";

export function initState(vm) {
  let opts = vm.$options;
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
  // 获取用户传入的data
  let data = vm.$options.data;
  // 判断data的类型，如果是函数，取函数的返回值作为对象，如果是对象，直接使用
  data = vm._data = typeof data === "function" ? data.call(vm) : data || {};
  // 监控数据
  observe(data);
}

function initComputed(vm) {}

function initWatch(vm) {}

function initMethods(vm) {}