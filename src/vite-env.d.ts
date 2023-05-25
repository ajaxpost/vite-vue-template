// 客户端类型(类型声明文件,类似于在tsconfig.ts中的 compilerOptions.types )
// 没有这个就相当于没有类型声明,比如没有 svg,less,png 等等的类型声明
// vite/client 帮助我们处理了大部分的类型声明
/// <reference types="vite/client" />

declare module '*.vue' {
  import { ComponentOptions } from 'vue';
  const componentOptions: ComponentOptions;
  export default componentOptions;
}
