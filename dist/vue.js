(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
})(this, (function () { 'use strict';

  function _typeof(o) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }

  function observe(value) {
    // 如果value不是对象，什么都不做
    if (_typeof(value) !== "object") return;
    // 如果value是对象，创建Observer实例，对数据进行监控
    return new Observer(value);
  }
  var Observer = /*#__PURE__*/function () {
    function Observer(value) {
      _classCallCheck(this, Observer);
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
    _createClass(Observer, [{
      key: "walk",
      value: function walk(obj) {
        Object.keys(obj).forEach(function (key) {
          defineReactive(obj, key, obj[key]);
        });
      }
      // 遍历数组中的每一项，依次进行监控
    }, {
      key: "observeArray",
      value: function observeArray(arr) {
        arr.forEach(function (item) {
          return observe(item);
        });
      }
    }]);
    return Observer;
  }();
  function defineReactive(obj, key, val) {
    // 如果val是对象，递归调用observe
    observe(val);
    Object.defineProperty(obj, key, {
      get: function get() {
        return val;
      },
      set: function set(newVal) {
        if (newVal === val) return;
        // 如果newVal是对象，递归调用observe
        observe(newVal);
        val = newVal;
      }
    });
  }

  function initState(vm) {
    var opts = vm.$options;
    if (opts.props) ;
    if (opts.data) {
      initData(vm);
    }
    if (opts.computed) ;
    if (opts.watch) ;
    if (opts.methods) ;
  }
  function initData(vm) {
    // 获取用户传入的data
    var data = vm.$options.data;
    // 判断data的类型，如果是函数，取函数的返回值作为对象，如果是对象，直接使用
    data = vm._data = typeof data === "function" ? data.call(vm) : data || {};
    // 监控数据
    observe(data);
  }

  function initMixin(Vue) {
    Vue.prototype._init = function (options) {
      let vm = this;
      vm.$options = options; // 将用户传入的options参数挂载到vm上
      // 初始化状态
      initState(vm);
    };
  }

  function Vue(options) {
    this._init(options);
  }
  initMixin(Vue);

  return Vue;

}));
//# sourceMappingURL=vue.js.map
