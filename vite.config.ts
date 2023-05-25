import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { fileURLToPath, URL } from 'node:url';
import checker from 'vite-plugin-checker';
import VitePluginCompression from 'vite-plugin-compression';

export default defineConfig(({ mode }) => {
  return {
    // 和 webpack 中 的 publicPath 一样
    // 公共基础路径
    base: mode === 'development' ? '/' : '/',
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    plugins: [
      vue(),
      vueJsx(),
      checker({
        typescript: true, // 当typescript语法错误时浏览器给出错误提示弹窗,强制开发者修改ts错误
      }),
      VitePluginCompression(), // gzip 压缩
    ],
    // 构建选项
    // https://zhuanlan.zhihu.com/p/594203360
    build: {
      sourcemap: false,
      rollupOptions: {
        // vite打包是通过rollup来打包的
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id
                .toString()
                .split('node_modules/')[1]
                .split('/')[0]
                .toString();
            }
          },
          chunkFileNames: (chunkInfo) => {
            const facadeModuleId = chunkInfo.facadeModuleId
              ? chunkInfo.facadeModuleId.split('/')
              : [];
            const fileName =
              facadeModuleId[facadeModuleId.length - 2] || '[name]';
            return `js/${fileName}/[name].[hash].js`;
          },
        },
      },
    },
    server: {
      https: false, // 当前项目是否选用Https的服务,详情请查看vite官网
      host: '0.0.0.0', // 可以外部访问(局域网访问)

      port: 9097,
      proxy: {
        // '/edu': {
        //   target: 'http://59.110.167.130',
        //   secure: false,
        //   changeOrigin: true,
        // },
      },
    },
  };
});
