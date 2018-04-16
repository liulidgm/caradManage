执行流程
1、需要node环境，自行安装(本人使用6.0以上版本)
2、环境没问题以后，切换至项目根目录，执行npm install
3、相关包安装完成后，执行npm run dev(运行期间缺什么插件就接着安装什么插件),默认8885端口，可以在项目根目录config/index.js中修改端口号
4、开发期间代理路径在项目根目录config/index.js中配置（dev.proxyTable）
5、执行npm run build 进行打包，在项目根目录下生成dist文件夹，文件夹的名字也是在config/index.js中修改