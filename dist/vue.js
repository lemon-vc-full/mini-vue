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

  // 获取原来数组方法
  var oldArrayProtoMethods = Array.prototype;

  // 继承一下
  var arrayMethods = Object.create(oldArrayProtoMethods);

  // 要重写的方法
  var methods = ["push", "shift", "unshift", "pop", "reverse", "sort", "splice"];
  methods.forEach(function (method) {
    arrayMethods[method] = function () {
      var _oldArrayProtoMethods;
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      // 调用原来的方法,这里的this指向的是数组
      var result = (_oldArrayProtoMethods = oldArrayProtoMethods[method]).call.apply(_oldArrayProtoMethods, [this].concat(args));
      // 如果用户调用的是push、unshift、splice这三个方法，那么插入的值也有可能是对象，应该被观测
      var inserted;
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
      var ob = this.__ob__;
      // 如果有插入的值，那么需要观测
      if (inserted) {
        ob.observeArray(inserted);
      }
      return result;
    };
  });

  var Observer = /*#__PURE__*/function () {
    function Observer(value) {
      _classCallCheck(this, Observer);
      /**
       * 给value添加一个__ob__属性，这个属性不能被枚举，防止死循环
       * __ob__属性的值是Observer实例，类中的this指向的就是实例
       */
      Object.defineProperty(value, "__ob__", {
        value: this,
        enumerable: false
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
    _createClass(Observer, [{
      key: "walk",
      value: function walk(data) {
        var keys = Object.keys(data);
        for (var i = 0; i < keys.length; i++) {
          var key = keys[i];
          var value = data[key];
          defineReactive(data, key, value);
        }
      }
      // 数组的特殊遍历，如果是对象类型会被直接观测
    }, {
      key: "observeArray",
      value: function observeArray(value) {
        for (var i = 0; i < value.length; i++) {
          observe(value[i]);
        }
      }
    }]);
    return Observer;
  }(); // 观测数据
  function observe(data) {
    // 如果不是对象或者数组，就不用观测了，直接返回
    if (_typeof(data) !== "object" || data === null) {
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
      get: function get() {
        return value;
      },
      set: function set(newValue) {
        if (newValue === value) return;
        // 如果用户设置的是对象，那么继续观测
        observe(newValue);
        value = newValue;
      }
    });
  }

  function proxy(vm, source, key) {
    Object.defineProperty(vm, key, {
      get: function get() {
        return vm[source][key];
      },
      set: function set(newValue) {
        vm[source][key] = newValue;
      }
    });
  }

  function initState(vm) {
    var ops = vm.$options;
    // 判断
    if (ops.props) ;
    if (ops.data) {
      initData(vm);
    }
    if (ops.computed) ;
    if (ops.watch) ;
    if (ops.methods) ;
  }
  function initData(vm) {
    // 数据初始化
    var data = vm.$options.data;
    // 判断data是不是函数
    // 这里的initData是一个普通函数，不是Vue实例或原型链的方法，所以这里的this指向是undefined
    data = vm._data = typeof data === "function" ? data.call(vm) : data;
    // 将data中的数据全部代理到vm实例上
    for (var key in data) {
      proxy(vm, "_data", key);
    }
    // 数据代理
    observe(data);
  }

  function initMixin(Vue) {
    Vue.prototype._init = function (options) {
      var vm = this;
      vm.$options = options;
      // 初始化状态
      initState(vm);
    };
  }

  function Vue(options) {
    // 初始化
    this._init(options);
  }
  initMixin(Vue);

  return Vue;

}));
//# sourceMappingURL=vue.js.map
