import { initState } from "./state";

export function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    let vm = this;
    vm.$options = options; // 将用户传入的options参数挂载到vm上
    // 初始化状态
    initState(vm);
  };
}
