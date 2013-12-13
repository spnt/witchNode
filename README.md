Witch Node
=========

Witch Node是一个以Express框架开发的用于快速开发建站的程序，其目前主要用途是快速开发网站，他是在Express的基础上搭建了业务逻辑工具层，并对Express的使用进行了优化。

本系统旨在构建高性能web site,同时会对从开发，部署到维护的全过程进行实践性的介绍，同时期待大牛提出对这些方法的改进方案

注意：他不是一个cms系统，虽然开发出一个cms对认识Node和Express是非常有用，但我不会去构建，cms过度的封装只会影响性能，大型的web系统更需要Coder而不是cms。但构建cms也是容易的。

本系统只提供最基础的操作供业务逻辑来使用，比如以下方法：

> Session的构建和第三方存储(eg:Redis)
> MongoDB的配置和初始化
> Redis的连接池和get，set,remove等的封装
> 路由规则的重新分配，减少Express默认路由存在页面显示操作代码导致的页面代码过多的问题
> 引入xss过滤方法
> 编写的基础工具提供：字符串截取，时间换算，数据类型校验等方法


##安装与使用

   1，下载到本地

   2，安装NPM

   cd 文件存放目录
   npm install

   另外为了减少不必要的麻烦，如github响应速度慢，被墙等问题，最好设置npm安装是从中国镜像安装

   设置方法如下：

   npm config set registry http://registry.cnpmjs.org
   npm info underscore （如果上面配置正确这个命令会有字符串response）

  3，运行。注：本系统并没有写cluster的相关操作，生产环境请使用PM2，默认端口号3000，可在配置文件中修改

  node app.js



