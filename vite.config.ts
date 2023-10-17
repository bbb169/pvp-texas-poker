import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';

export default defineConfig({
    base: './',
    publicDir: 'public',
    resolve: {
        alias: [
            { find: '@', replacement: resolve(__dirname, 'src') }, // 配置别名
        ],
    },
    build: {
        target: 'modules', // 浏览器兼容目标
        outDir: 'dist', // 打包输出路径
        assetsDir: 'assets', // 静态资源存放路径
        cssCodeSplit: true, // 允许 css 代码拆分
        sourcemap: false, // 不生成 sourceMap 文件
        minify: 'terser', // 缩小文件体积
        terserOptions: {
            compress: {
                drop_console: true, // 取消 console
                drop_debugger: true, // 取消 debugger
            },
        },
    },
    plugins:[
        react({ 
            jsxImportSource: '@emotion/react', 
            babel: {
                presets: [
                    [
                        '@babel/preset-react',
                        { runtime: 'automatic', importSource: '@emotion/react' },
                    ],
                ],
                plugins: ['@emotion/babel-plugin'],
            }, 
        }),
    ],
    server: {
        host: '0.0.0.0', // 指定监听的IP地址
        port: 4000, // 指定服务器端口
        open: true, // 开发服务器启动时，自动在浏览器打开
        strictPort: false, // 设为 true 时，若端口已被占用会直接退出，不会尝试下一个可用端口
        https: false, // 是否开启 https 服务
        cors: true, // 允许跨域
        // 配置代理
        proxy: {
            '/api': {
                target: 'http://127.0.0.1: 8000', // 接口地址。
                changeOrigin: true, // 接口跨域。
                secure: false, // 启用 https 服务时需要配置。
            },
        },
    },
});

