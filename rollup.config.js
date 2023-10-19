import babel from "rollup-plugin-babel";
import serve from "rollup-plugin-serve";

export default {
  input: "./src/index.js",
  output: {
    file: "dist/vue.js", // 打包后的文件名
    format: "umd", // 模块化类型，在window上挂载一个属性Vue
    name: "Vue", // 打包后全局变量的名字
    sourcemap: true, // es6->es5 开启源码调试 可以找到源代码的报错位置
  },
  plugins: [
    babel({
      exclude: "node_modules/**", // glob写法
    }),
    serve({
      open: true,
      openPage: "/index.html", // 默认打开html的路径
      port: 3000,
      contentBase: "", // 以当前目录为静态服务
    }),
  ],
};
